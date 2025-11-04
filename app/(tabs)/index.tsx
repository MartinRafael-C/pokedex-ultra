// app/(tabs)/index.tsx
import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import PokemonCard from '../../src/components/PokemonCard';
import PokemonModal from '../../src/components/PokemonModal';
import LoadingScreen from '../../src/components/LoadingScreen';

export default function HomeScreen() {
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPokemon, setSelectedPokemon] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
      .then(r => r.json())
      .then(data => {
        Promise.all(data.results.map((p: any) => fetch(p.url).then(r => r.json())))
          .then(results => {
            setPokemons(results);
            setLoading(false);
          });
      });
  }, []);

  const openModal = (pokemon: any) => {
    setSelectedPokemon(pokemon);
    setModalVisible(true);
  };

  if (loading) return <LoadingScreen />;

  return (
    <View style={styles.container}>
      <FlatList
        data={pokemons}
        numColumns={2}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <PokemonCard
            pokemon={item}
            onPress={() => openModal(item)}
            playSound={() => console.log(`¡${item.name}!`)}
          />
        )}
      />

      <PokemonModal
        visible={modalVisible}
        pokemon={selectedPokemon}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});