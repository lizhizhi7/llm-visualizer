import { motion } from 'framer-motion';
import type { Token } from '../../../types';
import { getTokenColor, simulateVocabLookup } from '../../../services/tokenizer';
import { useVisualizationStore } from '../../../store/visualizationStore';

interface TokenListProps {
  tokens: Token[];
}

export function TokenList({ tokens }: TokenListProps) {
  const { selectedToken, setSelectedToken, viewMode } = useVisualizationStore();

  return (
    <div className="flex flex-wrap gap-2">
      {tokens.map((token, index) => {
        const isSelected = selectedToken === token.id;
        const color = getTokenColor(token.type);

        return (
          <motion.div
            key={token.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.02 }}
            onClick={() => setSelectedToken(isSelected ? null : token.id)}
            className={`relative group cursor-pointer`}
          >
            <div
              className={`px-3 py-1.5 rounded-lg text-sm font-mono transition-all ${
                isSelected ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-800' : ''
              }`}
              style={{ backgroundColor: color }}
            >
              {token.text === ' ' ? '␣' : token.text}
            </div>

            {viewMode !== 'simplified' && (
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                <div className="bg-slate-900 border border-slate-600 rounded px-2 py-1 text-xs whitespace-nowrap">
                  ID: {simulateVocabLookup(token.text)}
                </div>
              </div>
            )}

            <div className="mt-1 text-center text-xs text-slate-500">
              {token.position}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
