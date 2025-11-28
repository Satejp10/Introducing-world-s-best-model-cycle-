import React from 'react';
import { MODEL_HISTORY, FUTURE_EVENTS } from '../constants';
import { AppTheme } from '../types';
import { Circle, ArrowDown } from 'lucide-react';

interface TimelineProps {
  theme: AppTheme;
  currentId: string;
}

export const Timeline: React.FC<TimelineProps> = ({ theme, currentId }) => {
  // Sort history newest first
  const sortedHistory = [...MODEL_HISTORY].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className={`h-full p-6 rounded-2xl ${theme.cardBg} border ${theme.border} overflow-hidden flex flex-col`}>
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <span>November Madness</span>
      </h2>
      
      <div className="relative border-l-2 border-dashed border-gray-300 ml-3 space-y-8 pl-6 pb-4">
        {FUTURE_EVENTS.map((event, i) => (
           <div key={`future-${i}`} className="opacity-40">
             <div className="absolute -left-[5px] w-2.5 h-2.5 rounded-full bg-gray-300"></div>
             <span className="text-xs font-mono block mb-1">{event.date}</span>
             <p className="font-medium text-sm">{event.label}</p>
           </div>
        ))}
        
        {sortedHistory.map((item) => (
          <div key={item.id} className={`relative transition-all duration-300 ${item.id === currentId ? 'opacity-100 scale-105 origin-left' : 'opacity-60'}`}>
            <div className={`absolute -left-[9px] w-4 h-4 rounded-full border-2 ${theme.cardBg} ${item.id === currentId ? theme.accent : 'bg-gray-400'}`}></div>
            <span className="text-xs font-mono block mb-1">{item.date}</span>
            <h3 className="font-bold">{item.model}</h3>
            <p className="text-xs opacity-70 mt-1 line-clamp-2">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
