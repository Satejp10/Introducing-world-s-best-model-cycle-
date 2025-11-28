import React, { useState, useEffect } from 'react';
import { THEMES, MODEL_HISTORY, CURRENT_DATE_MOCK } from './constants';
import { ModelEvent, Company } from './types';
import { Hero } from './components/Hero';
import { SotaWheel } from './components/SotaWheel';
import { Timeline } from './components/Timeline';
import { Comparison } from './components/Comparison';
import { generateSotaCommentary } from './services/geminiService';
import { RefreshCw, MessageSquareQuote } from 'lucide-react';

const App: React.FC = () => {
  // Default to the latest model in our history
  const [currentModel, setCurrentModel] = useState<ModelEvent>(MODEL_HISTORY[MODEL_HISTORY.length - 1]);
  const [commentary, setCommentary] = useState<string>("");
  const [loadingCommentary, setLoadingCommentary] = useState(false);

  // Derive theme from current company
  const theme = THEMES[currentModel.company];

  const handleCompanySelect = (company: Company) => {
    // Find the latest model for this company in our history
    const model = MODEL_HISTORY.find(m => m.company === company);
    if (model) {
      setCurrentModel(model);
      setCommentary(""); // Clear old commentary on switch
    }
  };

  const handleGenerateCommentary = async () => {
    if (!process.env.API_KEY) {
        setCommentary("Error: API Key missing. Cannot vibe check.");
        return;
    }

    setLoadingCommentary(true);
    const prevIndex = MODEL_HISTORY.findIndex(m => m.id === currentModel.id) - 1;
    const prevModel = prevIndex >= 0 ? MODEL_HISTORY[prevIndex] : undefined;
    
    const text = await generateSotaCommentary(currentModel, prevModel);
    setCommentary(text);
    setLoadingCommentary(false);
  };

  return (
    <div className={`min-h-screen transition-colors duration-700 ${theme.bg} ${theme.text} font-sans selection:bg-opacity-30 selection:bg-gray-500`}>
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        
        {/* Header */}
        <header className="flex justify-between items-end mb-8 border-b border-gray-500/10 pb-4">
            <div>
                <h2 className="text-xs font-mono uppercase tracking-widest opacity-60 mb-1">State of the Art Tracker</h2>
                <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${theme.accent} animate-pulse`}></div>
                    <span className="font-mono text-sm">LIVE FEED (MOCK: {CURRENT_DATE_MOCK})</span>
                </div>
            </div>
            <div className="text-right hidden md:block">
                <p className="text-xs font-mono opacity-50">v1.0.4-beta</p>
            </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Col: Hero & Comparison */}
            <div className="lg:col-span-8 flex flex-col gap-6">
                <Hero current={currentModel} theme={theme} />
                
                {/* AI Commentary Section */}
                <div className={`p-6 rounded-2xl border ${theme.border} bg-opacity-50 backdrop-blur-sm`}>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <MessageSquareQuote className="w-5 h-5 opacity-70" />
                            <h3 className="font-bold">The Oracle's Hot Take</h3>
                        </div>
                        <button 
                            onClick={handleGenerateCommentary}
                            disabled={loadingCommentary}
                            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-transform active:scale-95 ${theme.button} ${theme.buttonText} ${loadingCommentary ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}`}
                        >
                            {loadingCommentary ? <RefreshCw className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />}
                            {loadingCommentary ? 'Thinking...' : 'Vibe Check'}
                        </button>
                    </div>
                    
                    <div className="min-h-[80px] flex items-center">
                        {commentary ? (
                            <p className="text-lg md:text-xl font-medium leading-relaxed font-mono">
                                "{commentary}"
                            </p>
                        ) : (
                            <p className="text-sm opacity-50 italic">
                                Click "Vibe Check" to ask Gemini 2.5 Flash for a real-time (simulated) analysis of the current SOTA vibes.
                            </p>
                        )}
                    </div>
                </div>

                <Comparison theme={theme} />
            </div>

            {/* Right Col: Wheel & Timeline */}
            <div className="lg:col-span-4 flex flex-col gap-6">
                <SotaWheel 
                    currentCompany={currentModel.company} 
                    theme={theme} 
                    onCompanySelect={handleCompanySelect}
                />
                <Timeline theme={theme} currentId={currentModel.id} />
            </div>
        </main>

        <footer className="mt-20 text-center opacity-40 text-xs font-mono">
            <p>THE SOTA CYCLE NEVER ENDS. DATA IS MOCKED. VIBES ARE REAL.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
