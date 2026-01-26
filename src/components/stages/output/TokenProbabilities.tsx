import { motion } from 'framer-motion';
import type { TokenProbability } from '../../../types';

interface TokenProbabilitiesProps {
  tokens: TokenProbability[];
}

export function TokenProbabilities({ tokens }: TokenProbabilitiesProps) {
  const maxProb = Math.max(...tokens.map((t) => t.probability));

  return (
    <div className="space-y-2">
      {tokens.map((token, index) => {
        const widthPercent = (token.probability / maxProb) * 100;
        const isTop = index === 0;

        return (
          <motion.div
            key={token.token}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.03 }}
            className="flex items-center gap-3"
          >
            <div
              className={`w-20 px-2 py-1 rounded text-sm font-mono text-center truncate ${
                isTop ? 'bg-green-500' : 'bg-slate-600'
              }`}
            >
              {token.token}
            </div>

            <div className="flex-1 h-6 bg-slate-700 rounded overflow-hidden relative">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${widthPercent}%` }}
                transition={{ delay: index * 0.03, duration: 0.5, ease: 'easeOut' }}
                className={`h-full ${isTop ? 'bg-green-500' : 'bg-indigo-500'}`}
              />
              <span className="absolute inset-0 flex items-center px-2 text-xs font-medium">
                {(token.probability * 100).toFixed(1)}%
              </span>
            </div>

            <div className="w-16 text-right text-sm text-slate-500 font-mono">
              {token.logit.toFixed(2)}
            </div>
          </motion.div>
        );
      })}

      <div className="flex items-center justify-end gap-8 mt-4 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded" />
          <span>Most likely</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-indigo-500 rounded" />
          <span>Alternative</span>
        </div>
      </div>
    </div>
  );
}
