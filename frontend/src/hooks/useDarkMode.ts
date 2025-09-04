import { useContext } from 'react';
import { DarkModeContext } from '../contexts/DarkModeContext';
import type { DarkModeContextType } from '../contexts/DarkModeContext';

export const useDarkMode = (): DarkModeContextType => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('useDarkMode must be used inside DarkModeProvider');
  }
  return context;
};
