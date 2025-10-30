import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useTheme } from '../context/ThemeContext';

export default function StatBar({ label, value }) {
  const { colors } = useTheme();
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(value / 255, { duration: 800 });
  }, [value]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  return (
    <View style={styles.container}>
      <Text style={{ color: colors.text, width: 100 }}>{label.toUpperCase()}</Text>
      <View style={styles.bar}>
        <Animated.View style={[styles.fill, animatedStyle, { backgroundColor: colors.primary }]} />
      </View>
      <Text style={{ color: colors.text, width: 40, textAlign: 'right' }}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', marginVertical: 6 },
  bar: { flex: 1, height: 20, backgroundColor: '#eee', borderRadius: 10, marginHorizontal: 8, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 10 }
});