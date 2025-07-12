import { Language } from '@/lib/i18n';

export interface LanguageState {
  language: Language;
  isLoading: boolean;
  error: string | null;
}

export type LanguageAction =
  | { type: 'SET_LANGUAGE'; payload: Language }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'RESET_STATE' };

export interface ThemeState {
  theme: 'light' | 'dark';
  resolvedTheme: 'light' | 'dark';
  isLoading: boolean;
  error: string | null;
}

export type ThemeAction =
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'SET_RESOLVED_THEME'; payload: 'light' | 'dark' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'RESET_STATE' };

export interface StorageConfig {
  key: string;
  version: number;
  defaultValue: any;
} 