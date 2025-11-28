import React from 'react';
import { Company, AppTheme } from '../types';
import { COMPANY_ICONS } from '../constants';

interface SotaWheelProps {
  currentCompany: Company;
  theme: AppTheme;
  onCompanySelect: (company: Company) => void;
}

export const SotaWheel: React.FC<SotaWheelProps> = ({ currentCompany, theme, onCompanySelect }) => {
  const companies: Company[] = ['Anthropic', 'Google', 'xAI', 'OpenAI'];
  
  // Calculate rotation to put current company at top (0 degrees is top in our SVG logic)
  const currentIndex = companies.indexOf(currentCompany);
  // Each segment is 90 degrees. We rotate the WHEEL so the active company is at the top.
  const rotation = -currentIndex * 90;

  return (
    <div className={`relative w-full aspect-square max-w-[400px] mx-auto p-4 rounded-full ${theme.cardBg} border ${theme.border} shadow-lg transition-colors duration-500`}>
      {/* Central "You Are Here" Marker */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        <div className={`w-24 h-24 rounded-full ${theme.bg} border-4 ${theme.border} flex items-center justify-center shadow-2xl`}>
            <span className="text-xs font-bold uppercase text-center leading-tight opacity-70">
              SOTA<br/>Cycle
            </span>
        </div>
        {/* Static pointer pointing UP */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-2 w-0 h-0 
          border-l-[10px] border-l-transparent
          border-r-[10px] border-r-transparent
          border-b-[20px] border-b-current" 
          style={{ color: theme.text === 'text-white' || theme.text === 'text-green-400' ? '#fff' : '#333' }}
        ></div>
      </div>

      {/* Rotating Wheel Container */}
      <div 
        className="w-full h-full relative transition-transform duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {companies.map((company, index) => {
          const Icon = COMPANY_ICONS[company];
          // Position nodes in a circle
          const angle = index * 90; // 0, 90, 180, 270
          // Convert polar to cartesian (radius is 40%)
          // -90 to start at top (12 o'clock)
          const rad = (angle - 90) * (Math.PI / 180);
          const x = 50 + 40 * Math.cos(rad);
          const y = 50 + 40 * Math.sin(rad);

          return (
            <button
              key={company}
              onClick={() => onCompanySelect(company)}
              className={`absolute w-16 h-16 -ml-8 -mt-8 rounded-2xl flex items-center justify-center 
                transition-all duration-300 hover:scale-110 z-10
                ${currentCompany === company ? theme.accent + ' ' + theme.buttonText + ' scale-110 shadow-lg ring-4 ring-offset-2 ring-offset-transparent ring-opacity-50' : 'bg-gray-200 text-gray-500 grayscale'}`}
              style={{ left: `${x}%`, top: `${y}%`, transform: `rotate(${-rotation}deg)` }} // Counter-rotate items so they stay upright
              aria-label={`Select ${company}`}
            >
              <Icon className="w-8 h-8" />
            </button>
          );
        })}
        
        {/* Connecting Lines (SVG Ring) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
        </svg>
      </div>

      {/* Labels positioned absolutely outside the wheel logic for stability */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-50 text-xs font-mono">
        Click a node to view history
      </div>
    </div>
  );
};
