import { motion } from 'framer-motion';
import { useVisualizationStore } from '../../../store/visualizationStore';

export function OverviewSection() {
  const { viewMode } = useVisualizationStore();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold mb-4">What is an AI Agent?</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          An agent is an LLM that can take actions in the world through tools, observe the results, and continue reasoning until a task is complete.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-slate-800 rounded-xl border border-slate-700 p-8"
      >
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <div className="flex flex-col items-center p-6 bg-slate-700/50 rounded-xl min-w-[140px]">
            <div className="w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center mb-3">
              <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <span className="font-semibold text-lg">LLM</span>
            <span className="text-sm text-slate-400">The Brain</span>
          </div>

          <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>

          <div className="flex flex-col items-center p-6 bg-slate-700/50 rounded-xl min-w-[140px]">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-3">
              <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              </svg>
            </div>
            <span className="font-semibold text-lg">Tools</span>
            <span className="text-sm text-slate-400">The Hands</span>
          </div>

          <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>

          <div className="flex flex-col items-center p-6 bg-slate-700/50 rounded-xl min-w-[140px]">
            <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mb-3">
              <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <span className="font-semibold text-lg">Loop</span>
            <span className="text-sm text-slate-400">The Process</span>
          </div>

          <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>

          <div className="flex flex-col items-center p-6 bg-purple-500/20 rounded-xl min-w-[140px]">
            <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mb-3">
              <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="font-semibold text-lg">Agent</span>
            <span className="text-sm text-slate-400">The Result</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid md:grid-cols-2 gap-6"
      >
        <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Plain LLM
          </h3>
          <div className="text-sm text-slate-400 space-y-2">
            <p>Receives a prompt and generates text</p>
            <p>Cannot take actions or access external information</p>
            <p>One response per request</p>
          </div>
        </div>

        <div className="bg-slate-800/50 rounded-xl border border-indigo-500/30 p-6">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            LLM Agent
          </h3>
          <div className="text-sm text-slate-400 space-y-2">
            <p>Receives a goal and works to achieve it</p>
            <p>Can use tools to interact with the world</p>
            <p>Loops until the task is complete</p>
          </div>
        </div>
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
            Agent Architecture
          </h3>
          <div className="text-sm text-slate-400 space-y-3">
            <p>
              <strong className="text-slate-300">Core Loop:</strong> The agent repeatedly (1) observes the current state, (2) thinks about what to do next, (3) takes an action using a tool, and (4) incorporates the result.
            </p>
            <p>
              <strong className="text-slate-300">Tool Interface:</strong> Tools are functions the LLM can call with specific arguments. The LLM decides which tool to use and what arguments to pass based on the task.
            </p>
            <p>
              <strong className="text-slate-300">State Management:</strong> The conversation history serves as the agent's working memory, accumulating observations and actions over time.
            </p>
          </div>
        </motion.div>
      )}

      {viewMode === 'expert' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-800/50 rounded-xl border border-slate-700 p-6"
        >
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            Agent Frameworks
          </h3>
          <div className="text-sm text-slate-400 space-y-3">
            <p>
              <strong className="text-slate-300">LangChain/LangGraph:</strong> Popular Python framework with composable chains and built-in tool integrations. LangGraph adds stateful, multi-actor orchestration.
            </p>
            <p>
              <strong className="text-slate-300">AutoGPT / BabyAGI:</strong> Early autonomous agent architectures that demonstrated self-prompting loops with task queues.
            </p>
            <p>
              <strong className="text-slate-300">Claude Computer Use / OpenAI Swarm:</strong> First-party agent frameworks from model providers with native tool calling support.
            </p>
            <p>
              <strong className="text-slate-300">Custom Implementations:</strong> Many production systems use custom agent loops tailored to specific domains with guardrails and monitoring.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
