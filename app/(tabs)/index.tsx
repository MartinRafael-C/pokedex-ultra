// app/(tabs)/index.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { View, TextInput, FlatList, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { getPokemonList, searchPokemon } from '../../src/services/pokeapi.ts';
import PokemonCard from '../../src/components/PokemonCard';
import LoadingScreen from '../../src/components/LoadingScreen';
import { useTheme } from '../../src/context/ThemeContext';
import { router } from 'expo-router';
import { Pokemon } from '../../src/types/pokemon';

export default function HomeScreen() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [query, setQuery] = useState('');
  const [offset, setOffset] = useState(0);
  const { colors } = useTheme();

  const loadInitial = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getPokemonList(20, 0);
      setPokemons(data as Pokemon[]);
      setOffset(20);
    } catch (e) {
      alert('Error al cargar Pokémon');
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMore = useCallback(async () => {
    if (loadingMore || query) return;
    setLoadingMore(true);
    try {
      const data = await getPokemonList(20, offset);
      setPokemons(prev => [...prev, ...(data as Pokemon[])]);
      setOffset(prev => prev + 20);
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, offset, query]);

  const handleSearch = useCallback(async (text: string) => {
    setQuery(text);
    if (text.length < 2) {
      loadInitial();
      return;
    }
    setLoading(true);
    try {
      const data = await searchPokemon(text);
      setPokemons([data as Pokemon]);
      setOffset(0);
    } catch (e) {
      setPokemons([]);
    } finally {
      setLoading(false);
    }
  }, [loadInitial]);

  useEffect(() => {
    loadInitial();
  }, [loadInitial]);

  if (loading) return <LoadingScreen message="¡Cargando Pokédex!" />;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TextInput
        placeholder="Busca Pokémon"
        value={query}
        onChangeText={handleSearch}
        style={[styles.input, { borderColor: colors.accent }]}
      />
      <FlatList
        data={pokemons}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PokemonCard
            pokemon={item}
            onPress={() => router.push({
              pathname: '/detail',
              params: { id: item.id.toString() }
            })}
          />
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={loadingMore ? <ActivityIndicator color={colors.accent} /> : null}
        ListEmptyComponent={<Text style={{ textAlign: 'center', margin: 20, color: colors.text }}>
          No se encontraron Pokémon
        </Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { 
    backgroundColor: '#FFF', 
    padding: 14, 
    borderRadius: 12, 
    marginBottom: 16, 
    borderWidth: 2,
    fontSize: 16
  }
});