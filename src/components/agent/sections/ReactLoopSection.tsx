import { motion } from 'framer-motion';
import { useVisualizationStore } from '../../../store/visualizationStore';

export function ReactLoopSection() {
  const { viewMode } = useVisualizationStore();

  const traceSteps = [
    {
      type: 'thought',
      content: 'The user wants to know the weather in Paris. I should use the search tool to find current weather information.',
    },
    {
      type: 'action',
      content: 'search({ query: "current weather in Paris" })',
    },
    {
      type: 'observation',
      content: 'Paris, France: 18°C (64°F), Partly cloudy. Humidity: 72%. Wind: 12 km/h.',
    },
    {
      type: 'thought',
      content: 'I now have the current weather information for Paris. I can provide a complete answer to the user.',
    },
    {
      type: 'answer',
      content: 'The current weather in Paris is 18°C (64°F) with partly cloudy skies. The humidity is 72% with light winds at 12 km/h.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold mb-4">The ReAct Loop</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          ReAct (Reasoning + Acting) is a pattern where the agent alternates between thinking about what to do and taking actions.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-slate-800 rounded-xl border border-slate-700 p-8"
      >
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center p-6 bg-indigo-500/20 rounded-xl border border-indigo-500/30"
          >
            <div className="w-14 h-14 bg-indigo-500 rounded-full flex items-center justify-center mb-3">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <span className="font-semibold">Thought</span>
            <span className="text-xs text-slate-400">Reason about the task</span>
          </motion.div>

          <motion.svg
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="w-8 h-8 text-slate-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </motion.svg>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center p-6 bg-green-500/20 rounded-xl border border-green-500/30"
          >
            <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center mb-3">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-semibold">Action</span>
            <span className="text-xs text-slate-400">Call a tool</span>
          </motion.div>

          <motion.svg
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="w-8 h-8 text-slate-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </motion.svg>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col items-center p-6 bg-amber-500/20 rounded-xl border border-amber-500/30"
          >
            <div className="w-14 h-14 bg-amber-500 rounded-full flex items-center justify-center mb-3">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <span className="font-semibold">Observation</span>
            <span className="text-xs text-slate-400">See the result</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6 flex justify-center"
        >
          <svg className="w-32 h-8 text-slate-500" viewBox="0 0 128 32">
            <path
              d="M 120 8 L 120 24 L 8 24 L 8 8"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M 4 12 L 8 8 L 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
        <div className="text-center text-sm text-slate-500">Repeat until task is complete</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-slate-800 rounded-xl border border-slate-700 p-6"
      >
        <h3 className="font-semibold mb-4">Example Trace</h3>
        <div className="space-y-3">
          {traceSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className={`rounded-lg p-4 ${
                step.type === 'thought'
                  ? 'bg-indigo-500/10 border-l-4 border-indigo-500'
                  : step.type === 'action'
                  ? 'bg-green-500/10 border-l-4 border-green-500'
                  : step.type === 'observation'
                  ? 'bg-amber-500/10 border-l-4 border-amber-500'
                  : 'bg-purple-500/10 border-l-4 border-purple-500'
              }`}
            >
              <div className="text-xs font-semibold uppercase text-slate-400 mb-1">
                {step.type}
              </div>
              <div className={`text-sm ${step.type === 'action' ? 'font-mono text-green-400' : ''}`}>
                {step.content}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

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
            Why ReAct Works
          </h3>
          <div className="text-sm text-slate-400 space-y-2">
            <p>
              <strong className="text-slate-300">Explicit Reasoning:</strong> By forcing the model to articulate its thinking, ReAct produces more interpretable and accurate results.
            </p>
            <p>
              <strong className="text-slate-300">Grounded Actions:</strong> Each action is based on explicit reasoning, reducing hallucinations and random tool calls.
            </p>
            <p>
              <strong className="text-slate-300">Error Recovery:</strong> When a tool fails, the model can reason about what went wrong and try a different approach.
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
            <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Alternative Paradigms
          </h3>
          <div className="text-sm text-slate-400 space-y-3">
            <p>
              <strong className="text-slate-300">Chain-of-Thought (CoT):</strong> Pure reasoning without actions. Good for math and logic problems, but cannot interact with external systems.
            </p>
            <p>
              <strong className="text-slate-300">Tree-of-Thoughts (ToT):</strong> Explores multiple reasoning paths simultaneously, backtracking when needed. More computationally expensive but better for complex planning.
            </p>
            <p>
              <strong className="text-slate-300">ReWOO:</strong> Separates planning from execution—first generates a full plan, then executes all tools, reducing LLM calls.
            </p>
            <p>
              <strong className="text-slate-300">LATS (Language Agent Tree Search):</strong> Combines Monte Carlo Tree Search with LLM reasoning for complex multi-step tasks.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
