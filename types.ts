export type Company = 'Anthropic' | 'Google' | 'OpenAI' | 'xAI';

export interface ModelEvent {
  id: string;
  model: string;
  company: Company;
  date: string;
  description: string;
  tags: string[];
  stats?: {
    swebench?: string;
    context?: string;
    modalities?: string[];
  };
}

export interface AppTheme {
  bg: string;
  text: string;
  accent: string;
  border: string;
  cardBg: string;
  button: string;
  buttonText: string;
}
