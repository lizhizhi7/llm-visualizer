import { motion } from 'framer-motion';
import { useVisualizationStore } from '../../../store/visualizationStore';

export function PlanningSection() {
  const { viewMode } = useVisualizationStore();

  const taskTree = {
    goal: 'Plan a birthday party',
    subtasks: [
      {
        task: 'Choose venue',
        subtasks: ['Research options', 'Compare prices', 'Book location'],
      },
      {
        task: 'Invite guests',
        subtasks: ['Create guest list', 'Design invitation', 'Send invites'],
      },
      {
        task: 'Arrange catering',
        subtasks: ['Select menu', 'Order food', 'Confirm delivery'],
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold mb-4">Planning & Task Decomposition</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Complex tasks require breaking down into smaller, manageable subtasks. Agents can plan ahead and track progress.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-slate-800 rounded-xl border border-slate-700 p-6"
      >
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
          Task Decomposition Example
        </h3>

        <div className="bg-slate-900 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 bg-purple-500 rounded-full" />
            <span className="font-semibold text-purple-400">{taskTree.goal}</span>
          </div>

          <div className="ml-6 space-y-4">
            {taskTree.subtasks.map((item, i) => (
              <div key={i}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full" />
                  <span className="text-indigo-300">{item.task}</span>
                </div>
                <div className="ml-6 space-y-1">
                  {item.subtasks.map((subtask, j) => (
                    <div key={j} className="flex items-center gap-2 text-sm text-slate-400">
                      <div className="w-1.5 h-1.5 bg-slate-500 rounded-full" />
                      {subtask}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid md:grid-cols-2 gap-6"
      >
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold">Benefits of Planning</h3>
          </div>
          <ul className="text-sm text-slate-400 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-1">•</span>
              Handles complex, multi-step tasks
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-1">•</span>
              Tracks progress and remaining work
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-1">•</span>
              Identifies dependencies between tasks
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-1">•</span>
              Enables parallel execution when possible
            </li>
          </ul>
        </div>

        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h3 className="font-semibold">Reflection & Replanning</h3>
          </div>
          <ul className="text-sm text-slate-400 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-amber-400 mt-1">•</span>
              Evaluate if current approach is working
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 mt-1">•</span>
              Adjust plan based on new information
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 mt-1">•</span>
              Recover from errors or dead ends
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 mt-1">•</span>
              Learn from failed attempts
            </li>
          </ul>
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
            Planning Prompts
          </h3>
          <div className="text-sm text-slate-400 space-y-3">
            <p>Agents can be prompted to plan before acting:</p>
            <div className="bg-slate-900 rounded-lg p-4 font-mono text-xs">
              <div className="text-slate-500"># System prompt for planning agent</div>
              <div className="mt-2 text-slate-300">
                Before taking any actions, first create a plan:<br/>
                1. List the main goal<br/>
                2. Break it into subtasks<br/>
                3. Identify dependencies<br/>
                4. Execute tasks in order<br/>
                5. After each task, evaluate progress<br/>
                6. Adjust plan if needed
              </div>
            </div>
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
            Advanced Planning Techniques
          </h3>
          <div className="text-sm text-slate-400 space-y-3">
            <p>
              <strong className="text-slate-300">Monte Carlo Tree Search (MCTS):</strong> Explore multiple possible action sequences, simulate outcomes, and select the most promising path. Used in AlphaGo and complex reasoning tasks.
            </p>
            <p>
              <strong className="text-slate-300">Self-Reflection:</strong> After each step, the agent critiques its own output. "Did this action help? What could I do better?" Improves accuracy and reduces errors.
            </p>
            <p>
              <strong className="text-slate-300">Constitutional AI:</strong> The agent checks its own outputs against principles (safety, helpfulness) and revises if needed.
            </p>
            <p>
              <strong className="text-slate-300">Plan Verification:</strong> Before executing, verify the plan makes sense. Check for impossible steps, missing dependencies, or logical errors.
            </p>
            <p>
              <strong className="text-slate-300">Hierarchical Planning:</strong> Create high-level plans first, then recursively break down into detailed steps. Allows handling very complex tasks.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
