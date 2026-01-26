import { AnimatePresence, motion } from 'framer-motion';
import { usePipelineStore } from '../../store/pipelineStore';
import { PlaybackControls } from '../controls/PlaybackControls';
import { InputStage } from '../stages/input/InputStage';
import { TokenizationStage } from '../stages/tokenization/TokenizationStage';
import { EmbeddingStage } from '../stages/embedding/EmbeddingStage';
import { TransformerStage } from '../stages/transformer/TransformerStage';
import { OutputStage } from '../stages/output/OutputStage';
import { StageProgress } from './StageProgress';

const stageComponents = {
  input: InputStage,
  tokenization: TokenizationStage,
  embedding: EmbeddingStage,
  transformer: TransformerStage,
  output: OutputStage,
};

export function PipelineView() {
  const { currentStage, tokens } = usePipelineStore();

  const StageComponent = stageComponents[currentStage];

  return (
    <div className="h-full flex flex-col gap-6">
      <StageProgress />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="flex-1 overflow-auto"
        >
          <StageComponent />
        </motion.div>
      </AnimatePresence>

      {tokens.length > 0 && currentStage !== 'input' && (
        <div className="flex justify-center">
          <PlaybackControls />
        </div>
      )}
    </div>
  );
}
