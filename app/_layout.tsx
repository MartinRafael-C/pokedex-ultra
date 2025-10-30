// app/_layout.tsx
import { ThemeProvider } from '../src/context/ThemeContext';
import { Tabs } from 'expo-router';
import { useTheme } from '../src/context/ThemeContext';
import { View, TouchableOpacity, Text } from 'react-native';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <TabsScreen />
    </ThemeProvider>
  );
}

function TabsScreen() {
  const { isDark, toggle, colors } = useTheme();
  return (
    <Tabs
      screenOptions={{
        headerRight: () => (
          <TouchableOpacity onPress={toggle} style={{ marginRight: 16 }}>
            <Text style={{ color: colors.primary, fontSize: 20 }}>{isDark ? '☀️' : '🌙'}</Text>
          </TouchableOpacity>
        ),
        tabBarActiveTintColor: colors.primary, // Rojo
        tabBarInactiveTintColor: colors.accent, // Amarillo
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
      }}
    >
      <Tabs.Screen name="(tabs)" options={{ title: 'Pokédex' }} />
      <Tabs.Screen name="favorites" options={{ title: 'Favoritos' }} />
    </Tabs>
  );
}