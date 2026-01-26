import { motion } from 'framer-motion';
import { examplePrompts, categoryColors } from '../../../data/examples';

interface ExampleSelectorProps {
  onSelect: (text: string) => void;
}

export function ExampleSelector({ onSelect }: ExampleSelectorProps) {
  const categories = [...new Set(examplePrompts.map((p) => p.category))];

  return (
    <div className="space-y-4">
      {categories.map((category) => (
        <div key={category}>
          <h4 className="text-sm font-medium text-slate-500 mb-2">{category}</h4>
          <div className="flex flex-wrap gap-2">
            {examplePrompts
              .filter((p) => p.category === category)
              .map((prompt, index) => (
                <motion.button
                  key={prompt.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => onSelect(prompt.text)}
                  className="group px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm transition-all flex items-center gap-2"
                >
                  <span
                    className={`w-2 h-2 rounded-full ${categoryColors[category] || 'bg-slate-500'}`}
                  />
                  {prompt.title}
                  <span className="text-slate-500 group-hover:text-slate-300 transition-colors">
                    →
                  </span>
                </motion.button>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
