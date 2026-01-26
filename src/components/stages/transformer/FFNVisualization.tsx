import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface FFNVisualizationProps {
  activations: number[];
}

export function FFNVisualization({ activations }: FFNVisualizationProps) {
  const displayActivations = useMemo(() => {
    const step = Math.floor(activations.length / 100) || 1;
    return activations.filter((_, i) => i % step === 0).slice(0, 100);
  }, [activations]);

  const stats = useMemo(() => {
    if (activations.length === 0) return { active: 0, mean: 0, max: 0 };
    const active = activations.filter((a) => a > 0).length;
    const sum = activations.reduce((a, b) => a + b, 0);
    const max = Math.max(...activations);
    return {
      active,
      mean: sum / activations.length,
      max,
      sparsity: ((activations.length - active) / activations.length) * 100,
    };
  }, [activations]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-slate-700 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-indigo-400">{activations.length}</div>
          <div className="text-xs text-slate-400">Hidden Dim</div>
        </div>
        <div className="bg-slate-700 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-green-400">{stats.active}</div>
          <div className="text-xs text-slate-400">Active Neurons</div>
        </div>
        <div className="bg-slate-700 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-amber-400">{stats.sparsity?.toFixed(1)}%</div>
          <div className="text-xs text-slate-400">Sparsity</div>
        </div>
        <div className="bg-slate-700 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-purple-400">{stats.max.toFixed(2)}</div>
          <div className="text-xs text-slate-400">Max Activation</div>
        </div>
      </div>

      <div className="bg-slate-700 rounded-lg p-4">
        <div className="text-sm text-slate-400 mb-2">Activation Distribution (sampled)</div>
        <div className="flex items-end gap-0.5 h-24">
          {displayActivations.map((val, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${Math.min(100, val * 100)}%` }}
              transition={{ delay: i * 0.01, duration: 0.3 }}
              className="flex-1 rounded-t"
              style={{
                backgroundColor: val > 0 ? 'rgb(99, 102, 241)' : 'rgb(71, 85, 105)',
                minHeight: val > 0 ? '2px' : '0',
              }}
              title={`Neuron ${i}: ${val.toFixed(4)}`}
            />
          ))}
        </div>
      </div>

      <div className="text-sm text-slate-400">
        <p>
          The FFN applies: <code className="bg-slate-700 px-1 rounded">GeLU(xW₁ + b₁)W₂ + b₂</code>
        </p>
        <p className="mt-1">
          Bars show activation values after GeLU. Zero values (dark) are "dead" neurons for this input.
        </p>
      </div>
    </div>
  );
}
