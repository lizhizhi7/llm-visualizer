export type PipelineStage =
  | 'input'
  | 'tokenization'
  | 'embedding'
  | 'transformer'
  | 'output';

export type ViewMode = 'simplified' | 'detailed' | 'expert';

export type AppPage = 'pipeline' | 'agent';

export type AgentSection = 'overview' | 'tools' | 'react-loop' | 'memory' | 'planning' | 'fine-tuning' | 'demo';

export type TokenType = 'word' | 'subword' | 'punctuation' | 'number' | 'special';

export interface Token {
  id: number;
  text: string;
  type: TokenType;
  embedding?: number[];
  position: number;
}

export interface TokenizationStep {
  tokens: string[];
  mergedIndices?: [number, number];
  description: string;
}

export interface AttentionHead {
  headIndex: number;
  weights: number[][];
  pattern?: string;
}

export interface TransformerLayer {
  layerIndex: number;
  attentionHeads: AttentionHead[];
  ffnActivations?: number[];
  residualNorm?: number[];
}

export interface TokenProbability {
  token: string;
  probability: number;
  logit: number;
}

export interface GenerationConfig {
  temperature: number;
  topK: number;
  topP: number;
  maxTokens: number;
}

export interface PipelineState {
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
}

export interface VisualizationState {
  viewMode: ViewMode;
  showAttentionAnimation: boolean;
  attentionThreshold: number;
  selectedToken: number | null;
  highlightedTokens: number[];
  show3DEmbeddings: boolean;
}

export interface APIConfig {
  provider: 'openai' | 'anthropic' | 'none';
  apiKey: string;
  model: string;
}

export interface ExamplePrompt {
  id: string;
  title: string;
  text: string;
  category: string;
}
