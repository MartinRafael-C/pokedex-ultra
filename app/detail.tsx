// app/detail.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { searchPokemon } from '../src/services/pokeapi.ts';
import StatBar from '../src/components/StatBar';
import LoadingScreen from '../src/components/LoadingScreen';
import { useTheme } from '../src/context/ThemeContext';
import { useFavorites } from '../src/hooks/useFavorites';
import { Pokemon } from '../src/types/pokemon';

export default function DetailScreen() {
  const { id: idParam } = useLocalSearchParams<{ id: string | string[] }>();
  const id = Array.isArray(idParam) ? idParam[0] : idParam;
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { colors } = useTheme();
  const { favorites, toggle } = useFavorites();

  useEffect(() => {
    if (id) {
      setError(null);
      searchPokemon(id)
        .then(setPokemon)
        .catch(() => {
            setPokemon(null);
            setError("Failed to load Pokémon details.");
        });
    }
  }, [id]);

  if (error) return <Text style={{color: colors.text, textAlign: 'center', marginTop: 20}}>{error}</Text>;
  if (!pokemon) return <LoadingScreen />;

  const pokemonId = pokemon.id.toString(); // USAMOS id COMO CLAVE

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <Image
        source={{ uri: pokemon.sprites.other['official-artwork'].front_default }}
        style={styles.sprite}
      />
      <Text style={[styles.name, { color: colors.text }]}>
        #{pokemon.id} {pokemon.name.toUpperCase()}
      </Text>

      <Text style={[styles.desc, { color: colors.text }]}>
        "{pokemon.description || 'Mysterious Pokémon.'}"
      </Text>

      <View style={styles.section}>
        <Text style={[styles.title, { color: colors.text }]}>Estadísticas</Text>
        {pokemon.stats.map(s => (
          <StatBar key={s.stat.name} label={s.stat.name} value={s.base_stat} />
        ))}
      </View>

      <Text
        onPress={() => toggle(pokemonId)} // USAMOS id
        style={[
          styles.fav,
          { color: favorites.includes(pokemonId) ? colors.accent : colors.text }
        ]}
      >
        {favorites.includes(pokemonId) ? 'Favorito' : 'Agregar'}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  sprite: { width: 250, height: 250, alignSelf: 'center', marginVertical: 10 },
  name: { fontSize: 28, fontWeight: 'bold', textAlign: 'center' },
  desc: { fontSize: 14, fontStyle: 'italic', textAlign: 'center', margin: 16, padding: 12, backgroundColor: 'rgba(255,203,5,0.1)', borderRadius: 12 },
  section: { marginTop: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  fav: { textAlign: 'center', margin: 24, fontSize: 18, fontWeight: 'bold' }
});
