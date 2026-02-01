import { motion } from 'framer-motion';
import type { Token, AttentionHead } from '../../../types';

interface MultiHeadGridProps {
  heads: AttentionHead[];
  selectedHead: number;
  onSelectHead: (index: number) => void;
  tokens: Token[];
}

function MiniHeatmap({ weights }: { weights: number[][] }) {
  const size = Math.min(weights.length, 8);
  const displayWeights = weights.slice(0, size).map((row) => row.slice(0, size));

  return (
    <div
      className="grid gap-px"
      style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
    >
      {displayWeights.flatMap((row, i) =>
        row.map((weight, j) => (
          <div
            key={`${i}-${j}`}
            className="w-full aspect-square"
            style={{
              backgroundColor:
                j <= i
                  ? `rgba(99, 102, 241, ${weight})`
                  : 'transparent',
            }}
          />
        ))
      )}
    </div>
  );
}

export function MultiHeadGrid({
  heads,
  selectedHead,
  onSelectHead,
}: MultiHeadGridProps) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {heads.map((head, index) => (
        <motion.button
          key={head.headIndex}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.03 }}
          onClick={() => onSelectHead(index)}
          className={`p-2 rounded-lg transition-all ${
            selectedHead === index
              ? 'ring-2 ring-indigo-500 bg-slate-700'
              : 'bg-slate-700/50 hover:bg-slate-700'
          }`}
        >
          <div className="text-xs text-slate-400 mb-1 text-center">
            Head {index + 1}
          </div>
          <div className="aspect-square overflow-hidden rounded">
            <MiniHeatmap weights={head.weights} />
          </div>
          {head.pattern && (
            <div className="text-xs text-center text-slate-500 mt-1 truncate">
              {head.pattern}
            </div>
          )}
        </motion.button>
      ))}
    </div>
  );
}
