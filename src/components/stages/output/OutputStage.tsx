import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { usePipelineStore } from '../../../store/pipelineStore';
import { useVisualizationStore } from '../../../store/visualizationStore';
import { TokenProbabilities } from './TokenProbabilities';
import { SamplingControls } from './SamplingControls';
import { GenerationStream } from './GenerationStream';
import {
  generateOutputLogits,
  applySoftmaxWithTemperature,
  applyTopK,
  applyTopP,
} from '../../../services/simulation';

const commonTokens = [
  'the', 'a', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
  'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
  'should', 'may', 'might', 'must', 'can', 'to', 'of', 'in', 'for',
  'on', 'with', 'at', 'by', 'from', 'or', 'and', 'but', 'if', 'then',
  'that', 'this', 'it', 'I', 'you', 'he', 'she', 'we', 'they', 'me',
];

export function OutputStage() {
  const { tokens, generationConfig } = usePipelineStore();
  const { viewMode } = useVisualizationStore();
  const [isGenerating, setIsGenerating] = useState(false);

  const { topTokens } = useMemo(() => {
    const rawLogits = generateOutputLogits(tokens.length, commonTokens.length);

    let probs = applySoftmaxWithTemperature(rawLogits, generationConfig.temperature);
    probs = applyTopK(probs, generationConfig.topK);
    probs = applyTopP(probs, generationConfig.topP);

    const indexed = probs
      .map((prob, i) => ({
        token: commonTokens[i] || `token_${i}`,
        probability: prob,
        logit: rawLogits[i],
      }))
      .filter((t) => t.probability > 0)
      .sort((a, b) => b.probability - a.probability)
      .slice(0, 20);

    return {
      logits: rawLogits,
      probabilities: probs,
      topTokens: indexed,
    };
  }, [tokens.length, generationConfig]);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold mb-2">Output Generation</h2>
        <p className="text-slate-400">
          Predicting the next token from the probability distribution
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-slate-800 rounded-xl border border-slate-700 p-6"
        >
          <h3 className="font-semibold mb-4">Token Probabilities</h3>
          <TokenProbabilities tokens={topTokens} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-800 rounded-xl border border-slate-700 p-6"
        >
          <h3 className="font-semibold mb-4">Sampling Parameters</h3>
          <SamplingControls />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-slate-800 rounded-xl border border-slate-700 p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Generated Text</h3>
          <button
            onClick={() => setIsGenerating(!isGenerating)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              isGenerating
                ? 'bg-amber-500 hover:bg-amber-600'
                : 'bg-indigo-500 hover:bg-indigo-600'
            }`}
          >
            {isGenerating ? 'Stop' : 'Generate'}
          </button>
        </div>
        <GenerationStream
          isGenerating={isGenerating}
          onComplete={() => setIsGenerating(false)}
        />
      </motion.div>

      {viewMode !== 'simplified' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-4">
            <h4 className="font-medium text-sm text-slate-400 mb-2">Logits → Softmax</h4>
            <p className="text-xs text-slate-500">
              Raw model outputs (logits) are converted to probabilities using the softmax function: exp(logit) / sum(exp(all_logits))
            </p>
          </div>
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-4">
            <h4 className="font-medium text-sm text-slate-400 mb-2">Temperature</h4>
            <p className="text-xs text-slate-500">
              Divides logits before softmax. Higher = flatter distribution (more random), Lower = sharper (more deterministic)
            </p>
          </div>
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-4">
            <h4 className="font-medium text-sm text-slate-400 mb-2">Top-K / Top-P</h4>
            <p className="text-xs text-slate-500">
              Filters the distribution to only consider the K highest probability tokens, or tokens comprising P cumulative probability
            </p>
          </div>
        </motion.div>
      )}

      {viewMode === 'expert' && (
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
            Technical Details
          </h3>
          <div className="text-sm text-slate-400 space-y-2">
            <p>
              <strong className="text-slate-300">Autoregressive Generation:</strong> The model generates one token at a time, each conditioned on all previous tokens.
            </p>
            <p>
              <strong className="text-slate-300">Vocabulary Size:</strong> Typically 32K-100K tokens. Each position in the logits vector corresponds to one vocabulary token.
            </p>
            <p>
              <strong className="text-slate-300">Sampling Strategies:</strong> Greedy (always pick highest prob), Top-K, Top-P (nucleus), or temperature sampling each offer different trade-offs between quality and diversity.
            </p>
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Context During Generation
          </h3>
          <div className="text-sm text-slate-400 space-y-2">
            <p>
              <strong className="text-slate-300">Growing Context:</strong> As each token is generated, it becomes part of the context for the next prediction. The context window fills up: [prompt] → [prompt + token1] → [prompt + token1 + token2] → ...
            </p>
            <p>
              <strong className="text-slate-300">Context Limit:</strong> When the context window is full, the model must either stop or use strategies like truncating old tokens. This is why long conversations may "forget" earlier messages.
            </p>
            {viewMode === 'expert' && (
              <>
                <p>
                  <strong className="text-slate-300">Sliding Window:</strong> Some models use a sliding window approach—keeping only the most recent N tokens. This trades off full context access for constant memory usage.
                </p>
                <p>
                  <strong className="text-slate-300">System Prompts:</strong> In chat applications, system instructions stay at the beginning of the context and are re-sent every turn. They're not "remembered" by the model—they're literally present in every request.
                </p>
                <p>
                  <strong className="text-slate-300">RAG (Retrieval-Augmented Generation):</strong> Since models can't remember everything, RAG systems retrieve relevant information and inject it into the context just-in-time, effectively giving models access to external knowledge bases.
                </p>
              </>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
