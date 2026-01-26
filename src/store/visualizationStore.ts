import { create } from 'zustand';
import type { ViewMode } from '../types';

interface VisualizationStore {
  viewMode: ViewMode;
  showAttentionAnimation: boolean;
  attentionThreshold: number;
  selectedToken: number | null;
  highlightedTokens: number[];
  show3DEmbeddings: boolean;
  showTooltips: boolean;
  animationDuration: number;

  setViewMode: (mode: ViewMode) => void;
  setShowAttentionAnimation: (show: boolean) => void;
  setAttentionThreshold: (threshold: number) => void;
  setSelectedToken: (token: number | null) => void;
  setHighlightedTokens: (tokens: number[]) => void;
  setShow3DEmbeddings: (show: boolean) => void;
  setShowTooltips: (show: boolean) => void;
  setAnimationDuration: (duration: number) => void;
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

  setViewMode: (mode) => set({ viewMode: mode }),
  setShowAttentionAnimation: (show) => set({ showAttentionAnimation: show }),
  setAttentionThreshold: (threshold) => set({ attentionThreshold: threshold }),
  setSelectedToken: (token) => set({ selectedToken: token }),
  setHighlightedTokens: (tokens) => set({ highlightedTokens: tokens }),
  setShow3DEmbeddings: (show) => set({ show3DEmbeddings: show }),
  setShowTooltips: (show) => set({ showTooltips: show }),
  setAnimationDuration: (duration) => set({ animationDuration: duration }),
}));
