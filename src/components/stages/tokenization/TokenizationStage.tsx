import { motion } from 'framer-motion';
import { usePipelineStore } from '../../../store/pipelineStore';
import { useVisualizationStore } from '../../../store/visualizationStore';
import { TokenList } from './TokenList';
import { MergeAnimation } from './MergeAnimation';

export function TokenizationStage() {
  const {
    inputText,
    tokenizationSteps,
    currentTokenizationStep,
    setCurrentTokenizationStep,
    tokens,
  } = usePipelineStore();

  const { viewMode } = useVisualizationStore();

  const currentStep = tokenizationSteps[currentTokenizationStep];
  const isComplete = currentTokenizationStep === tokenizationSteps.length - 1;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold mb-2">Tokenization</h2>
        <p className="text-slate-400">
          Converting text into tokens using Byte-Pair Encoding (BPE)
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-slate-800 rounded-xl border border-slate-700 p-6"
      >
        <div className="text-sm text-slate-400 mb-2">Original Input:</div>
        <div className="text-lg bg-slate-900 rounded-lg p-4 font-mono">
          {inputText}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-800 rounded-xl border border-slate-700 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">
              Step {currentTokenizationStep + 1} of {tokenizationSteps.length}
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentTokenizationStep(Math.max(0, currentTokenizationStep - 1))}
                disabled={currentTokenizationStep === 0}
                className="px-3 py-1 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed rounded text-sm"
              >
                Prev
              </button>
              <button
                onClick={() =>
                  setCurrentTokenizationStep(
                    Math.min(tokenizationSteps.length - 1, currentTokenizationStep + 1)
                  )
                }
                disabled={isComplete}
                className="px-3 py-1 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed rounded text-sm"
              >
                Next
              </button>
            </div>
          </div>

          {currentStep && (
            <>
              <div className="mb-4 p-3 bg-indigo-500/10 border border-indigo-500/30 rounded-lg">
                <p className="text-sm text-indigo-300">{currentStep.description}</p>
              </div>

              <MergeAnimation
                tokens={currentStep.tokens}
                mergedIndices={currentStep.mergedIndices}
              />
            </>
          )}

          <div className="mt-4 h-2 bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-indigo-500"
              initial={{ width: 0 }}
              animate={{
                width: `${((currentTokenizationStep + 1) / tokenizationSteps.length) * 100}%`,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-800 rounded-xl border border-slate-700 p-6"
        >
          <h3 className="font-semibold mb-4">Final Tokens ({tokens.length})</h3>
          <TokenList tokens={tokens} />
        </motion.div>
      </div>

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
            About Tokenization
          </h3>
          <div className="text-sm text-slate-400 space-y-2">
            <p>
              <strong className="text-slate-300">Byte-Pair Encoding (BPE)</strong> is a subword tokenization algorithm that iteratively merges the most frequent pairs of characters or character sequences.
            </p>
            {viewMode === 'expert' && (
              <>
                <p>
                  BPE starts with a vocabulary of individual characters and learns merge rules from the training corpus. Common words become single tokens, while rare words are split into subwords.
                </p>
                <p>
                  This balances vocabulary size (typically 30k-50k tokens) with the ability to represent any text without unknown tokens.
                </p>
              </>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
