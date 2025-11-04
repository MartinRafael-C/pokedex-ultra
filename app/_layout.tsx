// app/_layout.tsx
import { ThemeProvider } from '../src/context/ThemeContext';
import { Tabs } from 'expo-router';
import { useThemeColor } from '../src/hooks/useThemedColor';

export default function Layout() {
  return (
    <ThemeProvider>
      <TabsScreen />
    </ThemeProvider>
  );
}

function TabsScreen() {
  const primary = useThemeColor('primary');
  const accent = useThemeColor('accent');
  const background = useThemeColor('bg');
  const text = useThemeColor('text');

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: primary,
        tabBarInactiveTintColor: accent,
        headerStyle: { backgroundColor: background },
        headerTintColor: text,
        tabBarStyle: { backgroundColor: background },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Pokédex' }} />
      <Tabs.Screen name="favorites" options={{ title: 'Favoritos' }} />
    </Tabs>
  );
}