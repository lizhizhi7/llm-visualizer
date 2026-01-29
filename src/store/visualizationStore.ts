import { create } from 'zustand';
import type { ViewMode, AppPage, AgentSection } from '../types';

interface VisualizationState {
  viewMode: ViewMode;
  showAttentionAnimation: boolean;
  attentionThreshold: number;
  selectedToken: number | null;
  highlightedTokens: number[];
  show3DEmbeddings: boolean;
  showTooltips: boolean;
  animationDuration: number;
  currentPage: AppPage;
  agentSection: AgentSection;
}

interface VisualizationStore extends VisualizationState {
  update: (state: Partial<VisualizationState>) => void;
}

export const useVisualizationStore = create<VisualizationStore>((set) => ({
  viewMode: 'detailed',
  showAttentionAnimation: true,
  attentionThreshold: 0.1,
  selectedToken: null,
  highlightedTokens: [],
  show3DEmbeddings: true,
  showTooltips: true,
  animationDuration: 0.5,
  currentPage: 'pipeline',
  agentSection: 'overview',

  update: (partial) => set(partial),
}));
