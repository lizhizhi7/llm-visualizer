import { motion } from 'framer-motion';
import { useVisualizationStore } from '../../store/visualizationStore';
import type { AgentSection } from '../../types';

const sections: { id: AgentSection; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'tools', label: 'Tools' },
  { id: 'react-loop', label: 'ReAct' },
  { id: 'memory', label: 'Memory' },
  { id: 'planning', label: 'Planning' },
  { id: 'demo', label: 'Demo' },
];

export function AgentProgress() {
  const { agentSection } = useVisualizationStore();
  const currentIndex = sections.findIndex((s) => s.id === agentSection);

  return (
    <div className="flex items-center justify-center gap-2">
      {sections.map((section, index) => {
        const isCompleted = index < currentIndex;
        const isCurrent = index === currentIndex;

        return (
          <div key={section.id} className="flex items-center">
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
                {section.label}
              </span>
            </div>

            {index < sections.length - 1 && (
              <div className="w-8 mx-1">
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
