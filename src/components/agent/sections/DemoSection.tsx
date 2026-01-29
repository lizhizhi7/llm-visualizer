import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVisualizationStore } from '../../../store/visualizationStore';

interface AgentStep {
  type: 'thought' | 'action' | 'observation' | 'answer';
  content: string;
  toolName?: string;
  toolArgs?: Record<string, unknown>;
}

const scenarios: { id: string; name: string; task: string; steps: AgentStep[] }[] = [
  {
    id: 'weather',
    name: 'Weather Query',
    task: "What's the weather like in Tokyo right now?",
    steps: [
      { type: 'thought', content: "The user wants current weather information for Tokyo. I'll need to search for this data." },
      { type: 'action', content: 'search({ query: "current weather Tokyo Japan" })', toolName: 'search', toolArgs: { query: 'current weather Tokyo Japan' } },
      { type: 'observation', content: 'Tokyo, Japan: 22°C (72°F), Clear skies. Humidity: 58%. Wind: 8 km/h NE. UV Index: 6 (High).' },
      { type: 'thought', content: 'I have the current weather data for Tokyo. I can now provide a complete answer.' },
      { type: 'answer', content: "The current weather in Tokyo is 22°C (72°F) with clear skies. It's a pleasant day with 58% humidity and light winds from the northeast at 8 km/h. Note that the UV index is high at 6, so sunscreen is recommended if you're going outside." },
    ],
  },
  {
    id: 'calculation',
    name: 'Multi-step Calculation',
    task: 'If I invest $10,000 at 7% annual interest, how much will I have after 5 years with compound interest?',
    steps: [
      { type: 'thought', content: 'This is a compound interest calculation. The formula is A = P(1 + r)^t where P is principal, r is rate, and t is time. Let me calculate.' },
      { type: 'action', content: 'calculator({ expression: "10000 * (1.07 ^ 5)" })', toolName: 'calculator', toolArgs: { expression: '10000 * (1.07 ^ 5)' } },
      { type: 'observation', content: 'Result: 14025.517307' },
      { type: 'thought', content: 'The calculation shows $14,025.52 after 5 years. I should also calculate the total interest earned.' },
      { type: 'action', content: 'calculator({ expression: "14025.52 - 10000" })', toolName: 'calculator', toolArgs: { expression: '14025.52 - 10000' } },
      { type: 'observation', content: 'Result: 4025.52' },
      { type: 'answer', content: 'After 5 years of compound interest at 7% annually, your $10,000 investment would grow to $14,025.52. That means you would earn $4,025.52 in interest over the 5-year period.' },
    ],
  },
  {
    id: 'research',
    name: 'Research Task',
    task: 'What are the main differences between React and Vue.js?',
    steps: [
      { type: 'thought', content: "I should search for a comparison of React and Vue.js to provide accurate, up-to-date information." },
      { type: 'action', content: 'search({ query: "React vs Vue.js comparison 2024" })', toolName: 'search', toolArgs: { query: 'React vs Vue.js comparison 2024' } },
      { type: 'observation', content: 'React: Component-based, JSX syntax, one-way data flow, large ecosystem, backed by Meta. Vue: Template-based, simpler syntax, two-way binding, smaller bundle, backed by community.' },
      { type: 'thought', content: "I have good comparison data. Let me also check specific technical differences." },
      { type: 'action', content: 'search({ query: "React Vue.js performance learning curve" })', toolName: 'search', toolArgs: { query: 'React Vue.js performance learning curve' } },
      { type: 'observation', content: 'Learning: Vue generally easier for beginners, React has steeper curve. Performance: Both excellent, Vue slightly smaller bundle. State: React uses external (Redux), Vue has built-in Vuex/Pinia.' },
      { type: 'answer', content: "Here are the main differences between React and Vue.js:\n\n**Syntax:** React uses JSX (JavaScript + HTML), while Vue uses HTML-based templates that are more familiar to traditional web developers.\n\n**Data Flow:** React enforces one-way data binding, making data flow predictable. Vue supports two-way binding with v-model, which is convenient for forms.\n\n**Learning Curve:** Vue is generally considered easier for beginners due to its simpler API and better documentation. React's functional approach requires understanding more concepts upfront.\n\n**State Management:** React typically uses external libraries like Redux. Vue has official solutions (Vuex/Pinia) that integrate seamlessly.\n\n**Ecosystem:** React has a larger ecosystem and job market. Vue has a more opinionated, cohesive toolset." },
    ],
  },
];

