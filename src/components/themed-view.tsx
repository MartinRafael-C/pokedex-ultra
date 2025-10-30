import React from 'react';
import { View, ViewProps } from 'react-native';
import { useThemeColor } from '../hooks/use-theme-color';

interface Props extends ViewProps {
  lightColor?: string;
  darkColor?: string;
}

export function ThemedView({ style, lightColor, darkColor, ...rest }: Props) {
  const backgroundColor = useThemeColor({ props: { light: lightColor, dark: darkColor }, colorName: 'background' });

  return <View style={[{ backgroundColor }, style]} {...rest} />;
}