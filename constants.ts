import { ModelEvent, AppTheme, Company } from './types';
import { Brain, Cpu, Zap, Code, Terminal, MessageSquare, Video } from 'lucide-react';

export const CURRENT_DATE_MOCK = "2025-11-28";

export const MODEL_HISTORY: ModelEvent[] = [
  {
    id: 'm1',
    model: 'Grok 4.1',
    company: 'xAI',
    date: '2025-11-17',
    description: 'Released unexpectedly on a Sunday night. Claimed "Infinite Context" via new memory architecture.',
    tags: ['The Disruptor', 'Meme-heavy'],
    stats: {
      swebench: '76.2%',
      context: '∞ (Theoretically)',
      modalities: ['Text', 'Image']
    }
  },
  {
    id: 'm2',
    model: 'Gemini 3 Pro',
    company: 'Google',
    date: '2025-11-18',
    description: 'The scaled leader. 4M token context window standard. Native audio/video understanding at 60fps.',
    tags: ['The Scaled Leader', 'Multimodal King'],
    stats: {
      swebench: '79.5%',
      context: '4M Tokens',
      modalities: ['Text', 'Audio', 'Video', 'Code']
    }
  },
  {
    id: 'm3',
    model: 'Claude Opus 4.5',
    company: 'Anthropic',
    date: '2025-11-24',
    description: 'The Coding King. Solves complex system architecture problems. "It just feels smarter."',
    tags: ['Coding King', 'Vibes Leader'],
    stats: {
      swebench: '80.9%',
      context: '500k Tokens',
      modalities: ['Text', 'Code', 'Image']
    }
  }
];

export const FUTURE_EVENTS = [
  { date: '2025-12-01', label: 'GPT-5... pending?' },
  { date: '2026-01-15', label: 'Llama 5 (Open Source saves us)' }
];

export const THEMES: Record<Company, AppTheme> = {
  Anthropic: {
    bg: 'bg-[#F2F0E9]', // Warm beige
    text: 'text-[#333331]', // Charcoal
    accent: 'bg-[#D97757]', // Burnt orange
    border: 'border-[#E6E4DD]',
    cardBg: 'bg-white',
    button: 'bg-[#333331]',
    buttonText: 'text-[#F2F0E9]'
  },
  Google: {
    bg: 'bg-slate-50',
    text: 'text-slate-900',
    accent: 'bg-blue-600',
    border: 'border-blue-100',
    cardBg: 'bg-white',
    button: 'bg-blue-600',
    buttonText: 'text-white'
  },
  OpenAI: {
    bg: 'bg-zinc-950',
    text: 'text-green-400', // Terminal vibes
    accent: 'bg-green-500',
    border: 'border-green-900',
    cardBg: 'bg-zinc-900',
    button: 'bg-green-600',
    buttonText: 'text-white'
  },
  xAI: {
    bg: 'bg-black',
    text: 'text-white',
    accent: 'bg-white',
    border: 'border-zinc-800',
    cardBg: 'bg-zinc-900',
    button: 'bg-white',
    buttonText: 'text-black'
  }
};

export const COMPANY_ICONS = {
  Anthropic: Brain,
  Google: Video, // Multimodal focus
  OpenAI: Zap,
  xAI: Terminal
};
