import type { Token } from '../../types';

const EMBEDDING_DIM = 768;

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash;
}

function seededRandom(seed: number): () => number {
  let state = seed;
  return () => {
    state = (state * 1103515245 + 12345) & 0x7fffffff;
    return state / 0x7fffffff;
  };
}

export function generateTokenEmbedding(token: Token): number[] {
  const seed = hashString(token.text);
  const random = seededRandom(seed);

  const embedding: number[] = [];
  for (let i = 0; i < EMBEDDING_DIM; i++) {
    embedding.push((random() - 0.5) * 2);
  }

  const norm = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0));
  return embedding.map((val) => val / norm);
}

export function generatePositionalEncoding(position: number, dimension: number = EMBEDDING_DIM): number[] {
  const encoding: number[] = [];

  for (let i = 0; i < dimension; i++) {
    const angle = position / Math.pow(10000, (2 * Math.floor(i / 2)) / dimension);
    if (i % 2 === 0) {
      encoding.push(Math.sin(angle));
    } else {
      encoding.push(Math.cos(angle));
    }
  }

  return encoding;
}

export function combineEmbeddings(tokenEmbedding: number[], positionalEncoding: number[]): number[] {
  return tokenEmbedding.map((val, i) => val + positionalEncoding[i]);
}

export function generateAllEmbeddings(tokens: Token[]): number[][] {
  return tokens.map((token) => {
    const tokenEmb = generateTokenEmbedding(token);
    const posEnc = generatePositionalEncoding(token.position);
    return combineEmbeddings(tokenEmb, posEnc);
  });
}

export function projectTo3D(embeddings: number[][]): [number, number, number][] {
  if (embeddings.length === 0) return [];

  const projectionMatrix: number[][] = [];
  const seed = 42;
  const random = seededRandom(seed);

  for (let i = 0; i < 3; i++) {
    const row: number[] = [];
    for (let j = 0; j < EMBEDDING_DIM; j++) {
      row.push((random() - 0.5) * 2);
    }
    projectionMatrix.push(row);
  }

  return embeddings.map((embedding) => {
    const projected: [number, number, number] = [0, 0, 0];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < EMBEDDING_DIM; j++) {
        projected[i] += embedding[j] * projectionMatrix[i][j];
      }
      projected[i] = projected[i] / Math.sqrt(EMBEDDING_DIM);
    }
    return projected;
  });
}

export function cosineSimilarity(a: number[], b: number[]): number {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}
