import type { Token, TokenType, TokenizationStep } from '../../types';

const bpeMerges: [string, string][] = [
  ['t', 'h'],
  ['th', 'e'],
  ['i', 'n'],
  ['a', 'n'],
  ['e', 'r'],
  ['o', 'n'],
  ['r', 'e'],
  ['o', 'u'],
  ['i', 's'],
  ['e', 's'],
  ['i', 't'],
  ['e', 'n'],
  ['a', 't'],
  ['o', 'r'],
  ['t', 'i'],
  ['a', 'r'],
  ['a', 'l'],
  ['h', 'e'],
  ['l', 'e'],
  ['ou', 'r'],
];

function getTokenType(text: string): TokenType {
  if (/^\d+$/.test(text)) return 'number';
  if (/^[.,!?;:'"()\[\]{}]$/.test(text)) return 'punctuation';
  if (/^<[^>]+>$/.test(text)) return 'special';
  if (/^##/.test(text) || /^Ġ/.test(text) || text.startsWith('_')) return 'subword';
  return 'word';
}

function tokenToChars(text: string): string[] {
  return text.split('');
}

function findMerge(tokens: string[], merges: [string, string][]): { index: number; merge: [string, string] } | null {
  for (const merge of merges) {
    const target = merge[0] + merge[1];
    for (let i = 0; i < tokens.length - 1; i++) {
      if (tokens[i] === merge[0] && tokens[i + 1] === merge[1]) {
        return { index: i, merge };
      }
      if (tokens[i] === target) {
        continue;
      }
    }
  }
  return null;
}

export function tokenizeWithSteps(text: string): { tokens: Token[]; steps: TokenizationStep[] } {
  const steps: TokenizationStep[] = [];
  const words = text.split(/(\s+|[.,!?;:'"()\[\]{}])/).filter(Boolean);

  let allTokens: string[] = [];

  for (const word of words) {
    if (/^\s+$/.test(word)) {
      allTokens.push(' ');
    } else if (/^[.,!?;:'"()\[\]{}]$/.test(word)) {
      allTokens.push(word);
    } else {
      allTokens = allTokens.concat(tokenToChars(word));
    }
  }

  steps.push({
    tokens: [...allTokens],
    description: 'Initial character-level tokenization',
  });

  let mergeResult = findMerge(allTokens, bpeMerges);
  let iterations = 0;
  const maxIterations = 50;

  while (mergeResult && iterations < maxIterations) {
    const { index, merge } = mergeResult;
    const newTokens = [
      ...allTokens.slice(0, index),
      merge[0] + merge[1],
      ...allTokens.slice(index + 2),
    ];

    steps.push({
      tokens: [...newTokens],
      mergedIndices: [index, index + 1],
      description: `Merge "${merge[0]}" + "${merge[1]}" → "${merge[0] + merge[1]}"`,
    });

    allTokens = newTokens;
    mergeResult = findMerge(allTokens, bpeMerges);
    iterations++;
  }

  const tokens: Token[] = allTokens.map((text, index) => ({
    id: index,
    text,
    type: getTokenType(text),
    position: index,
  }));

  return { tokens, steps };
}

export function getTokenColor(type: TokenType): string {
  switch (type) {
    case 'word':
      return '#3b82f6';
    case 'subword':
      return '#8b5cf6';
    case 'punctuation':
      return '#f59e0b';
    case 'number':
      return '#10b981';
    case 'special':
      return '#ef4444';
    default:
      return '#64748b';
  }
}

export function simulateVocabLookup(token: string): number {
  let hash = 0;
  for (let i = 0; i < token.length; i++) {
    const char = token.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash) % 50000;
}
