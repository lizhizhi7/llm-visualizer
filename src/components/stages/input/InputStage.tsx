import { useState } from 'react';
import { motion } from 'framer-motion';
import { usePipelineStore } from '../../../store/pipelineStore';
import { useVisualizationStore } from '../../../store/visualizationStore';
import { tokenizeWithSteps } from '../../../services/tokenizer';
import { generateAllEmbeddings, generateAllLayers } from '../../../services/simulation';
import { ExampleSelector } from './ExampleSelector';

export function InputStage() {
  const { inputText, update } = usePipelineStore();
  const { viewMode } = useVisualizationStore();
  const [localText, setLocalText] = useState(inputText);

  const handleProcess = () => {
    if (!localText.trim()) return;

    const { tokens, steps } = tokenizeWithSteps(localText);
    const embeddings = generateAllEmbeddings(tokens);
    const layers = generateAllLayers(tokens.length);

    update({
      inputText: localText,
      tokens,
      tokenizationSteps: steps,
      currentTokenizationStep: 0,
      embeddings,
      transformerLayers: layers,
      currentStage: 'tokenization',
    });
  };

  const handleSelectExample = (text: string) => {
    setLocalText(text);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold mb-4">Input Your Prompt</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Enter text to see how a Large Language Model processes it through each stage of the pipeline.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-slate-800 rounded-xl border border-slate-700 p-6"
      >
        <label className="block text-sm font-medium text-slate-400 mb-2">
          Your Text
        </label>
        <textarea
          value={localText}
          onChange={(e) => setLocalText(e.target.value)}
          placeholder="Enter your text here..."
          className="w-full h-32 px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-lg"
        />

        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-slate-500">
            {localText.length} characters
          </div>
          <button
            onClick={handleProcess}
            disabled={!localText.trim()}
            className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 disabled:bg-slate-600 disabled:cursor-not-allowed rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            Process Text
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-lg font-semibold mb-4">Or try an example:</h3>
        <ExampleSelector onSelect={handleSelectExample} />
      </motion.div>

      {viewMode !== 'simplified' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-800/50 rounded-xl border border-slate-700 p-6"
        >
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            How LLMs Process Text
          </h3>
          <div className="text-sm text-slate-400 space-y-2">
            <p>
              <strong className="text-slate-300">1. Tokenization:</strong> Text is split into tokens (words, subwords, or characters) that the model can process.
            </p>
            <p>
              <strong className="text-slate-300">2. Embedding:</strong> Each token is converted into a high-dimensional vector that captures its meaning.
            </p>
            <p>
              <strong className="text-slate-300">3. Transformer Layers:</strong> The embeddings pass through multiple attention and feed-forward layers.
            </p>
            <p>
              <strong className="text-slate-300">4. Output:</strong> The model predicts the next token based on the processed representations.
            </p>
          </div>
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
            <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
            Context Window & Memory
          </h3>
          <div className="text-sm text-slate-400 space-y-2">
            <p>
              <strong className="text-slate-300">Context Window:</strong> LLMs have a fixed maximum number of tokens they can process at once (e.g., 4K, 8K, 128K, or 200K tokens). This is the model's "working memory" for each request.
            </p>
            <p>
              <strong className="text-slate-300">No Persistent Memory:</strong> Unlike humans, LLMs don't retain information between conversations. Each request starts fresh—the model only "remembers" what's in the current context window.
            </p>
            {viewMode === 'expert' && (
              <>
                <p>
                  <strong className="text-slate-300">Memory Cost:</strong> The attention mechanism scales quadratically with context length (O(n²)), making very long contexts computationally expensive. This is why context windows have limits.
                </p>
                <p>
                  <strong className="text-slate-300">Chat History:</strong> In conversations, the entire chat history must be re-sent each turn. The model doesn't "remember" previous messages—they're simply included in the new context.
                </p>
              </>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
