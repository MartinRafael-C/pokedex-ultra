import React, { createContext, useContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(Appearance.getColorScheme() === 'dark');

  useEffect(() => {
    const listener = ({ colorScheme }) => setIsDark(colorScheme === 'dark');
    const sub = Appearance.addChangeListener(listener);
    return () => sub?.remove();
  }, []);

  const theme = {
    isDark,
    toggle: () => setIsDark(prev => !prev),
    colors: {
      background: isDark ? '#121212' : '#f5f5f5',
      card: isDark ? '#1e1e1e' : '#fff',
      text: isDark ? '#fff' : '#000',
      primary: '#ff6b6b',
      accent: '#4ecdc4',
    }
  };

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);