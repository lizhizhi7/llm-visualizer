import { create } from 'zustand';
import type {
  PipelineStage,
  Token,
  TokenizationStep,
  TransformerLayer,
  TokenProbability,
  GenerationConfig,
} from '../types';

interface PipelineState {
  currentStage: PipelineStage;
  inputText: string;
  tokens: Token[];
  tokenizationSteps: TokenizationStep[];
  currentTokenizationStep: number;
  embeddings: number[][];
  transformerLayers: TransformerLayer[];
  currentLayer: number;
  currentHead: number;
  outputProbabilities: TokenProbability[];
  generatedTokens: Token[];
  isPlaying: boolean;
  playbackSpeed: number;
  generationConfig: GenerationConfig;
}

interface PipelineActions {
  update: (state: Partial<PipelineState>) => void;
  updateConfig: (config: Partial<GenerationConfig>) => void;
  addGeneratedToken: (token: Token) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
}

type PipelineStore = PipelineState & PipelineActions;

const initialState = {
  currentStage: 'input' as PipelineStage,
  inputText: '',
  tokens: [],
  tokenizationSteps: [],
  currentTokenizationStep: 0,
  embeddings: [],
  transformerLayers: [],
  currentLayer: 0,
  currentHead: 0,
  outputProbabilities: [],
  generatedTokens: [],
  isPlaying: false,
  playbackSpeed: 1,
  generationConfig: {
    temperature: 1.0,
    topK: 50,
    topP: 0.95,
    maxTokens: 100,
  },
};

export const usePipelineStore = create<PipelineStore>((set, get) => ({
  ...initialState,

  update: (partial) => set(partial),
  updateConfig: (config) =>
    set((state) => ({ generationConfig: { ...state.generationConfig, ...config } })),
  addGeneratedToken: (token) =>
    set((state) => ({ generatedTokens: [...state.generatedTokens, token] })),

  nextStep: () => {
    const { currentStage, currentTokenizationStep, tokenizationSteps, currentLayer, transformerLayers } = get();

    switch (currentStage) {
      case 'input':
        set({ currentStage: 'tokenization' });
        break;
      case 'tokenization':
        if (currentTokenizationStep < tokenizationSteps.length - 1) {
          set({ currentTokenizationStep: currentTokenizationStep + 1 });
        } else {
          set({ currentStage: 'embedding' });
        }
        break;
      case 'embedding':
        set({ currentStage: 'transformer' });
        break;
      case 'transformer':
        if (currentLayer < transformerLayers.length - 1) {
          set({ currentLayer: currentLayer + 1 });
        } else {
          set({ currentStage: 'output' });
        }
        break;
      case 'output':
        break;
    }
  },

  prevStep: () => {
    const { currentStage, currentTokenizationStep, currentLayer } = get();

    switch (currentStage) {
      case 'input':
        break;
      case 'tokenization':
        if (currentTokenizationStep > 0) {
          set({ currentTokenizationStep: currentTokenizationStep - 1 });
        } else {
          set({ currentStage: 'input' });
        }
        break;
      case 'embedding':
        set({ currentStage: 'tokenization' });
        break;
      case 'transformer':
        if (currentLayer > 0) {
          set({ currentLayer: currentLayer - 1 });
        } else {
          set({ currentStage: 'embedding' });
        }
        break;
      case 'output':
        set({ currentStage: 'transformer' });
        break;
    }
  },

  reset: () => set(initialState),
}));
