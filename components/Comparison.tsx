import React from 'react';
import { ModelEvent, AppTheme } from '../types';
import { MODEL_HISTORY } from '../constants';

interface ComparisonProps {
  theme: AppTheme;
}

export const Comparison: React.FC<ComparisonProps> = ({ theme }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 mt-8`}>
      {MODEL_HISTORY.map((model) => (
        <div key={model.id} className={`p-6 rounded-xl border ${theme.border} ${theme.cardBg} shadow-sm hover:shadow-md transition-shadow`}>
           <div className="flex justify-between items-center mb-4">
             <h3 className="font-bold text-lg">{model.model}</h3>
             <span className="text-xs opacity-50 font-mono">{model.date}</span>
           </div>
           
           <div className="space-y-3 font-mono text-sm">
             <div className="flex justify-between">
               <span className="opacity-60">SWE-bench</span>
               <span className="font-bold">{model.stats?.swebench}</span>
             </div>
             <div className="flex justify-between">
               <span className="opacity-60">Context</span>
               <span className="font-bold">{model.stats?.context}</span>
             </div>
             <div className="mt-2 pt-2 border-t border-dashed border-gray-300/30">
               <div className="flex flex-wrap gap-2">
                 {model.tags.map(tag => (
                   <span key={tag} className={`text-[10px] px-2 py-1 rounded bg-gray-100 dark:bg-zinc-800 opacity-80`}>
                     {tag}
                   </span>
                 ))}
               </div>
             </div>
           </div>
        </div>
      ))}
    </div>
  );
};
