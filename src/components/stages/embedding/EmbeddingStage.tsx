import { motion } from 'framer-motion';
import { usePipelineStore } from '../../../store/pipelineStore';
import { useVisualizationStore } from '../../../store/visualizationStore';
import { EmbeddingSpace3D } from './EmbeddingSpace3D';
import { EmbeddingMatrix } from './EmbeddingMatrix';
import { PositionalEncodingView } from './PositionalEncodingView';

export function EmbeddingStage() {
  const { tokens, embeddings } = usePipelineStore();
  const { viewMode, show3DEmbeddings } = useVisualizationStore();

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold mb-2">Token Embeddings</h2>
        <p className="text-slate-400">
          Each token is converted into a high-dimensional vector representation
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-800 rounded-xl border border-slate-700 p-6"
        >
          <h3 className="font-semibold mb-4">Token → Embedding Lookup</h3>
          <div className="space-y-3">
            {tokens.slice(0, 8).map((token, index) => (
              <motion.div
                key={token.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-4"
              >
                <div className="w-20 px-3 py-1 bg-indigo-500 rounded text-sm font-mono text-center truncate">
                  {token.text === ' ' ? '␣' : token.text}
                </div>
                <svg className="w-4 h-4 text-slate-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <div className="flex-1 h-6 bg-slate-700 rounded overflow-hidden">
                  <div className="h-full flex">
                    {embeddings[index]?.slice(0, 50).map((val, i) => (
                      <div
                        key={i}
                        className="flex-1"
                        style={{
                          backgroundColor: val > 0
                            ? `rgba(99, 102, 241, ${Math.abs(val)})`
                            : `rgba(239, 68, 68, ${Math.abs(val)})`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
            {tokens.length > 8 && (
              <div className="text-sm text-slate-500 text-center">
                + {tokens.length - 8} more tokens
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-800 rounded-xl border border-slate-700 p-6"
        >
          <h3 className="font-semibold mb-4">Positional Encoding</h3>
          <PositionalEncodingView tokens={tokens} />
        </motion.div>
      </div>

      {show3DEmbeddings && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-800 rounded-xl border border-slate-700 p-6"
        >
          <h3 className="font-semibold mb-4">3D Embedding Space (PCA Projection)</h3>
          <div className="h-[400px] rounded-lg overflow-hidden">
            <EmbeddingSpace3D tokens={tokens} embeddings={embeddings} />
          </div>
          <p className="mt-2 text-sm text-slate-500 text-center">
            Drag to rotate, scroll to zoom
          </p>
        </motion.div>
      )}

      {viewMode === 'expert' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-800 rounded-xl border border-slate-700 p-6"
        >
          <h3 className="font-semibold mb-4">Embedding Matrix</h3>
          <EmbeddingMatrix embeddings={embeddings} tokens={tokens} />
        </motion.div>
      )}

      {viewMode !== 'simplified' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-slate-800/50 rounded-xl border border-slate-700 p-6"
        >
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            About Embeddings
          </h3>
          <div className="text-sm text-slate-400 space-y-2">
            <p>
              <strong className="text-slate-300">Token Embeddings:</strong> Each token is mapped to a learned vector (typically 768-4096 dimensions) that captures semantic meaning.
            </p>
            <p>
              <strong className="text-slate-300">Positional Encodings:</strong> Since transformers process all tokens in parallel, position information is added using sinusoidal functions or learned embeddings.
            </p>
            {viewMode === 'expert' && (
              <p>
                The final embedding for each position is the sum of the token embedding and positional encoding: <code className="bg-slate-700 px-1 rounded">h_0 = E_token + E_pos</code>
              </p>
            )}
          </div>
        </motion.div>
      )}

      {viewMode !== 'simplified' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-slate-800/50 rounded-xl border border-slate-700 p-6"
        >
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Positional Encoding & Context Length
          </h3>
          <div className="text-sm text-slate-400 space-y-2">
            <p>
              <strong className="text-slate-300">Why Position Matters:</strong> Positional encodings tell the model where each token is in the sequence. Without them, "the cat sat on the mat" and "mat the on sat cat the" would be identical to the model.
            </p>
            <p>
              <strong className="text-slate-300">Context Limits:</strong> The positional encoding scheme determines the maximum context length. Models are trained with a fixed maximum position (e.g., 2048, 4096, 128K), and may struggle with positions they haven't seen during training.
            </p>
            {viewMode === 'expert' && (
              <>
                <p>
                  <strong className="text-slate-300">RoPE (Rotary Position Embedding):</strong> Modern models like LLaMA use RoPE, which encodes position by rotating the embedding vectors. This allows for better extrapolation to longer sequences than absolute positional encodings.
                </p>
                <p>
                  <strong className="text-slate-300">ALiBi (Attention with Linear Biases):</strong> An alternative approach that adds position-dependent biases directly to attention scores, allowing unlimited context length without retraining.
                </p>
              </>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
