import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAPIStore } from '../../store/apiStore';
import { useVisualizationStore } from '../../store/visualizationStore';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { config, setConfig, clearConfig, isConfigured } = useAPIStore();
  const { showTooltips, show3DEmbeddings, animationDuration, attentionThreshold, update } =
    useVisualizationStore();

  const [localApiKey, setLocalApiKey] = useState('');
  const [activeTab, setActiveTab] = useState<'api' | 'visualization'>('api');

  useEffect(() => {
    if (isOpen) {
      setLocalApiKey('');
    }
  }, [isOpen]);

  const handleSaveApiKey = () => {
    setConfig({ apiKey: localApiKey });
    setLocalApiKey('');
  };

  const models = {
    openai: ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo'],
    anthropic: ['claude-sonnet-4-20250514', 'claude-3-5-sonnet-20241022'],
    none: [],
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative bg-slate-800 rounded-xl border border-slate-700 w-full max-w-lg shadow-2xl"
          >
            <div className="flex items-center justify-between p-4 border-b border-slate-700">
              <h2 className="text-lg font-semibold">Settings</h2>
              <button
                onClick={onClose}
                className="p-1 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex border-b border-slate-700">
              <button
                onClick={() => setActiveTab('api')}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'api'
                    ? 'text-indigo-400 border-b-2 border-indigo-400'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                API Configuration
              </button>
              <button
                onClick={() => setActiveTab('visualization')}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'visualization'
                    ? 'text-indigo-400 border-b-2 border-indigo-400'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Visualization
              </button>
            </div>

            <div className="p-6 space-y-6">
              {activeTab === 'api' && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2">Provider</label>
                    <div className="flex gap-2">
                      {(['none', 'openai', 'anthropic'] as const).map((provider) => (
                        <button
                          key={provider}
                          onClick={() => setConfig({ provider, model: models[provider][0] || '' })}
                          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            config.provider === provider
                              ? 'bg-indigo-500 text-white'
                              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                          }`}
                        >
                          {provider === 'none' ? 'Simulation Only' : provider.charAt(0).toUpperCase() + provider.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {config.provider !== 'none' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium mb-2">Model</label>
                        <select
                          value={config.model}
                          onChange={(e) => setConfig({ model: e.target.value })}
                          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          {models[config.provider].map((model) => (
                            <option key={model} value={model}>
                              {model}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          API Key {isConfigured && <span className="text-green-400">(configured)</span>}
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="password"
                            value={localApiKey}
                            onChange={(e) => setLocalApiKey(e.target.value)}
                            placeholder={isConfigured ? '••••••••' : 'Enter your API key'}
                            className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                          <button
                            onClick={handleSaveApiKey}
                            disabled={!localApiKey}
                            className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 disabled:bg-slate-600 disabled:cursor-not-allowed rounded-lg text-sm font-medium transition-colors"
                          >
                            Save
                          </button>
                        </div>
                        <p className="mt-2 text-xs text-slate-400">
                          Your API key is stored locally and never sent to our servers.
                        </p>
                      </div>

                      {isConfigured && (
                        <button
                          onClick={clearConfig}
                          className="w-full px-4 py-2 text-red-400 hover:bg-red-500/10 rounded-lg text-sm font-medium transition-colors"
                        >
                          Clear API Configuration
                        </button>
                      )}
                    </>
                  )}
                </>
              )}

              {activeTab === 'visualization' && (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Show Tooltips</div>
                      <div className="text-sm text-slate-400">Display explanatory tooltips</div>
                    </div>
                    <button
                      onClick={() => update({ showTooltips: !showTooltips })}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        showTooltips ? 'bg-indigo-500' : 'bg-slate-600'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          showTooltips ? 'translate-x-6' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">3D Embeddings</div>
                      <div className="text-sm text-slate-400">Show 3D embedding visualization</div>
                    </div>
                    <button
                      onClick={() => update({ show3DEmbeddings: !show3DEmbeddings })}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        show3DEmbeddings ? 'bg-indigo-500' : 'bg-slate-600'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          show3DEmbeddings ? 'translate-x-6' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">Animation Duration</div>
                      <span className="text-sm text-slate-400">{animationDuration}s</span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="2"
                      step="0.1"
                      value={animationDuration}
                      onChange={(e) => update({ animationDuration: parseFloat(e.target.value) })}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">Attention Threshold</div>
                      <span className="text-sm text-slate-400">{attentionThreshold.toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="0.5"
                      step="0.01"
                      value={attentionThreshold}
                      onChange={(e) => update({ attentionThreshold: parseFloat(e.target.value) })}
                      className="w-full"
                    />
                    <p className="mt-1 text-xs text-slate-400">
                      Hide attention weights below this value
                    </p>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
