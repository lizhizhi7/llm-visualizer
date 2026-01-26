import { motion } from 'framer-motion';
import { usePipelineStore } from '../../store/pipelineStore';
import type { PipelineStage } from '../../types';

const stages: { id: PipelineStage; label: string }[] = [
  { id: 'input', label: 'Input' },
  { id: 'tokenization', label: 'Tokenization' },
  { id: 'embedding', label: 'Embedding' },
  { id: 'transformer', label: 'Transformer' },
  { id: 'output', label: 'Output' },
];

export function StageProgress() {
  const { currentStage } = usePipelineStore();
  const currentIndex = stages.findIndex((s) => s.id === currentStage);

  return (
    <div className="flex items-center justify-center gap-2">
      {stages.map((stage, index) => {
        const isCompleted = index < currentIndex;
        const isCurrent = index === currentIndex;

        return (
          <div key={stage.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <motion.div
                initial={false}
                animate={{
                  scale: isCurrent ? 1.1 : 1,
                  backgroundColor: isCompleted
                    ? '#10b981'
                    : isCurrent
                    ? '#6366f1'
                    : '#334155',
                }}
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium"
              >
                {isCompleted ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  index + 1
                )}
              </motion.div>
              <span
                className={`mt-1 text-xs ${
                  isCurrent ? 'text-indigo-400 font-medium' : 'text-slate-500'
                }`}
              >
                {stage.label}
              </span>
            </div>

            {index < stages.length - 1 && (
              <div className="w-12 mx-2">
                <motion.div
                  initial={false}
                  animate={{
                    backgroundColor: index < currentIndex ? '#10b981' : '#334155',
                  }}
                  className="h-0.5 w-full"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
