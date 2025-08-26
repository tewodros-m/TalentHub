import { useContext } from 'react';
import { DarkModeContext } from '../types/DarkModeContextType';
import type { DarkModeContextType } from '../types/DarkModeContextType';

export const useDarkMode = (): DarkModeContextType => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('useDarkMode must be used inside DarkModeProvider');
  }
  return context;
};
