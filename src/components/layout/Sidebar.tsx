import { usePipelineStore } from '../../store/pipelineStore';
import type { PipelineStage } from '../../types';

const stages: { id: PipelineStage; label: string; icon: string; description: string }[] = [
  {
    id: 'input',
    label: 'Input',
    icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
    description: 'Enter your prompt',
  },
  {
    id: 'tokenization',
    label: 'Tokenization',
    icon: 'M4 6h16M4 12h8m-8 6h16',
    description: 'Text to tokens',
  },
  {
    id: 'embedding',
    label: 'Embedding',
    icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01',
    description: 'Tokens to vectors',
  },
  {
    id: 'transformer',
    label: 'Transformer',
    icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
    description: 'Attention & FFN',
  },
  {
    id: 'output',
    label: 'Output',
    icon: 'M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
    description: 'Token prediction',
  },
];

export function Sidebar() {
  const { currentStage, setCurrentStage, tokens } = usePipelineStore();

  const getStageStatus = (stageId: PipelineStage): 'completed' | 'current' | 'upcoming' => {
    const stageIndex = stages.findIndex((s) => s.id === stageId);
    const currentIndex = stages.findIndex((s) => s.id === currentStage);

    if (stageIndex < currentIndex) return 'completed';
    if (stageIndex === currentIndex) return 'current';
    return 'upcoming';
  };

  const canNavigateTo = (stageId: PipelineStage): boolean => {
    if (stageId === 'input') return true;
    if (tokens.length === 0) return false;
    return true;
  };

  return (
    <aside className="w-64 bg-slate-800 border-r border-slate-700 p-4 flex flex-col">
      <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
        Pipeline Stages
      </h2>

      <nav className="flex-1 space-y-2">
        {stages.map((stage, index) => {
          const status = getStageStatus(stage.id);
          const canNavigate = canNavigateTo(stage.id);

          return (
            <button
              key={stage.id}
              onClick={() => canNavigate && setCurrentStage(stage.id)}
              disabled={!canNavigate}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
                status === 'current'
                  ? 'bg-indigo-500/20 border border-indigo-500/50 text-white'
                  : status === 'completed'
                  ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20'
                  : canNavigate
                  ? 'text-slate-400 hover:bg-slate-700 hover:text-white'
                  : 'text-slate-600 cursor-not-allowed'
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
                <div className="font-medium truncate">{stage.label}</div>
                <div className="text-xs text-slate-500 truncate">{stage.description}</div>
              </div>

              <svg
                className={`w-4 h-4 ${status === 'current' ? 'text-indigo-400' : 'text-slate-600'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stage.icon} />
              </svg>
            </button>
          );
        })}
      </nav>

      <div className="mt-4 pt-4 border-t border-slate-700">
        <div className="text-xs text-slate-500 text-center">
          Navigate through each stage to see how LLMs process text
        </div>
      </div>
    </aside>
  );
}
