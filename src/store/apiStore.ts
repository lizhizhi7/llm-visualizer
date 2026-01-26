import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { APIConfig } from '../types';

interface APIStore {
  config: APIConfig;
  isConfigured: boolean;
  isLoading: boolean;
  error: string | null;

  setConfig: (config: Partial<APIConfig>) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearConfig: () => void;
}

export const useAPIStore = create<APIStore>()(
  persist(
    (set) => ({
      config: {
        provider: 'none',
        apiKey: '',
        model: '',
      },
      isConfigured: false,
      isLoading: false,
      error: null,

      setConfig: (config) =>
        set((state) => {
          const newConfig = { ...state.config, ...config };
          return {
            config: newConfig,
            isConfigured: newConfig.provider !== 'none' && newConfig.apiKey !== '',
          };
        }),
      setIsLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      clearConfig: () =>
        set({
          config: { provider: 'none', apiKey: '', model: '' },
          isConfigured: false,
          error: null,
        }),
    }),
    {
      name: 'llm-visualizer-api',
      partialize: (state) => ({
        config: {
          provider: state.config.provider,
          model: state.config.model,
        },
      }),
    }
  )
);
