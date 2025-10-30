import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { isDark, toggle } = useTheme();
  return (
    <TouchableOpacity onPress={toggle} style={{ marginRight: 16 }}>
      <Text>{isDark ? 'Sun' : 'Moon'}</Text>
    </TouchableOpacity>
  );
}