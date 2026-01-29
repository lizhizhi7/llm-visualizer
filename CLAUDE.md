# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

LLM Visualizer is an educational React application that visualizes how Large Language Models process and generate text. It walks users through a 5-stage pipeline with interactive visualizations and three detail levels (Simplified, Detailed, Expert).

## Commands

```bash
npm run dev      # Start development server (Vite with HMR)
npm run build    # TypeScript check + production build
npm run lint     # ESLint
npm run preview  # Preview production build
```

## Architecture

### Pipeline Flow

The app processes text through 5 sequential stages:
1. **Input** → 2. **Tokenization** → 3. **Embedding** → 4. **Transformer** → 5. **Output**

Each stage has a corresponding component in `src/components/stages/{stage}/`. The `PipelineView` component (`src/components/pipeline/PipelineView.tsx`) orchestrates stage rendering via a component map.

### State Management (Zustand)

Three stores in `src/store/`:
- **pipelineStore**: Core data flow (tokens, embeddings, transformer layers, generation config). Contains `nextStep()`/`prevStep()` for stage navigation.
- **visualizationStore**: UI state (viewMode, 3D toggle, animation settings)
- **apiStore**: API provider configuration (OpenAI/Anthropic)

### Simulation Services

The app generates synthetic data for visualization (no real model inference by default):
- `src/services/tokenizer/bpeTokenizer.ts`: Simplified BPE tokenization with step-by-step visualization
- `src/services/simulation/embeddingSimulator.ts`: Generates fake embeddings with semantic clustering
- `src/services/simulation/attentionSimulator.ts`: Generates attention patterns (12 layers × 12 heads) using predefined patterns from `src/data/attentionPatterns.ts`

### View Mode Pattern

Educational content is conditionally rendered based on `viewMode` from visualizationStore:
```tsx
{viewMode !== 'simplified' && <DetailedContent />}
{viewMode === 'expert' && <ExpertContent />}
```

### Visualization Libraries

- **Framer Motion**: All animations and transitions
- **D3**: Attention heatmaps (`AttentionMatrix.tsx`)
- **Three.js + React Three Fiber**: 3D embedding space (`EmbeddingSpace3D.tsx`)
- **Tailwind CSS v4**: Styling (dark theme, slate palette)

### Type Definitions

Core types in `src/types/index.ts`:
- `PipelineStage`: 'input' | 'tokenization' | 'embedding' | 'transformer' | 'output'
- `ViewMode`: 'simplified' | 'detailed' | 'expert'
- `Token`, `TransformerLayer`, `AttentionHead`, `GenerationConfig`

## Adding New Educational Content

Follow the established pattern in stage components:
1. Access stores via hooks: `usePipelineStore()`, `useVisualizationStore()`
2. Wrap content in `<motion.div>` with staggered `delay` for animations
3. Use view mode conditionals for progressive disclosure
4. Educational sections use `bg-slate-800/50` background with info icon
