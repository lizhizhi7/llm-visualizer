export interface AttentionPattern {
  name: string;
  description: string;
  generate: (size: number) => number[][];
}

export const attentionPatterns: AttentionPattern[] = [
  {
    name: 'Uniform',
    description: 'Equal attention to all tokens',
    generate: (size) => {
      const uniform = 1 / size;
      return Array(size)
        .fill(null)
        .map(() => Array(size).fill(uniform));
    },
  },
  {
    name: 'Diagonal',
    description: 'Self-attention pattern',
    generate: (size) => {
      return Array(size)
        .fill(null)
        .map((_, i) =>
          Array(size)
            .fill(0)
            .map((__, j) => (i === j ? 0.8 : 0.2 / (size - 1)))
        );
    },
  },
  {
    name: 'First Token',
    description: 'Strong attention to first token (often BOS)',
    generate: (size) => {
      return Array(size)
        .fill(null)
        .map(() =>
          Array(size)
            .fill(0)
            .map((_, j) => (j === 0 ? 0.7 : 0.3 / (size - 1)))
        );
    },
  },
  {
    name: 'Previous Token',
    description: 'Attention to previous token (language modeling)',
    generate: (size) => {
      return Array(size)
        .fill(null)
        .map((_, i) =>
          Array(size)
            .fill(0)
            .map((__, j) => {
              if (j === i - 1) return 0.6;
              if (j < i) return 0.4 / i;
              return 0;
            })
        );
    },
  },
  {
    name: 'Induction',
    description: 'Induction head pattern',
    generate: (size) => {
      const weights: number[][] = [];
      for (let i = 0; i < size; i++) {
        const row: number[] = [];
        for (let j = 0; j < size; j++) {
          if (j <= i) {
            const offset = i - j;
            const induction = offset > 0 && offset < size ? 0.5 * Math.exp(-offset / 3) : 0;
            row.push(induction + 0.1);
          } else {
            row.push(0);
          }
        }
        const sum = row.reduce((a, b) => a + b, 0);
        weights.push(row.map((w) => w / sum));
      }
      return weights;
    },
  },
];

export function generateRandomAttention(size: number, causal: boolean = true): number[][] {
  const weights: number[][] = [];
  for (let i = 0; i < size; i++) {
    const row: number[] = [];
    for (let j = 0; j < size; j++) {
      if (causal && j > i) {
        row.push(0);
      } else {
        row.push(Math.random());
      }
    }
    const sum = row.reduce((a, b) => a + b, 0);
    weights.push(row.map((w) => (sum > 0 ? w / sum : 0)));
  }
  return weights;
}

export function blendPatterns(
  patterns: number[][][],
  weights: number[]
): number[][] {
  if (patterns.length === 0) return [];
  const size = patterns[0].length;
  const result: number[][] = Array(size)
    .fill(null)
    .map(() => Array(size).fill(0));

  patterns.forEach((pattern, idx) => {
    const weight = weights[idx] || 0;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        result[i][j] += pattern[i][j] * weight;
      }
    }
  });

  return result.map((row) => {
    const sum = row.reduce((a, b) => a + b, 0);
    return row.map((w) => (sum > 0 ? w / sum : 0));
  });
}
