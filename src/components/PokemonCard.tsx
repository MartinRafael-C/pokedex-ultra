// src/components/PokemonCard.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Audio } from 'expo-av';
import { Pokemon } from '../types/pokemon';

interface Props {
  pokemon: Pokemon;
  onPress: () => void;
}

const PokemonCard: React.FC<Props> = ({ pokemon, onPress }) => {
  const { colors } = useTheme();

  const playSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../../assets/sounds/poke-sound.mp3')
      );
      await sound.playAsync();
      setTimeout(() => sound.unloadAsync(), 1000);
    } catch (e) {}
  };

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.card }]}
      onPress={() => { playSound(); onPress(); }}
    >
      <Image
        source={{ uri: pokemon.sprites.other['official-artwork'].front_default }}
        style={styles.sprite}
      />
      <View style={styles.info}>
        <Text style={[styles.name, { color: colors.text }]}>
          #{pokemon.id} {pokemon.name.toUpperCase()}
        </Text>
        <Text style={[styles.desc, { color: colors.text }]} numberOfLines={2}>
          {pokemon.description || 'Pokémon misterioso.'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: { 
    flexDirection: 'row', 
    padding: 12, 
    borderRadius: 16, 
    margin: 6, 
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#EE151B',
    borderRightWidth: 4,
    borderRightColor: '#00BFFF'
  },
  sprite: { width: 80, height: 80, marginRight: 12 },
  info: { flex: 1, justifyContent: 'center' },
  name: { fontSize: 15, fontWeight: 'bold' },
  desc: { fontSize: 11, opacity: 0.7, marginTop: 4 }
});

export default PokemonCard;