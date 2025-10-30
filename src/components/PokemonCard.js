import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Audio } from 'expo-av';

const PokemonCard = ({ pokemon, onPress }) => {
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
      <Text style={[styles.name, { color: colors.text }]}>#{pokemon.id}</Text>
      <Text style={[styles.title, { color: colors.text }]}>{pokemon.name.toUpperCase()}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: { padding: 16, borderRadius: 16, alignItems: 'center', margin: 8, elevation: 4 },
  sprite: { width: 120, height: 120 },
  name: { fontSize: 14, opacity: 0.6 },
  title: { fontSize: 18, fontWeight: 'bold', marginTop: 4 }
});

export default PokemonCard;