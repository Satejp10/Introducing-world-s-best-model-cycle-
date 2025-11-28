import React from 'react';
import { ModelEvent, AppTheme, Company } from '../types';
import { COMPANY_ICONS, CURRENT_DATE_MOCK } from '../constants';
import { Trophy, Clock, Activity } from 'lucide-react';

interface HeroProps {
  current: ModelEvent;
  theme: AppTheme;
}

export const Hero: React.FC<HeroProps> = ({ current, theme }) => {
  const Icon = COMPANY_ICONS[current.company];
  
  const daysInPower = Math.floor(
    (new Date(CURRENT_DATE_MOCK).getTime() - new Date(current.date).getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className={`w-full p-8 rounded-3xl ${theme.cardBg} shadow-xl border ${theme.border} transition-all duration-500`}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2 opacity-70 uppercase tracking-widest text-xs font-bold">
            <Trophy className="w-4 h-4" />
            <span>Reigning Champion</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">
            {current.model}
          </h1>
          <div className="flex items-center gap-4">
            <span className={`px-4 py-1 rounded-full text-sm font-bold ${theme.accent} ${theme.buttonText} uppercase tracking-wider`}>
              {current.company}
            </span>
            <span className="opacity-60 text-sm font-mono">
              since {current.date}
            </span>
          </div>
        </div>
        
        <div className={`flex flex-col items-center justify-center p-6 rounded-2xl ${theme.bg} border ${theme.border} min-w-[150px]`}>
          <Icon className="w-12 h-12 mb-2 opacity-80" />
          <span className="text-4xl font-bold font-mono">{daysInPower}</span>
          <span className="text-xs uppercase tracking-widest opacity-60">Days in Power</span>
        </div>
      </div>
      
      <div className="mt-8 pt-6 border-t border-dashed border-gray-300/20">
         <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 animate-pulse-fast" />
            <p className="text-lg italic opacity-90">
              "{current.description}"
            </p>
         </div>
      </div>
    </div>
  );
};
