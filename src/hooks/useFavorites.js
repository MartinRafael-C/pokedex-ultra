import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'pokedex_favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    const data = await AsyncStorage.getItem(KEY);
    setFavorites(data ? JSON.parse(data) : []);
  };

  const toggle = async (name) => {
    const updated = favorites.includes(name)
      ? favorites.filter(f => f !== name)
      : [...favorites, name];
    setFavorites(updated);
    await AsyncStorage.setItem(KEY, JSON.stringify(updated));
  };

  return { favorites, toggle, loadFavorites };
};