import { useMemo } from 'react';
import { motion } from 'framer-motion';
import type { Token } from '../../../types';
import { generatePositionalEncoding } from '../../../services/simulation';

interface PositionalEncodingViewProps {
  tokens: Token[];
}

export function PositionalEncodingView({ tokens }: PositionalEncodingViewProps) {
  const encodings = useMemo(() => {
    return tokens.map((_, i) => generatePositionalEncoding(i, 64));
  }, [tokens]);

  return (
    <div className="space-y-2">
      <div className="flex gap-2 items-center text-xs text-slate-500 mb-2">
        <span>Position</span>
        <div className="flex-1 h-px bg-slate-600" />
        <span>Encoding dimensions (first 64)</span>
      </div>

      {encodings.slice(0, 8).map((encoding, posIndex) => (
        <motion.div
          key={posIndex}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: posIndex * 0.05 }}
          className="flex items-center gap-2"
        >
          <div className="w-8 text-center text-sm text-slate-400 font-mono">
            {posIndex}
          </div>
          <div className="flex-1 h-4 flex rounded overflow-hidden">
            {encoding.map((val, dimIndex) => (
              <div
                key={dimIndex}
                className="flex-1"
                style={{
                  backgroundColor:
                    val > 0
                      ? `rgba(34, 197, 94, ${Math.abs(val)})`
                      : `rgba(239, 68, 68, ${Math.abs(val)})`,
                }}
                title={`dim ${dimIndex}: ${val.toFixed(3)}`}
              />
            ))}
          </div>
        </motion.div>
      ))}

      {tokens.length > 8 && (
        <div className="text-sm text-slate-500 text-center pt-2">
          + {tokens.length - 8} more positions
        </div>
      )}

      <div className="mt-4 flex items-center justify-center gap-4 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-green-500" />
          <span className="text-slate-400">Positive</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-red-500" />
          <span className="text-slate-400">Negative</span>
        </div>
      </div>
    </div>
  );
}
