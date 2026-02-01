import { usePipelineStore } from '../../../store/pipelineStore';

export function SamplingControls() {
  const { generationConfig, updateConfig } = usePipelineStore();

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium">Temperature</label>
          <span className="text-sm text-indigo-400 font-mono">
            {generationConfig.temperature.toFixed(2)}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="2"
          step="0.05"
          value={generationConfig.temperature}
          onChange={(e) => updateConfig({ temperature: parseFloat(e.target.value) })}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-slate-500 mt-1">
          <span>Deterministic</span>
          <span>Creative</span>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium">Top-K</label>
          <span className="text-sm text-indigo-400 font-mono">{generationConfig.topK}</span>
        </div>
        <input
          type="range"
          min="1"
          max="100"
          step="1"
          value={generationConfig.topK}
          onChange={(e) => updateConfig({ topK: parseInt(e.target.value) })}
          className="w-full"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium">Top-P (Nucleus)</label>
          <span className="text-sm text-indigo-400 font-mono">
            {generationConfig.topP.toFixed(2)}
          </span>
        </div>
        <input
          type="range"
          min="0.1"
          max="1"
          step="0.05"
          value={generationConfig.topP}
          onChange={(e) => updateConfig({ topP: parseFloat(e.target.value) })}
          className="w-full"
        />
      </div>

      <div className="pt-2 border-t border-slate-700">
        <button
          onClick={() =>
            updateConfig({
              temperature: 1.0,
              topK: 50,
              topP: 0.95,
            })
          }
          className="w-full px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm transition-colors"
        >
          Reset to Defaults
        </button>
      </div>
    </div>
  );
}
