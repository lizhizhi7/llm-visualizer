import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePipelineStore } from '../../../store/pipelineStore';

const sampleContinuations = [
  'I', 'think', 'that', 'the', 'answer', 'to', 'your', 'question', 'is',
  'quite', 'interesting', '.', 'Let', 'me', 'explain', 'how', 'this', 'works',
  ':', 'first', ',', 'we', 'need', 'to', 'understand', 'the', 'basics', '.',
];

interface GenerationStreamProps {
  isGenerating: boolean;
  onComplete: () => void;
}

export function GenerationStream({ isGenerating, onComplete }: GenerationStreamProps) {
  const { inputText, generationConfig } = usePipelineStore();
  const [generatedTokens, setGeneratedTokens] = useState<string[]>([]);
  const intervalRef = useRef<number | null>(null);
  const indexRef = useRef(0);

  useEffect(() => {
    if (isGenerating) {
      indexRef.current = 0;
      setGeneratedTokens([]);

      intervalRef.current = window.setInterval(() => {
        if (indexRef.current >= Math.min(sampleContinuations.length, generationConfig.maxTokens)) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          onComplete();
          return;
        }

        setGeneratedTokens((prev) => [...prev, sampleContinuations[indexRef.current]]);
        indexRef.current++;
      }, 200);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isGenerating, generationConfig.maxTokens, onComplete]);

  return (
    <div className="bg-slate-900 rounded-lg p-4 min-h-[100px] font-mono text-sm">
      <span className="text-slate-400">{inputText}</span>
      <span className="text-white">
        <AnimatePresence>
          {generatedTokens.map((token, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="inline"
            >
              {/^[.,!?;:]$/.test(token) ? token : ` ${token}`}
            </motion.span>
          ))}
        </AnimatePresence>
      </span>
      {isGenerating && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
          className="inline-block w-2 h-4 bg-indigo-500 ml-1"
        />
      )}

      <div className="mt-4 pt-4 border-t border-slate-700 flex items-center justify-between text-xs text-slate-500">
        <span>{generatedTokens.length} tokens generated</span>
        <span>Max: {generationConfig.maxTokens} tokens</span>
      </div>
    </div>
  );
}
