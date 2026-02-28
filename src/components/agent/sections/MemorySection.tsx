import { motion } from 'framer-motion';
import { useVisualizationStore } from '../../../store/visualizationStore';

export function MemorySection() {
  const { viewMode } = useVisualizationStore();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold mb-4">Agent Memory</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Agents need memory to maintain context across interactions and retrieve relevant information from large knowledge bases.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid md:grid-cols-2 gap-6"
      >
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-indigo-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Short-Term Memory</h3>
              <div className="text-sm text-slate-400">The Context Window</div>
            </div>
          </div>
          <div className="text-sm text-slate-400 space-y-2">
            <p>Think of this as the agent's "notepad" - everything in the current conversation.</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Previous messages and responses</li>
              <li>Tool calls and their results</li>
              <li>System instructions</li>
              <li>Limited by context window size</li>
            </ul>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Long-Term Memory</h3>
              <div className="text-sm text-slate-400">External Storage + RAG</div>
            </div>
          </div>
          <div className="text-sm text-slate-400 space-y-2">
            <p>Think of this as a "filing cabinet" - information stored outside the model.</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Vector databases for similarity search</li>
              <li>Document stores and knowledge bases</li>
              <li>Past conversation summaries</li>
              <li>Virtually unlimited capacity</li>
            </ul>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-slate-800 rounded-xl border border-slate-700 p-6"
      >
        <h3 className="font-semibold mb-4">RAG: Retrieval-Augmented Generation</h3>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex-1 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">1</div>
              <div>
                <div className="font-medium">Query</div>
                <div className="text-sm text-slate-400">User asks a question</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">2</div>
              <div>
                <div className="font-medium">Embed</div>
                <div className="text-sm text-slate-400">Convert question to vector</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">3</div>
              <div>
                <div className="font-medium">Retrieve</div>
                <div className="text-sm text-slate-400">Find similar documents</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">4</div>
              <div>
                <div className="font-medium">Generate</div>
                <div className="text-sm text-slate-400">LLM answers with context</div>
              </div>
            </div>
          </div>
          <div className="w-px h-32 bg-slate-700 hidden md:block" />
          <div className="flex-1 bg-slate-900 rounded-lg p-4">
            <div className="text-xs text-slate-500 mb-2">Example Flow:</div>
            <div className="text-sm space-y-2">
              <p><span className="text-amber-400">Q:</span> "What's our refund policy?"</p>
              <p><span className="text-green-400">Retrieved:</span> [policy_doc_v2.pdf, faq.md]</p>
              <p><span className="text-indigo-400">A:</span> "Based on our policy, refunds are available within 30 days..."</p>
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Vector Embeddings
          </h3>
          <div className="text-sm text-slate-400 space-y-3">
            <p>
              <strong className="text-slate-300">What are embeddings?</strong> Dense numerical representations of text where similar meanings are close together in vector space.
            </p>
            <div className="bg-slate-900 rounded-lg p-3 font-mono text-xs">
              <div className="text-slate-500"># Similar sentences have similar vectors</div>
              <div>"The cat sat on the mat" → [0.12, -0.34, 0.56, ...]</div>
              <div>"A feline rested on a rug" → [0.11, -0.32, 0.58, ...]  <span className="text-green-400">✓ Similar</span></div>
              <div>"Stock prices fell today" → [-0.45, 0.89, -0.12, ...]  <span className="text-red-400">✗ Different</span></div>
            </div>
            <p>
              <strong className="text-slate-300">Similarity search:</strong> Find documents whose embeddings are closest to the query embedding using cosine similarity or dot product.
            </p>
          </div>
        </motion.div>
      )}

      {viewMode !== 'simplified' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-800/50 rounded-xl border border-slate-700 p-6 space-y-6"
        >
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            Context Passing Between Agents
          </h3>

          <div className="text-sm text-slate-400 space-y-3">
            <p>
              In multi-agent systems, agents must share information without overwhelming each other's context window. The choice of context passing strategy directly impacts cost, latency, and output quality.
            </p>
          </div>

          <div className="bg-slate-900 rounded-lg p-4">
            <div className="text-xs text-slate-500 mb-3">Agent-to-Agent Context Flow:</div>
            <div className="flex items-center justify-between gap-2 text-sm">
              <div className="bg-indigo-500/20 border border-indigo-500/40 rounded-lg px-3 py-2 text-center">
                <div className="font-medium text-indigo-300">Research Agent</div>
                <div className="text-xs text-slate-500 mt-1">Gathers data</div>
              </div>
              <div className="flex-1 flex flex-col items-center">
                <div className="text-xs text-slate-500 mb-1">context handoff</div>
                <div className="w-full h-px bg-gradient-to-r from-indigo-500 to-purple-500 relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-l-4 border-l-purple-500 border-y-4 border-y-transparent" />
                </div>
              </div>
              <div className="bg-purple-500/20 border border-purple-500/40 rounded-lg px-3 py-2 text-center">
                <div className="font-medium text-purple-300">Writing Agent</div>
                <div className="text-xs text-slate-500 mt-1">Drafts report</div>
              </div>
              <div className="flex-1 flex flex-col items-center">
                <div className="text-xs text-slate-500 mb-1">context handoff</div>
                <div className="w-full h-px bg-gradient-to-r from-purple-500 to-green-500 relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-l-4 border-l-green-500 border-y-4 border-y-transparent" />
                </div>
              </div>
              <div className="bg-green-500/20 border border-green-500/40 rounded-lg px-3 py-2 text-center">
                <div className="font-medium text-green-300">Review Agent</div>
                <div className="text-xs text-slate-500 mt-1">Checks quality</div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-slate-900 rounded-lg p-4">
              <div className="font-medium text-indigo-300 text-sm mb-2">1. Full Forwarding</div>
              <div className="text-xs text-slate-400 mb-3">Pass entire conversation history to the next agent.</div>
              <div className="bg-slate-800 rounded p-2 font-mono text-xs text-slate-500">
                <div>agent_b.run(</div>
                <div className="ml-2">messages=agent_a.history</div>
                <div>)</div>
              </div>
              <div className="flex items-center gap-2 mt-3 text-xs">
                <span className="text-green-400">+</span><span className="text-slate-500">Simple, no info loss</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-red-400">-</span><span className="text-slate-500">Wastes tokens, hits limits</span>
              </div>
            </div>

            <div className="bg-slate-900 rounded-lg p-4">
              <div className="font-medium text-purple-300 text-sm mb-2">2. Structured Handoff</div>
              <div className="text-xs text-slate-400 mb-3">Pass a structured summary — like a relay baton.</div>
              <div className="bg-slate-800 rounded p-2 font-mono text-xs text-slate-500">
                <div>{'handoff = {'}</div>
                <div className="ml-2">task: "...",</div>
                <div className="ml-2">findings: [...],</div>
                <div className="ml-2">next_steps: [...]</div>
                <div>{'}'}</div>
              </div>
              <div className="flex items-center gap-2 mt-3 text-xs">
                <span className="text-green-400">+</span><span className="text-slate-500">Token-efficient, clear</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-red-400">-</span><span className="text-slate-500">May lose nuance</span>
              </div>
            </div>

            <div className="bg-slate-900 rounded-lg p-4">
              <div className="font-medium text-green-300 text-sm mb-2">3. Shared Blackboard</div>
              <div className="text-xs text-slate-400 mb-3">Agents read/write to a shared store asynchronously.</div>
              <div className="bg-slate-800 rounded p-2 font-mono text-xs text-slate-500">
                <div>board.write("findings",</div>
                <div className="ml-2">agent_a.result)</div>
                <div className="mt-1">ctx = board.read("findings")</div>
                <div>agent_b.run(context=ctx)</div>
              </div>
              <div className="flex items-center gap-2 mt-3 text-xs">
                <span className="text-green-400">+</span><span className="text-slate-500">Scalable, decoupled</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-red-400">-</span><span className="text-slate-500">Coordination complexity</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-lg p-4">
            <div className="text-xs text-slate-500 mb-2">Example: Research → Writing Handoff</div>
            <div className="text-sm space-y-2">
              <p><span className="text-indigo-400">Research Agent:</span> "Found 3 papers on transformer efficiency. Key finding: FlashAttention reduces memory from O(n&sup2;) to O(n)."</p>
              <p><span className="text-purple-400">Handoff:</span> {'{ task: "Write a summary", findings: ["FlashAttention: O(n) memory", "Sparse attention: 60% fewer FLOPs", "KV-cache: 4x faster inference"], audience: "engineers" }'}</p>
              <p><span className="text-green-400">Writing Agent:</span> Uses only the structured handoff — no need to re-read entire research conversation.</p>
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            Advanced Memory Techniques
          </h3>
          <div className="text-sm text-slate-400 space-y-3">
            <p>
              <strong className="text-slate-300">Chunking Strategies:</strong> Documents are split into chunks for indexing. Strategies include fixed-size, sentence-based, semantic, and recursive splitting. Chunk size affects retrieval precision vs. context.
            </p>
            <p>
              <strong className="text-slate-300">Hybrid Search:</strong> Combine vector similarity with keyword search (BM25) for better results. Useful when exact terms matter (product codes, names).
            </p>
            <p>
              <strong className="text-slate-300">Reranking:</strong> Use a cross-encoder model to rerank initial retrieval results for higher precision. More expensive but more accurate.
            </p>
            <p>
              <strong className="text-slate-300">Memory Compression:</strong> Summarize old conversation turns to fit more history in the context window. Trade detail for coverage.
            </p>
            <p>
              <strong className="text-slate-300">Vector Databases:</strong> Pinecone, Weaviate, Chroma, Milvus, pgvector. Each has different tradeoffs for scale, cost, and features.
            </p>
          </div>
        </motion.div>
      )}

      {viewMode === 'expert' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-slate-800/50 rounded-xl border border-slate-700 p-6 space-y-6"
        >
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
            </svg>
            Context Compaction Strategies
          </h3>

          <div className="text-sm text-slate-400 space-y-3">
            <p>
              Context windows are finite and expensive. As conversations grow, agents must compact older context to stay within token limits while preserving critical information.
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-900 rounded-lg p-4">
              <div className="font-medium text-cyan-300 text-sm mb-2">Sliding Window</div>
              <div className="text-xs text-slate-400">
                Keep only the most recent N turns. Simple and predictable, but older context is permanently lost. Best for stateless tasks where recent context is most relevant.
              </div>
              <div className="mt-2 flex items-center gap-1 font-mono text-xs">
                {['msg1', 'msg2', 'msg3', 'msg4', 'msg5'].map((msg, i) => (
                  <div key={msg} className={`px-2 py-1 rounded ${i < 2 ? 'bg-slate-700 text-slate-600 line-through' : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'}`}>
                    {msg}
                  </div>
                ))}
                <span className="text-slate-500 ml-2">← window size = 3</span>
              </div>
            </div>

            <div className="bg-slate-900 rounded-lg p-4">
              <div className="font-medium text-cyan-300 text-sm mb-2">Summarization</div>
              <div className="text-xs text-slate-400">
                Use the LLM itself to compress older turns into a condensed paragraph. Preserves meaning while dramatically reducing token count. Can be run periodically or when approaching context limits.
              </div>
              <div className="mt-2 bg-slate-800 rounded p-3 font-mono text-xs">
                <div className="text-slate-500"># Before: 15 messages, ~3000 tokens</div>
                <div className="text-red-400/60 line-through">User: "What's the weather?" → Agent: "72°F sunny"</div>
                <div className="text-red-400/60 line-through">User: "And tomorrow?" → Agent: "68°F cloudy"</div>
                <div className="text-red-400/60 line-through">User: "Pack an umbrella?" → Agent: "Yes, 40% rain chance"</div>
                <div className="mt-2 text-slate-500"># After: summary + 2 recent messages, ~400 tokens</div>
                <div className="text-cyan-300">[Summary: User checked weather (72°F today, 68°F tomorrow, 40% rain). Advised to bring umbrella.]</div>
                <div className="text-slate-300">User: "What about this weekend?"</div>
                <div className="text-slate-300">Agent: "Saturday 75°F, Sunday 70°F, both clear."</div>
              </div>
            </div>

            <div className="bg-slate-900 rounded-lg p-4">
              <div className="font-medium text-cyan-300 text-sm mb-2">Hierarchical Summarization</div>
              <div className="text-xs text-slate-400">
                For very long sessions, create summaries of summaries. Layer 1 summarizes every ~10 turns, Layer 2 summarizes every ~5 Layer-1 summaries. Enables effectively unlimited conversation length.
              </div>
              <div className="mt-2 bg-slate-800 rounded p-3 font-mono text-xs">
                <div><span className="text-amber-400">L2 Summary:</span> "User building a REST API with auth + CRUD"</div>
                <div className="ml-4"><span className="text-purple-400">L1:</span> "Set up Express server with JWT auth"</div>
                <div className="ml-4"><span className="text-purple-400">L1:</span> "Added user CRUD routes + validation"</div>
                <div className="ml-4"><span className="text-purple-400">L1:</span> "Debugging 403 errors on protected routes"</div>
                <div className="ml-8"><span className="text-slate-400">Recent messages (full detail)...</span></div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-900 rounded-lg p-4">
                <div className="font-medium text-cyan-300 text-sm mb-2">Selective Retention</div>
                <div className="text-xs text-slate-400 mb-2">
                  Classify each message by importance. Keep tool results and key decisions at full fidelity; summarize or drop casual exchanges.
                </div>
                <div className="text-xs space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 bg-red-500/20 text-red-400 rounded text-xs">keep</span>
                    <span className="text-slate-500">Tool results, errors, decisions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 bg-amber-500/20 text-amber-400 rounded text-xs">summarize</span>
                    <span className="text-slate-500">Discussions, reasoning chains</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 bg-slate-600/50 text-slate-500 rounded text-xs">drop</span>
                    <span className="text-slate-500">Greetings, confirmations, filler</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 rounded-lg p-4">
                <div className="font-medium text-cyan-300 text-sm mb-2">Token Budget Allocation</div>
                <div className="text-xs text-slate-400 mb-2">
                  Partition the context window into fixed budgets. Ensures system instructions and recent context always fit.
                </div>
                <div className="text-xs space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-3 bg-indigo-500/40 rounded-sm" />
                    <span className="text-slate-500">System prompt (20%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-3 bg-green-500/40 rounded-sm" />
                    <span className="text-slate-500">Retrieved docs (15%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-3 bg-amber-500/40 rounded-sm" />
                    <span className="text-slate-500">Summary (10%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-28 h-3 bg-cyan-500/40 rounded-sm" />
                    <span className="text-slate-500">Recent messages (55%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-lg p-4">
            <div className="text-xs text-slate-500 mb-2">Compaction Pipeline (pseudo-code):</div>
            <div className="font-mono text-xs space-y-1">
              <div className="text-slate-500">def compact(messages, max_tokens):</div>
              <div className="ml-4 text-slate-400">system = messages.filter(role="system")</div>
              <div className="ml-4 text-slate-400">recent = messages.last(n=5)</div>
              <div className="ml-4 text-slate-400">old = messages.except(system, recent)</div>
              <div className="ml-4 text-slate-400">&nbsp;</div>
              <div className="ml-4 text-cyan-300"># Classify and compress old messages</div>
              <div className="ml-4 text-slate-400">important = old.filter(has_tool_result <span className="text-cyan-300">or</span> has_decision)</div>
              <div className="ml-4 text-slate-400">summary = llm.summarize(old.except(important))</div>
              <div className="ml-4 text-slate-400">&nbsp;</div>
              <div className="ml-4 text-cyan-300"># Reassemble within budget</div>
              <div className="ml-4 text-slate-400"><span className="text-cyan-300">return</span> [system, summary, important, recent]</div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
