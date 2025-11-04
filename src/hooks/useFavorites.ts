// src/hooks/useFavorites.ts
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'pokemon-favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>([]);

  // CARGAR AL INICIAR
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) setFavorites(JSON.parse(saved));
      } catch (e) {
        console.warn('Error loading favorites');
      }
    };
    loadFavorites();
  }, []);

  // GUARDAR AL CAMBIAR
  const saveFavorites = async (newFavs: number[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newFavs));
    } catch (e) {
      console.warn('Error saving favorites');
    }
  };

  const toggle = async (id: number) => {
    setFavorites(prev => {
      const newFavs = prev.includes(id)
        ? prev.filter(f => f !== id)
        : [...prev, id];
      saveFavorites(newFavs);
      return newFavs;
    });
  };

  return { favorites, toggle };
}