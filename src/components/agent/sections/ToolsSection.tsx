import { motion } from 'framer-motion';
import { useVisualizationStore } from '../../../store/visualizationStore';

export function ToolsSection() {
  const { viewMode } = useVisualizationStore();

  const exampleTools = [
    { name: 'search', description: 'Search the web for information', icon: '🔍' },
    { name: 'calculator', description: 'Perform mathematical calculations', icon: '🔢' },
    { name: 'read_file', description: 'Read contents of a file', icon: '📄' },
    { name: 'write_file', description: 'Write content to a file', icon: '✏️' },
    { name: 'run_code', description: 'Execute code in a sandbox', icon: '💻' },
    { name: 'send_email', description: 'Send an email message', icon: '📧' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold mb-4">Tools & Function Calling</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Tools give the LLM the ability to take actions in the world. The model decides which tool to call and what arguments to pass.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-slate-800 rounded-xl border border-slate-700 p-6"
      >
        <h3 className="font-semibold mb-4">Example Tools</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {exampleTools.map((tool) => (
            <div
              key={tool.name}
              className="bg-slate-700/50 rounded-lg p-4 flex items-start gap-3"
            >
              <span className="text-2xl">{tool.icon}</span>
              <div>
                <div className="font-mono text-sm text-indigo-400">{tool.name}</div>
                <div className="text-xs text-slate-400 mt-1">{tool.description}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-slate-800 rounded-xl border border-slate-700 p-6"
      >
        <h3 className="font-semibold mb-4">How Tool Calling Works</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold">1</span>
            </div>
            <div>
              <div className="font-medium">LLM Receives Tool Definitions</div>
              <div className="text-sm text-slate-400">The system prompt includes descriptions of available tools and their parameters</div>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold">2</span>
            </div>
            <div>
              <div className="font-medium">LLM Decides to Call a Tool</div>
              <div className="text-sm text-slate-400">Based on the task, the model outputs a structured tool call with arguments</div>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold">3</span>
            </div>
            <div>
              <div className="font-medium">System Executes the Tool</div>
              <div className="text-sm text-slate-400">Your code parses the tool call and runs the actual function</div>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold">4</span>
            </div>
            <div>
              <div className="font-medium">Result Returned to LLM</div>
              <div className="text-sm text-slate-400">The tool output is added to the conversation for the LLM to process</div>
            </div>
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            Tool Definition Example
          </h3>
          <pre className="bg-slate-900 rounded-lg p-4 text-sm overflow-x-auto">
            <code className="text-slate-300">{`{
  "name": "search",
  "description": "Search the web for current information",
  "parameters": {
    "type": "object",
    "properties": {
      "query": {
        "type": "string",
        "description": "The search query"
      },
      "max_results": {
        "type": "integer",
        "description": "Maximum number of results",
        "default": 5
      }
    },
    "required": ["query"]
  }
}`}</code>
          </pre>
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
            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Tool Call Example
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-slate-500 mb-2">LLM Output:</div>
              <pre className="bg-slate-900 rounded-lg p-3 text-sm">
                <code className="text-amber-400">{`{
  "tool": "search",
  "arguments": {
    "query": "weather in Tokyo",
    "max_results": 3
  }
}`}</code>
              </pre>
            </div>
            <div>
              <div className="text-xs text-slate-500 mb-2">Tool Result:</div>
              <pre className="bg-slate-900 rounded-lg p-3 text-sm">
                <code className="text-green-400">{`{
  "results": [
    "Tokyo: 22°C, Partly cloudy",
    "7-day forecast available",
    "Humidity: 65%"
  ]
}`}</code>
              </pre>
            </div>
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Advanced: Parallel Tool Calling
          </h3>
          <div className="text-sm text-slate-400 space-y-3">
            <p>
              Modern LLMs can call multiple tools in parallel when the calls are independent. This significantly speeds up agent execution.
            </p>
            <pre className="bg-slate-900 rounded-lg p-3 text-xs overflow-x-auto">
              <code className="text-slate-300">{`// LLM can output multiple tool calls at once
[
  { "tool": "search", "arguments": { "query": "Tesla stock price" } },
  { "tool": "search", "arguments": { "query": "Tesla earnings report" } },
  { "tool": "calculator", "arguments": { "expression": "1500 * 0.15" } }
]`}</code>
            </pre>
            <p>
              <strong className="text-slate-300">JSON Schema:</strong> Tool parameters use JSON Schema for type validation. This helps the LLM understand expected types and constraints.
            </p>
            <p>
              <strong className="text-slate-300">Error Handling:</strong> Tools should return structured errors that help the LLM understand what went wrong and retry appropriately.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
