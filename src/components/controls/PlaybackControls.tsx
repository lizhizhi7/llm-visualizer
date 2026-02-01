import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { usePipelineStore } from '../../store/pipelineStore';

export function PlaybackControls() {
  const { isPlaying, playbackSpeed, nextStep, prevStep, reset, currentStage, update } =
    usePipelineStore();

  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = window.setInterval(() => {
        nextStep();
      }, 1000 / playbackSpeed);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, playbackSpeed, nextStep]);

  useEffect(() => {
    if (currentStage === 'output') {
      update({ isPlaying: false });
    }
  }, [currentStage, update]);

  const speeds = [0.5, 1, 2, 4];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-4 p-4 bg-slate-800 rounded-xl border border-slate-700"
    >
      <div className="flex items-center gap-2">
        <button
          onClick={prevStep}
          className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
          title="Previous step"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={() => update({ isPlaying: !isPlaying })}
          className={`p-3 rounded-lg transition-colors ${
            isPlaying ? 'bg-amber-500 hover:bg-amber-600' : 'bg-indigo-500 hover:bg-indigo-600'
          }`}
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            </svg>
          )}
        </button>

        <button
          onClick={nextStep}
          className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
          title="Next step"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="h-8 w-px bg-slate-600" />

      <div className="flex items-center gap-2">
        <span className="text-sm text-slate-400">Speed:</span>
        <div className="flex bg-slate-700 rounded-lg p-1">
          {speeds.map((speed) => (
            <button
              key={speed}
              onClick={() => update({ playbackSpeed: speed })}
              className={`px-2 py-1 rounded text-sm font-medium transition-colors ${
                playbackSpeed === speed
                  ? 'bg-indigo-500 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {speed}x
            </button>
          ))}
        </div>
      </div>

      <div className="h-8 w-px bg-slate-600" />

      <button
        onClick={reset}
        className="flex items-center gap-2 px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Reset
      </button>
    </motion.div>
  );
}
