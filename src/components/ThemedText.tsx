// src/components/ThemedText.tsx
import React from 'react';
import { Text, TextProps } from 'react-native';
import { useThemeColor } from '../hooks/useThemedColor';

export function ThemedText(props: TextProps) {
  const color = useThemeColor('text');

  return <Text {...props} style={[{ color }, props.style]} />;
}