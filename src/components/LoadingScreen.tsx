import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface Props {
  message?: string;
}

const LoadingScreen: React.FC<Props> = ({ message = "Cargando..." }) => {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ActivityIndicator size="large" color="#FFCB05" />
      <Text style={[styles.text, { color: colors.text }]}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { marginTop: 16, fontSize: 18, fontWeight: 'bold' }
});

export default LoadingScreen;