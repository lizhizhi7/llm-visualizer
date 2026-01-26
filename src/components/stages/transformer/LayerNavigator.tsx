import { motion } from 'framer-motion';
import { usePipelineStore } from '../../../store/pipelineStore';

export function LayerNavigator() {
  const { transformerLayers, currentLayer, setCurrentLayer } = usePipelineStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-800 rounded-xl border border-slate-700 p-4"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-slate-400">Layer Navigation</span>
        <span className="text-sm font-medium">
          Layer {currentLayer + 1} of {transformerLayers.length}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setCurrentLayer(Math.max(0, currentLayer - 1))}
          disabled={currentLayer === 0}
          className="p-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex-1 flex gap-1">
          {transformerLayers.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentLayer(index)}
              className={`flex-1 h-2 rounded-full transition-colors ${
                index === currentLayer
                  ? 'bg-indigo-500'
                  : index < currentLayer
                  ? 'bg-green-500'
                  : 'bg-slate-600 hover:bg-slate-500'
              }`}
              title={`Layer ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => setCurrentLayer(Math.min(transformerLayers.length - 1, currentLayer + 1))}
          disabled={currentLayer === transformerLayers.length - 1}
          className="p-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="mt-3 flex items-center justify-center gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span>Processed</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-indigo-500" />
          <span>Current</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-slate-600" />
          <span>Upcoming</span>
        </div>
      </div>
    </motion.div>
  );
}
