// src/hooks/useThemeColor.ts
import { useTheme } from '../context/ThemeContext';

const COLORS = {
  light: {
    bg: '#87CEEB',
    text: '#000000',
    card: '#FFFFFF',
    primary: '#EE151B',
    accent: '#FFCB05',
  },
  dark: {
    bg: '#000080',
    text: '#FFFFFF',
    card: '#1e1e1e',
    primary: '#EE151B',
    accent: '#FFCB05',
  },
} as const;

export const useThemeColor = (
  name: keyof typeof COLORS.light
): string => {
  const { theme } = useTheme();
  return theme === 'dark' ? COLORS.dark[name] : COLORS.light[name];
};