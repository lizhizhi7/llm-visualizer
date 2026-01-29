import { useVisualizationStore } from '../../store/visualizationStore';
import type { AgentSection } from '../../types';

const sections: { id: AgentSection; label: string; icon: string; description: string }[] = [
  {
    id: 'overview',
    label: 'Overview',
    icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
    description: 'What is an agent?',
  },
  {
    id: 'tools',
    label: 'Tools',
    icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
    description: 'Function calling',
  },
  {
    id: 'react-loop',
    label: 'ReAct Loop',
    icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
    description: 'Think → Act → Observe',
  },
  {
    id: 'memory',
    label: 'Memory',
    icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4',
    description: 'Context & retrieval',
  },
  {
    id: 'planning',
    label: 'Planning',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
    description: 'Task decomposition',
  },
  {
    id: 'demo',
    label: 'Demo',
    icon: 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z',
    description: 'Interactive example',
  },
];

export function AgentSidebar() {
  const { agentSection, update } = useVisualizationStore();

  const getSectionStatus = (sectionId: AgentSection): 'completed' | 'current' | 'upcoming' => {
    const sectionIndex = sections.findIndex((s) => s.id === sectionId);
    const currentIndex = sections.findIndex((s) => s.id === agentSection);

    if (sectionIndex < currentIndex) return 'completed';
    if (sectionIndex === currentIndex) return 'current';
    return 'upcoming';
  };

  return (
    <aside className="w-64 bg-slate-800 border-r border-slate-700 p-4 flex flex-col">
      <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
        Agent Concepts
      </h2>

      <nav className="flex-1 space-y-2">
        {sections.map((section, index) => {
          const status = getSectionStatus(section.id);

          return (
            <button
              key={section.id}
              onClick={() => update({ agentSection: section.id })}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
                status === 'current'
                  ? 'bg-indigo-500/20 border border-indigo-500/50 text-white'
                  : status === 'completed'
                  ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20'
                  : 'text-slate-400 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  status === 'current'
                    ? 'bg-indigo-500'
                    : status === 'completed'
                    ? 'bg-green-500'
                    : 'bg-slate-600'
                }`}
              >
                {status === 'completed' ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{section.label}</div>
                <div className="text-xs text-slate-500 truncate">{section.description}</div>
              </div>

              <svg
                className={`w-4 h-4 ${status === 'current' ? 'text-indigo-400' : 'text-slate-600'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={section.icon} />
              </svg>
            </button>
          );
        })}
      </nav>

      <div className="mt-4 pt-4 border-t border-slate-700">
        <div className="text-xs text-slate-500 text-center">
          Learn how LLM-powered agents work
        </div>
      </div>
    </aside>
  );
}
