import { AnimatePresence, motion } from 'framer-motion';
import { useVisualizationStore } from '../../store/visualizationStore';
import { AgentProgress } from './AgentProgress';
import { OverviewSection } from './sections/OverviewSection';
import { ToolsSection } from './sections/ToolsSection';
import { ReactLoopSection } from './sections/ReactLoopSection';
import { MemorySection } from './sections/MemorySection';
import { PlanningSection } from './sections/PlanningSection';
import { FineTuningSection } from './sections/FineTuningSection';
import { DemoSection } from './sections/DemoSection';

const sectionComponents = {
  overview: OverviewSection,
  tools: ToolsSection,
  'react-loop': ReactLoopSection,
  memory: MemorySection,
  planning: PlanningSection,
  'fine-tuning': FineTuningSection,
  demo: DemoSection,
};

export function AgentView() {
  const { agentSection, update } = useVisualizationStore();

  const SectionComponent = sectionComponents[agentSection];

  const sections = Object.keys(sectionComponents) as Array<keyof typeof sectionComponents>;
  const currentIndex = sections.indexOf(agentSection);

  const handleNext = () => {
    if (currentIndex < sections.length - 1) {
      update({ agentSection: sections[currentIndex + 1] });
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      update({ agentSection: sections[currentIndex - 1] });
    }
  };

  return (
    <div className="h-full flex flex-col gap-6">
      <AgentProgress />

      <AnimatePresence mode="wait">
        <motion.div
          key={agentSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="flex-1 overflow-auto"
        >
          <SectionComponent />
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-center gap-4">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === sections.length - 1}
          className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          Next
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
