import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import ThemeToggle from '../components/ThemeToggle';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerRight: () => <ThemeToggle />,
        tabBarActiveTintColor: '#ff6b6b',
      }}
    >
      <Tab.Screen name="Buscar" component={HomeScreen} options={{ tabBarIcon: () => 'Search'}} />
      <Tab.Screen name="Favoritos" component={FavoritesScreen} options={{ tabBarIcon: () => 'Heart'}} />
    </Tab.Navigator>
  );
}