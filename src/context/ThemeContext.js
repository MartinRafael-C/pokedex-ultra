// src/context/ThemeContext.js
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
      background: isDark ? '#000080' : '#87CEEB', // Azul marino / Azul cielo (Pokémon azul)
      card: isDark ? '#1e1e1e' : '#FFF',
      text: isDark ? '#FFF' : '#000',
      primary: '#EE151B', // Rojo Pokémon
      accent: '#FFCB05', // Amarillo Pokémon
    }
  };

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);