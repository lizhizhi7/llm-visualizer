import { motion } from 'framer-motion';
import { usePipelineStore } from '../../../store/pipelineStore';
import { useVisualizationStore } from '../../../store/visualizationStore';
import { AttentionMatrix } from './attention/AttentionMatrix';
import { MultiHeadGrid } from './attention/MultiHeadGrid';
import { FFNVisualization } from './FFNVisualization';
import { LayerNavigator } from './LayerNavigator';

export function TransformerStage() {
  const { tokens, transformerLayers, currentLayer, currentHead, setCurrentHead } =
    usePipelineStore();
  const { viewMode } = useVisualizationStore();

  const layer = transformerLayers[currentLayer];

  if (!layer) {
    return <div>Loading transformer layers...</div>;
  }

  const currentAttentionHead = layer.attentionHeads[currentHead];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold mb-2">Transformer Layer {currentLayer + 1}</h2>
        <p className="text-slate-400">
          Self-attention and feed-forward processing
        </p>
      </motion.div>

      <LayerNavigator />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-slate-800 rounded-xl border border-slate-700 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">
              Attention Head {currentHead + 1}
              {currentAttentionHead?.pattern && (
                <span className="ml-2 text-sm text-slate-400">
                  ({currentAttentionHead.pattern})
                </span>
              )}
            </h3>
            <div className="flex gap-1">
              {layer.attentionHeads.slice(0, 6).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentHead(idx)}
                  className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                    currentHead === idx
                      ? 'bg-indigo-500 text-white'
                      : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
              {layer.attentionHeads.length > 6 && (
                <span className="px-2 py-1 text-sm text-slate-500">
                  +{layer.attentionHeads.length - 6}
                </span>
              )}
            </div>
          </div>

          <AttentionMatrix
            weights={currentAttentionHead?.weights || []}
            tokens={tokens}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-800 rounded-xl border border-slate-700 p-6"
        >
          <h3 className="font-semibold mb-4">All Attention Heads</h3>
          <MultiHeadGrid
            heads={layer.attentionHeads}
            selectedHead={currentHead}
            onSelectHead={setCurrentHead}
            tokens={tokens}
          />
        </motion.div>
      </div>

      {viewMode !== 'simplified' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-800 rounded-xl border border-slate-700 p-6"
        >
          <h3 className="font-semibold mb-4">Feed-Forward Network</h3>
          <FFNVisualization activations={layer.ffnActivations || []} />
        </motion.div>
      )}

      {viewMode !== 'simplified' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-800/50 rounded-xl border border-slate-700 p-6"
        >
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            About Transformer Layers
          </h3>
          <div className="text-sm text-slate-400 space-y-2">
            <p>
              <strong className="text-slate-300">Self-Attention:</strong> Each token computes attention weights to all previous tokens, determining how much to "attend" to each one.
            </p>
            <p>
              <strong className="text-slate-300">Multi-Head Attention:</strong> Multiple attention heads learn different patterns (e.g., attending to previous word, first word, syntactic relations).
            </p>
            <p>
              <strong className="text-slate-300">Feed-Forward Network:</strong> After attention, each position passes through a two-layer MLP with GeLU activation.
            </p>
            {viewMode === 'expert' && (
              <p>
                <strong className="text-slate-300">Residual Connections:</strong> Input is added back to output at each sub-layer: <code className="bg-slate-700 px-1 rounded">x + Attention(x)</code> and <code className="bg-slate-700 px-1 rounded">x + FFN(x)</code>
              </p>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