export function DemoSection() {
  const { viewMode } = useVisualizationStore();
  const [selectedScenario, setSelectedScenario] = useState(scenarios[0]);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);

  const visibleSteps = selectedScenario.steps.slice(0, currentStepIndex + 1);

  const runDemo = () => {
    setCurrentStepIndex(-1);
    setIsRunning(true);
  };

  useEffect(() => {
    if (!isRunning) return;

    if (currentStepIndex < selectedScenario.steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStepIndex((i) => i + 1);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setIsRunning(false);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isRunning, currentStepIndex, selectedScenario.steps.length]);

  const reset = () => {
    setIsRunning(false);
    setCurrentStepIndex(-1);
  };

  const handleScenarioChange = (scenario: typeof scenarios[0]) => {
    reset();
    setSelectedScenario(scenario);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold mb-4">Interactive Agent Demo</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Watch an AI agent work through a task step by step, seeing its thoughts, actions, and observations.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-slate-800 rounded-xl border border-slate-700 p-6"
      >
        <h3 className="font-semibold mb-4">Select a Scenario</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {scenarios.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => handleScenarioChange(scenario)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedScenario.id === scenario.id
                  ? 'bg-indigo-500 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {scenario.name}
            </button>
          ))}
        </div>

        <div className="bg-slate-900 rounded-lg p-4 mb-4">
          <div className="text-xs text-slate-500 mb-1">Task:</div>
          <div className="text-lg">{selectedScenario.task}</div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={runDemo}
            disabled={isRunning}
            className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 disabled:bg-slate-600 disabled:cursor-not-allowed rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            {isRunning ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Running...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                </svg>
                Run Demo
              </>
            )}
          </button>
          <button
            onClick={reset}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg font-medium transition-colors"
          >
            Reset
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-slate-800 rounded-xl border border-slate-700 p-6"
      >
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          Agent Trace
        </h3>

        <div className="space-y-3 min-h-[300px]">
          <AnimatePresence mode="popLayout">
            {visibleSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20, height: 0 }}
                animate={{ opacity: 1, x: 0, height: 'auto' }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
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
                <div className="flex items-center gap-2 text-xs font-semibold uppercase text-slate-400 mb-2">
                  {step.type === 'thought' && (
                    <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  )}
                  {step.type === 'action' && (
                    <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  )}
                  {step.type === 'observation' && (
                    <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                  {step.type === 'answer' && (
                    <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  {step.type}
                </div>
                <div className={`text-sm whitespace-pre-wrap ${step.type === 'action' ? 'font-mono text-green-400' : ''}`}>
                  {step.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {visibleSteps.length === 0 && !isRunning && (
            <div className="flex items-center justify-center h-[300px] text-slate-500">
              Click "Run Demo" to see the agent in action
            </div>
          )}

          {isRunning && currentStepIndex < selectedScenario.steps.length - 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-slate-400 text-sm"
            >
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Agent is thinking...
            </motion.div>
          )}
        </div>
      </motion.div>

      {viewMode !== 'simplified' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-800 rounded-xl border border-slate-700 p-6"
        >
          <h3 className="font-semibold mb-4">Available Tools</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { name: 'search', icon: '🔍', desc: 'Web search' },
              { name: 'calculator', icon: '🔢', desc: 'Math operations' },
              { name: 'read_file', icon: '📄', desc: 'Read files' },
              { name: 'write_file', icon: '✏️', desc: 'Write files' },
            ].map((tool) => (
              <div key={tool.name} className="bg-slate-700/50 rounded-lg p-3 text-center">
                <div className="text-2xl mb-1">{tool.icon}</div>
                <div className="text-sm font-mono text-indigo-400">{tool.name}</div>
                <div className="text-xs text-slate-500">{tool.desc}</div>
              </div>
            ))}
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            Raw Agent Output
          </h3>
          <div className="text-sm text-slate-400 mb-3">
            In a real implementation, the agent would output structured JSON that the system parses and executes.
          </div>
          <pre className="bg-slate-900 rounded-lg p-4 text-xs overflow-x-auto">
            <code className="text-slate-300">{`{
  "thinking": "${selectedScenario.steps[0]?.content.slice(0, 50)}...",
  "tool_calls": [
    {
      "name": "${selectedScenario.steps[1]?.toolName || 'search'}",
      "arguments": ${JSON.stringify(selectedScenario.steps[1]?.toolArgs || {}, null, 2).split('\n').join('\n      ')}
    }
  ]
}`}</code>
          </pre>
        </motion.div>
      )}
    </div>
  );
}
