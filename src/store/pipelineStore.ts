import { create } from 'zustand';
import type {
  PipelineStage,
  Token,
  TokenizationStep,
  TransformerLayer,
  TokenProbability,
  GenerationConfig,
} from '../types';

interface PipelineStore {
  // State
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

  // Actions
  setInputText: (text: string) => void;
  setCurrentStage: (stage: PipelineStage) => void;
  setTokens: (tokens: Token[]) => void;
  setTokenizationSteps: (steps: TokenizationStep[]) => void;
  setCurrentTokenizationStep: (step: number) => void;
  setEmbeddings: (embeddings: number[][]) => void;
  setTransformerLayers: (layers: TransformerLayer[]) => void;
  setCurrentLayer: (layer: number) => void;
  setCurrentHead: (head: number) => void;
  setOutputProbabilities: (probs: TokenProbability[]) => void;
  addGeneratedToken: (token: Token) => void;
  setIsPlaying: (playing: boolean) => void;
  setPlaybackSpeed: (speed: number) => void;
  setGenerationConfig: (config: Partial<GenerationConfig>) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
}

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

  setInputText: (text) => set({ inputText: text }),
  setCurrentStage: (stage) => set({ currentStage: stage }),
  setTokens: (tokens) => set({ tokens }),
  setTokenizationSteps: (steps) => set({ tokenizationSteps: steps }),
  setCurrentTokenizationStep: (step) => set({ currentTokenizationStep: step }),
  setEmbeddings: (embeddings) => set({ embeddings }),
  setTransformerLayers: (layers) => set({ transformerLayers: layers }),
  setCurrentLayer: (layer) => set({ currentLayer: layer }),
  setCurrentHead: (head) => set({ currentHead: head }),
  setOutputProbabilities: (probs) => set({ outputProbabilities: probs }),
  addGeneratedToken: (token) =>
    set((state) => ({ generatedTokens: [...state.generatedTokens, token] })),
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setPlaybackSpeed: (speed) => set({ playbackSpeed: speed }),
  setGenerationConfig: (config) =>
    set((state) => ({
      generationConfig: { ...state.generationConfig, ...config },
    })),

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
