import { motion } from 'framer-motion';
import { usePipelineStore } from '../../store/pipelineStore';

export function ParameterPanel() {
  const { generationConfig, updateConfig } = usePipelineStore();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="p-4 bg-slate-800 rounded-xl border border-slate-700 space-y-4"
    >
      <h3 className="font-semibold text-sm uppercase tracking-wider text-slate-400">
        Generation Parameters
      </h3>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium">Temperature</label>
          <span className="text-sm text-indigo-400">{generationConfig.temperature.toFixed(2)}</span>
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
        <p className="mt-1 text-xs text-slate-500">
          Higher = more random, Lower = more focused
        </p>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium">Top-K</label>
          <span className="text-sm text-indigo-400">{generationConfig.topK}</span>
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
        <p className="mt-1 text-xs text-slate-500">
          Only consider top K tokens
        </p>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium">Top-P (Nucleus)</label>
          <span className="text-sm text-indigo-400">{generationConfig.topP.toFixed(2)}</span>
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={generationConfig.topP}
          onChange={(e) => updateConfig({ topP: parseFloat(e.target.value) })}
          className="w-full"
        />
        <p className="mt-1 text-xs text-slate-500">
          Sample from tokens comprising top P probability mass
        </p>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium">Max Tokens</label>
          <span className="text-sm text-indigo-400">{generationConfig.maxTokens}</span>
        </div>
        <input
          type="range"
          min="1"
          max="500"
          step="1"
          value={generationConfig.maxTokens}
          onChange={(e) => updateConfig({ maxTokens: parseInt(e.target.value) })}
          className="w-full"
        />
      </div>
    </motion.div>
  );
}
