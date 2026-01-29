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
    </div>
  );
}
