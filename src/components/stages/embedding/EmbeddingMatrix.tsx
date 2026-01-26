import { useMemo } from 'react';
import type { Token } from '../../../types';
import { cosineSimilarity } from '../../../services/simulation';

interface EmbeddingMatrixProps {
  embeddings: number[][];
  tokens: Token[];
}

export function EmbeddingMatrix({ embeddings, tokens }: EmbeddingMatrixProps) {
  const similarityMatrix = useMemo(() => {
    const matrix: number[][] = [];
    for (let i = 0; i < embeddings.length; i++) {
      const row: number[] = [];
      for (let j = 0; j < embeddings.length; j++) {
        row.push(cosineSimilarity(embeddings[i], embeddings[j]));
      }
      matrix.push(row);
    }
    return matrix;
  }, [embeddings]);

  const displayTokens = tokens.slice(0, 10);
  const displayMatrix = similarityMatrix.slice(0, 10).map((row) => row.slice(0, 10));

  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="w-16" />
              {displayTokens.map((token) => (
                <th key={token.id} className="px-2 py-1 text-xs font-mono truncate max-w-[60px]">
                  {token.text === ' ' ? '␣' : token.text}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayMatrix.map((row, i) => (
              <tr key={i}>
                <td className="px-2 py-1 text-xs font-mono truncate">
                  {displayTokens[i]?.text === ' ' ? '␣' : displayTokens[i]?.text}
                </td>
                {row.map((val, j) => (
                  <td key={j} className="p-0.5">
                    <div
                      className="w-10 h-10 flex items-center justify-center text-xs rounded"
                      style={{
                        backgroundColor: `rgba(99, 102, 241, ${Math.max(0, val)})`,
                        color: val > 0.5 ? 'white' : 'rgb(148, 163, 184)',
                      }}
                      title={`Similarity: ${val.toFixed(3)}`}
                    >
                      {val.toFixed(2)}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {tokens.length > 10 && (
          <div className="text-sm text-slate-500 text-center mt-2">
            Showing first 10x10 of {tokens.length}x{tokens.length} matrix
          </div>
        )}

        <div className="mt-4 text-sm text-slate-400">
          <strong>Cosine Similarity Matrix:</strong> Shows how similar each pair of token embeddings are.
          Values range from -1 (opposite) to 1 (identical). Diagonal is always 1 (self-similarity).
        </div>
      </div>
    </div>
  );
}
