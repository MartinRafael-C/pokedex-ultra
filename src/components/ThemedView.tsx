// src/components/ThemedView.tsx
import React from 'react';
import { View, ViewProps } from 'react-native';
import { useThemeColor } from '../hooks/useThemedColor';

export function ThemedView(props: ViewProps) {
  const backgroundColor = useThemeColor('bg');

  return <View {...props} style={[{ backgroundColor }, props.style]} />;
}