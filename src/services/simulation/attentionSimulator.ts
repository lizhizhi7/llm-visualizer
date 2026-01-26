import type { AttentionHead, TransformerLayer } from '../../types';
import { generateRandomAttention, attentionPatterns, blendPatterns } from '../../data/attentionPatterns';

const NUM_HEADS = 12;
const NUM_LAYERS = 12;

function softmax(logits: number[]): number[] {
  const maxLogit = Math.max(...logits);
  const expLogits = logits.map((l) => Math.exp(l - maxLogit));
  const sumExp = expLogits.reduce((a, b) => a + b, 0);
  return expLogits.map((e) => e / sumExp);
}

export function generateAttentionHead(
  headIndex: number,
  numTokens: number,
  layerIndex: number = 0
): AttentionHead {
  const patterns = attentionPatterns.map((p) => p.generate(numTokens));

  const weights: number[] = [];
  for (let i = 0; i < patterns.length; i++) {
    weights.push(Math.random());
  }
  const sumWeights = weights.reduce((a, b) => a + b, 0);
  const normalizedWeights = weights.map((w) => w / sumWeights);

  let attentionWeights: number[][];

  if (headIndex === 0) {
    attentionWeights = attentionPatterns[2].generate(numTokens);
  } else if (headIndex === 1) {
    attentionWeights = attentionPatterns[3].generate(numTokens);
  } else if (headIndex === 2 && layerIndex > 2) {
    attentionWeights = attentionPatterns[4].generate(numTokens);
  } else {
    attentionWeights = blendPatterns(patterns, normalizedWeights);
  }

  const noise = generateRandomAttention(numTokens);
  const alpha = 0.1;
  attentionWeights = attentionWeights.map((row, i) =>
    row.map((val, j) => val * (1 - alpha) + noise[i][j] * alpha)
  );

  attentionWeights = attentionWeights.map((row) => {
    const sum = row.reduce((a, b) => a + b, 0);
    return row.map((val) => (sum > 0 ? val / sum : 0));
  });

  return {
    headIndex,
    weights: attentionWeights,
    pattern: headIndex < 3 ? attentionPatterns[headIndex].name : 'Mixed',
  };
}

export function generateTransformerLayer(layerIndex: number, numTokens: number): TransformerLayer {
  const attentionHeads: AttentionHead[] = [];

  for (let h = 0; h < NUM_HEADS; h++) {
    attentionHeads.push(generateAttentionHead(h, numTokens, layerIndex));
  }

  const ffnActivations: number[] = [];
  for (let i = 0; i < 3072; i++) {
    ffnActivations.push(Math.max(0, Math.random() * 2 - 1));
  }

  const residualNorm: number[] = [];
  for (let i = 0; i < numTokens; i++) {
    residualNorm.push(0.8 + Math.random() * 0.4);
  }

  return {
    layerIndex,
    attentionHeads,
    ffnActivations,
    residualNorm,
  };
}

export function generateAllLayers(numTokens: number): TransformerLayer[] {
  const layers: TransformerLayer[] = [];

  for (let l = 0; l < NUM_LAYERS; l++) {
    layers.push(generateTransformerLayer(l, numTokens));
  }

  return layers;
}

export function generateOutputLogits(_numTokens: number, vocabSize: number = 50257): number[] {
  const logits: number[] = [];
  for (let i = 0; i < vocabSize; i++) {
    logits.push((Math.random() - 0.5) * 10);
  }
  return logits;
}

export function applySoftmaxWithTemperature(logits: number[], temperature: number): number[] {
  if (temperature === 0) {
    const maxIdx = logits.indexOf(Math.max(...logits));
    return logits.map((_, i) => (i === maxIdx ? 1 : 0));
  }

  const scaledLogits = logits.map((l) => l / temperature);
  return softmax(scaledLogits);
}

export function applyTopK(probs: number[], k: number): number[] {
  const indexed = probs.map((p, i) => ({ p, i }));
  indexed.sort((a, b) => b.p - a.p);

  const topK = indexed.slice(0, k);
  const sum = topK.reduce((s, x) => s + x.p, 0);

  const result = new Array(probs.length).fill(0);
  for (const { p, i } of topK) {
    result[i] = p / sum;
  }

  return result;
}

export function applyTopP(probs: number[], p: number): number[] {
  const indexed = probs.map((prob, i) => ({ prob, i }));
  indexed.sort((a, b) => b.prob - a.prob);

  let cumSum = 0;
  const nucleus: { prob: number; i: number }[] = [];

  for (const item of indexed) {
    nucleus.push(item);
    cumSum += item.prob;
    if (cumSum >= p) break;
  }

  const sum = nucleus.reduce((s, x) => s + x.prob, 0);
  const result = new Array(probs.length).fill(0);

  for (const { prob, i } of nucleus) {
    result[i] = prob / sum;
  }

  return result;
}

export function sampleToken(probs: number[]): number {
  const r = Math.random();
  let cumSum = 0;

  for (let i = 0; i < probs.length; i++) {
    cumSum += probs[i];
    if (r <= cumSum) return i;
  }

  return probs.length - 1;
}
