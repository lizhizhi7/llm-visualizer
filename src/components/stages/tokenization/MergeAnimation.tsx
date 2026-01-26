import { motion, AnimatePresence } from 'framer-motion';

interface MergeAnimationProps {
  tokens: string[];
  mergedIndices?: [number, number];
}

export function MergeAnimation({ tokens, mergedIndices }: MergeAnimationProps) {
  return (
    <div className="flex flex-wrap gap-1 min-h-[60px] items-center">
      <AnimatePresence mode="popLayout">
        {tokens.map((token, index) => {
          const isMerging =
            mergedIndices &&
            (index === mergedIndices[0] || index === mergedIndices[1]);
          const isMerged = mergedIndices && index === mergedIndices[0] && tokens[index].length > 1;

          return (
            <motion.span
              key={`${index}-${token}`}
              layout
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: 1,
                scale: 1,
                backgroundColor: isMerging
                  ? 'rgb(99, 102, 241)'
                  : isMerged
                  ? 'rgb(16, 185, 129)'
                  : 'rgb(51, 65, 85)',
              }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{
                layout: { duration: 0.3 },
                opacity: { duration: 0.2 },
                scale: { duration: 0.2 },
              }}
              className="px-2 py-1 rounded font-mono text-sm"
            >
              {token === ' ' ? '␣' : token}
            </motion.span>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
