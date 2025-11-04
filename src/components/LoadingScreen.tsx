// src/components/LoadingScreen.tsx
import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useThemeColor } from '../hooks/useThemedColor';

type Props = {
  message?: string;
};

export default function LoadingScreen({ message = 'Cargando...' }: Props) {
  const background = useThemeColor('bg');
  const text = useThemeColor('text');

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <ActivityIndicator size="large" color="#FFCB05" />
      <Text style={[styles.text, { color: text }]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '600',
  },
});