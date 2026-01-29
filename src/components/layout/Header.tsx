import { useVisualizationStore } from '../../store/visualizationStore';
import { useAPIStore } from '../../store/apiStore';
import type { ViewMode, AppPage } from '../../types';

interface HeaderProps {
  onOpenSettings: () => void;
}

export function Header({ onOpenSettings }: HeaderProps) {
  const { viewMode, currentPage, update } = useVisualizationStore();
  const { isConfigured, config } = useAPIStore();

  const viewModes: { value: ViewMode; label: string }[] = [
    { value: 'simplified', label: 'Simplified' },
    { value: 'detailed', label: 'Detailed' },
    { value: 'expert', label: 'Expert' },
  ];

  const pages: { value: AppPage; label: string }[] = [
    { value: 'pipeline', label: 'LLM Pipeline' },
    { value: 'agent', label: 'Agent' },
  ];

  return (
    <header className="h-16 bg-slate-800 border-b border-slate-700 px-6 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <h1 className="text-xl font-bold text-white">
          LLM Visualizer
        </h1>

        <div className="flex bg-slate-700/50 rounded-lg p-1">
          {pages.map((page) => (
            <button
              key={page.value}
              onClick={() => update({ currentPage: page.value })}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                currentPage === page.value
                  ? 'bg-slate-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-600/50'
              }`}
            >
              {page.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex bg-slate-700 rounded-lg p-1">
          {viewModes.map((mode) => (
            <button
              key={mode.value}
              onClick={() => update({ viewMode: mode.value })}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                viewMode === mode.value
                  ? 'bg-indigo-500 text-white'
                  : 'text-slate-300 hover:text-white hover:bg-slate-600'
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>

        <button
          onClick={onOpenSettings}
          className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm font-medium transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          Settings
          {isConfigured && (
            <span className="w-2 h-2 bg-green-400 rounded-full" />
          )}
        </button>

        {isConfigured && (
          <span className="text-xs text-slate-400 capitalize">
            {config.provider}
          </span>
        )}
      </div>
    </header>
  );
}
