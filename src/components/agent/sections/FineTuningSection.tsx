import { motion } from 'framer-motion';
import { useVisualizationStore } from '../../../store/visualizationStore';

export function FineTuningSection() {
  const { viewMode } = useVisualizationStore();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold mb-4">Fine-Tuning & LoRA</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Fine-tuning adapts a pre-trained model to specific tasks or domains. LoRA makes this efficient by only training a small number of parameters.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid md:grid-cols-3 gap-6"
      >
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
          <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <h3 className="font-semibold mb-2">Prompting</h3>
          <p className="text-sm text-slate-400">
            Give instructions in the prompt. No training required, but limited by context window.
          </p>
          <div className="mt-3 text-xs text-green-400">Best for: Quick experiments</div>
        </div>

        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
          <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
            </svg>
          </div>
          <h3 className="font-semibold mb-2">RAG</h3>
          <p className="text-sm text-slate-400">
            Retrieve relevant documents and include them in context. Good for knowledge-heavy tasks.
          </p>
          <div className="mt-3 text-xs text-green-400">Best for: Domain knowledge</div>
        </div>

        <div className="bg-slate-800 rounded-xl border border-indigo-500/30 p-6">
          <div className="w-12 h-12 bg-indigo-500/20 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <h3 className="font-semibold mb-2">Fine-Tuning</h3>
          <p className="text-sm text-slate-400">
            Train the model on your data. Changes model behavior permanently. Most powerful but requires data.
          </p>
          <div className="mt-3 text-xs text-indigo-400">Best for: Style & behavior</div>
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
          What is LoRA?
        </h3>
        <p className="text-slate-400 mb-4">
          <strong className="text-white">Low-Rank Adaptation (LoRA)</strong> is a technique that makes fine-tuning efficient by only training small "adapter" matrices instead of the full model weights.
        </p>

        <div className="bg-slate-900 rounded-lg p-6">
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <div className="text-center">
              <div className="w-20 h-24 bg-slate-700 rounded-lg flex items-center justify-center mb-2 relative">
                <span className="text-3xl font-bold text-slate-500">W</span>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
              <div className="text-xs text-slate-500">Original Weights</div>
              <div className="text-xs text-slate-600">Frozen</div>
            </div>

            <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>

            <div className="text-center">
              <div className="flex gap-1 mb-2">
                <div className="w-6 h-24 bg-indigo-500 rounded flex items-center justify-center">
                  <span className="text-xs font-bold transform -rotate-90">A</span>
                </div>
                <div className="w-14 h-6 bg-indigo-500 rounded flex items-center justify-center self-center">
                  <span className="text-xs font-bold">B</span>
                </div>
              </div>
              <div className="text-xs text-indigo-400">LoRA Adapters</div>
              <div className="text-xs text-slate-600">Trainable</div>
            </div>

            <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>

            <div className="text-center">
              <div className="w-20 h-24 bg-gradient-to-br from-slate-700 to-indigo-600 rounded-lg flex items-center justify-center mb-2">
                <span className="text-2xl font-bold">W'</span>
              </div>
              <div className="text-xs text-green-400">Adapted Model</div>
              <div className="text-xs text-slate-600">W + AB</div>
            </div>
          </div>
        </div>

        <div className="mt-4 grid md:grid-cols-2 gap-4">
          <div className="bg-slate-700/30 rounded-lg p-3">
            <div className="text-sm font-medium text-green-400 mb-1">Advantages</div>
            <ul className="text-xs text-slate-400 space-y-1">
              <li>• 10-100x fewer parameters to train</li>
              <li>• Can swap adapters without reloading model</li>
              <li>• Multiple adapters for different tasks</li>
              <li>• Much lower memory requirements</li>
            </ul>
          </div>
          <div className="bg-slate-700/30 rounded-lg p-3">
            <div className="text-sm font-medium text-slate-300 mb-1">Typical Use Cases</div>
            <ul className="text-xs text-slate-400 space-y-1">
              <li>• Custom writing styles or tones</li>
              <li>• Domain-specific terminology</li>
              <li>• Task-specific behaviors</li>
              <li>• Language or format adaptation</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {viewMode !== 'simplified' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-800 rounded-xl border border-slate-700 p-6"
        >
          <h3 className="font-semibold mb-4">Fine-Tuning Process</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold">1</span>
              </div>
              <div>
                <div className="font-medium">Prepare Training Data</div>
                <div className="text-sm text-slate-400">Collect examples in prompt/completion or chat format. Quality matters more than quantity—100 high-quality examples often beat 10,000 poor ones.</div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold">2</span>
              </div>
              <div>
                <div className="font-medium">Choose Base Model</div>
                <div className="text-sm text-slate-400">Select a pre-trained model that's close to your needs. Larger models are more capable but cost more to fine-tune and run.</div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold">3</span>
              </div>
              <div>
                <div className="font-medium">Train with LoRA</div>
                <div className="text-sm text-slate-400">Train adapter weights on your data. Typical training takes minutes to hours depending on dataset size and compute.</div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold">4</span>
              </div>
              <div>
                <div className="font-medium">Evaluate & Iterate</div>
                <div className="text-sm text-slate-400">Test on held-out examples. Check for overfitting, catastrophic forgetting, and alignment with your goals.</div>
              </div>
            </div>
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
            <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            Training Data Format
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-slate-500 mb-2">Completion Format:</div>
              <pre className="bg-slate-900 rounded-lg p-3 text-xs overflow-x-auto">
                <code className="text-slate-300">{`{"prompt": "Summarize:",
 "completion": "Here's a summary..."}

{"prompt": "Translate to French:",
 "completion": "Voici la traduction..."}`}</code>
              </pre>
            </div>
            <div>
              <div className="text-xs text-slate-500 mb-2">Chat Format:</div>
              <pre className="bg-slate-900 rounded-lg p-3 text-xs overflow-x-auto">
                <code className="text-slate-300">{`{"messages": [
  {"role": "system", "content": "..."},
  {"role": "user", "content": "..."},
  {"role": "assistant", "content": "..."}
]}`}</code>
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
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            Advanced: LoRA Math & Variants
          </h3>

          <p className="text-sm text-slate-400 mb-4">
            LoRA exploits the observation that weight updates during fine-tuning have low "intrinsic rank"—meaning the changes can be approximated by much smaller matrices without losing expressiveness.
          </p>

          <div className="bg-slate-900 rounded-lg p-4 mb-4">
            <div className="text-xs text-slate-500 mb-2">The Core Equation:</div>
            <div className="font-mono text-center text-lg mb-2">
              <span className="text-indigo-400">W'</span> = <span className="text-slate-400">W</span> + <span className="text-amber-400">α</span> · <span className="text-green-400">A</span> · <span className="text-green-400">B</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-slate-500">
              <div><span className="text-indigo-400">W'</span> = adapted weight</div>
              <div><span className="text-slate-400">W</span> = original (frozen)</div>
              <div><span className="text-green-400">A, B</span> = low-rank matrices</div>
              <div><span className="text-amber-400">α</span> = scaling factor</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-slate-700/30 rounded-lg p-4">
              <div className="text-sm font-medium text-slate-300 mb-2">Parameter Savings Example</div>
              <div className="text-xs text-slate-400 space-y-1 font-mono">
                <div>Original W: 4096 × 4096 = <span className="text-red-400">16.7M params</span></div>
                <div>LoRA (r=16):</div>
                <div className="ml-2">A: 4096 × 16 = 65K</div>
                <div className="ml-2">B: 16 × 4096 = 65K</div>
                <div className="ml-2">Total: <span className="text-green-400">131K params (0.8%)</span></div>
              </div>
            </div>
            <div className="bg-slate-700/30 rounded-lg p-4">
              <div className="text-sm font-medium text-slate-300 mb-2">Key Hyperparameters</div>
              <div className="text-xs text-slate-400 space-y-1">
                <div><strong className="text-slate-300">Rank (r):</strong> 4-64 typical. Higher = more capacity</div>
                <div><strong className="text-slate-300">Alpha (α):</strong> Usually α = r or α = 2r. Scales gradient magnitude</div>
                <div><strong className="text-slate-300">Dropout:</strong> 0.05-0.1 on adapter outputs prevents overfitting</div>
              </div>
            </div>
          </div>

          <div className="text-sm text-slate-400 space-y-4">
            <div className="border-l-2 border-indigo-500 pl-4">
              <strong className="text-indigo-400">QLoRA (Quantized LoRA)</strong>
              <p className="mt-1">Combines 4-bit quantization (NF4) with LoRA. The base model is quantized to 4-bit precision while LoRA adapters remain in fp16/bf16. Uses double quantization and paged optimizers to further reduce memory. Enables fine-tuning a 65B model on a single 48GB GPU, or a 7B model on 8GB.</p>
              <div className="mt-2 text-xs text-slate-500">Memory: ~4GB for 7B model vs ~28GB for full precision</div>
            </div>

            <div className="border-l-2 border-purple-500 pl-4">
              <strong className="text-purple-400">DoRA (Weight-Decomposed LRA)</strong>
              <p className="mt-1">Decomposes pre-trained weights into magnitude (‖W‖) and direction (W/‖W‖) components. LoRA is applied only to the directional component, while magnitude is trained separately. This mimics full fine-tuning behavior more closely and often achieves better results with the same rank.</p>
              <div className="mt-2 text-xs text-slate-500">Typical improvement: 0.5-1% accuracy gain over standard LoRA</div>
            </div>

            <div className="border-l-2 border-green-500 pl-4">
              <strong className="text-green-400">LoRA+ </strong>
              <p className="mt-1">Uses different learning rates for A and B matrices. Research shows optimal ratio is η<sub>B</sub> ≈ 2-8× η<sub>A</sub> because B receives smaller gradient magnitudes. Simple change that improves convergence speed by 1-2x.</p>
            </div>

            <div className="border-l-2 border-amber-500 pl-4">
              <strong className="text-amber-400">Target Module Selection</strong>
              <p className="mt-1">LoRA can target different weight matrices in each transformer layer:</p>
              <ul className="mt-1 ml-4 list-disc text-xs">
                <li><strong>Attention:</strong> q_proj, k_proj, v_proj, o_proj — Most common, affects how model attends to context</li>
                <li><strong>MLP/FFN:</strong> gate_proj, up_proj, down_proj — Affects knowledge storage and reasoning</li>
                <li><strong>All layers:</strong> Maximum expressiveness but more parameters and memory</li>
              </ul>
              <div className="mt-2 text-xs text-slate-500">Rule of thumb: Start with attention only, add MLP if underfitting</div>
            </div>
          </div>
        </motion.div>
      )}

      {viewMode === 'expert' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-slate-800/50 rounded-xl border border-slate-700 p-6"
        >
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Other PEFT Methods
          </h3>

          <p className="text-sm text-slate-400 mb-4">
            PEFT (Parameter-Efficient Fine-Tuning) encompasses various techniques that adapt large models by training only a small subset of parameters. Each method makes different tradeoffs between parameter count, expressiveness, and inference overhead.
          </p>

          <div className="space-y-4">
            <div className="bg-slate-700/30 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <strong className="text-blue-400">Prefix Tuning</strong>
                <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded">~0.1% params</span>
              </div>
              <p className="text-sm text-slate-400 mb-2">
                Prepends trainable continuous vectors ("soft prompts") to the key and value matrices at every transformer layer. Unlike discrete prompts, these are learned embeddings that don't correspond to real tokens.
              </p>
              <div className="bg-slate-900 rounded p-2 text-xs font-mono mb-2">
                <span className="text-slate-500">Input:</span> [<span className="text-blue-400">P₁ P₂ ... Pₙ</span>] + [real tokens...]
                <br />
                <span className="text-slate-500">Where Pᵢ are learned continuous vectors at each layer</span>
              </div>
              <div className="flex gap-4 text-xs">
                <span className="text-green-400">✓ No weight modification</span>
                <span className="text-green-400">✓ Task-specific prefixes swappable</span>
                <span className="text-amber-400">△ Adds inference latency</span>
              </div>
            </div>

            <div className="bg-slate-700/30 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <strong className="text-purple-400">Prompt Tuning (Soft Prompts)</strong>
                <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded">~0.01% params</span>
              </div>
              <p className="text-sm text-slate-400 mb-2">
                Simplified version of prefix tuning—learns soft prompt tokens only at the input embedding layer (not at every layer). Extremely parameter-efficient but less expressive. Works best with very large models (100B+).
              </p>
              <div className="bg-slate-900 rounded p-2 text-xs font-mono mb-2">
                <span className="text-slate-500">Embedding layer only:</span> [<span className="text-purple-400">soft_tok₁ ... soft_tokₖ</span>] + embed(input)
              </div>
              <div className="flex gap-4 text-xs">
                <span className="text-green-400">✓ Minimal parameters</span>
                <span className="text-green-400">✓ Easy to implement</span>
                <span className="text-red-400">✗ Less expressive than prefix tuning</span>
              </div>
            </div>

            <div className="bg-slate-700/30 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <strong className="text-amber-400">Adapters (Bottleneck Adapters)</strong>
                <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded">~1-5% params</span>
              </div>
              <p className="text-sm text-slate-400 mb-2">
                Inserts small trainable bottleneck modules after attention and FFN layers. Each adapter has a down-projection, nonlinearity, and up-projection. Original model weights stay frozen.
              </p>
              <div className="bg-slate-900 rounded p-2 text-xs font-mono mb-2">
                <span className="text-slate-500">Architecture:</span> h → <span className="text-amber-400">W_down</span> → ReLU → <span className="text-amber-400">W_up</span> → h + residual
                <br />
                <span className="text-slate-500">Bottleneck:</span> hidden_dim → adapter_dim (small) → hidden_dim
              </div>
              <div className="flex gap-4 text-xs">
                <span className="text-green-400">✓ More stable training than LoRA</span>
                <span className="text-green-400">✓ Proven in production</span>
                <span className="text-amber-400">△ Sequential computation adds latency</span>
              </div>
            </div>

            <div className="bg-slate-700/30 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <strong className="text-cyan-400">(IA)³ — Infused Adapter by Inhibiting and Amplifying</strong>
                <span className="text-xs bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded">~0.01% params</span>
              </div>
              <p className="text-sm text-slate-400 mb-2">
                Learns three rescaling vectors that multiply (element-wise) the keys, values, and FFN activations. No matrix multiplication—just learned scales that amplify or suppress different dimensions.
              </p>
              <div className="bg-slate-900 rounded p-2 text-xs font-mono mb-2">
                <span className="text-slate-500">Rescaling:</span> K' = K ⊙ <span className="text-cyan-400">l_k</span>, V' = V ⊙ <span className="text-cyan-400">l_v</span>, FFN' = FFN ⊙ <span className="text-cyan-400">l_ff</span>
                <br />
                <span className="text-slate-500">Where l_k, l_v, l_ff are learned vectors</span>
              </div>
              <div className="flex gap-4 text-xs">
                <span className="text-green-400">✓ Fewest parameters of any method</span>
                <span className="text-green-400">✓ No inference overhead</span>
                <span className="text-amber-400">△ Less expressive than LoRA</span>
              </div>
            </div>

            <div className="bg-slate-700/30 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <strong className="text-rose-400">BitFit (Bias-only Fine-Tuning)</strong>
                <span className="text-xs bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded">~0.05% params</span>
              </div>
              <p className="text-sm text-slate-400 mb-2">
                Only trains the bias terms of the model, keeping all weight matrices frozen. Surprisingly effective for many tasks despite modifying so few parameters. Simple baseline that's often overlooked.
              </p>
              <div className="flex gap-4 text-xs">
                <span className="text-green-400">✓ Extremely simple</span>
                <span className="text-green-400">✓ No architectural changes</span>
                <span className="text-amber-400">△ Limited capacity for complex adaptations</span>
              </div>
            </div>
          </div>

          <div className="mt-4 bg-slate-900 rounded-lg p-4">
            <div className="text-sm font-medium text-slate-300 mb-2">Method Comparison</div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-slate-400">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-2 pr-4">Method</th>
                    <th className="text-left py-2 pr-4">Params</th>
                    <th className="text-left py-2 pr-4">Inference Cost</th>
                    <th className="text-left py-2">Best For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  <tr><td className="py-2 pr-4 text-indigo-400">LoRA</td><td className="pr-4">0.1-1%</td><td className="pr-4">None (merged)</td><td>General purpose, production</td></tr>
                  <tr><td className="py-2 pr-4 text-purple-400">QLoRA</td><td className="pr-4">0.1-1%</td><td className="pr-4">Quantization overhead</td><td>Memory-constrained training</td></tr>
                  <tr><td className="py-2 pr-4 text-blue-400">Prefix Tuning</td><td className="pr-4">0.1%</td><td className="pr-4">Prefix length</td><td>Multi-task with shared model</td></tr>
                  <tr><td className="py-2 pr-4 text-amber-400">Adapters</td><td className="pr-4">1-5%</td><td className="pr-4">Sequential layers</td><td>Stable training, NLU tasks</td></tr>
                  <tr><td className="py-2 pr-4 text-cyan-400">(IA)³</td><td className="pr-4">0.01%</td><td className="pr-4">None</td><td>Minimal overhead, few-shot</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl border border-indigo-500/30 p-6"
      >
        <h3 className="font-semibold mb-3">When to Fine-Tune vs. Use Other Methods</h3>
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <div className="text-green-400 font-medium mb-2">Fine-tune when you need:</div>
            <ul className="text-slate-400 space-y-1">
              <li>• Consistent style, tone, or format</li>
              <li>• Task-specific behavior at scale</li>
              <li>• Reduced prompt length (behavior is "baked in")</li>
              <li>• Better latency (no retrieval step)</li>
            </ul>
          </div>
          <div>
            <div className="text-amber-400 font-medium mb-2">Use RAG/prompting when:</div>
            <ul className="text-slate-400 space-y-1">
              <li>• Knowledge changes frequently</li>
              <li>• You need citations/sources</li>
              <li>• Limited training data available</li>
              <li>• Quick iteration is important</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
