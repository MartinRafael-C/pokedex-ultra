// src/components/PokemonCard.tsx
import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { useThemeColor } from '../hooks/useThemedColor';

type Props = {
  pokemon: any;
  onPress: () => void;        // OBLIGATORIO
  playSound?: () => void;     // OPCIONAL
};

export default function PokemonCard({ pokemon, onPress, playSound }: Props) {
  const cardColor = useThemeColor('card');
  const textColor = useThemeColor('text');

  const handlePress = () => {
    playSound?.();  // Solo si se pasa
    onPress();      // Siempre se ejecuta
  };

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: cardColor }]}
      onPress={handlePress}
    >
      <Image
        source={{ uri: pokemon.sprites.front_default }}
        style={styles.sprite}
      />
      <Text style={[styles.name, { color: textColor }]}>
        {pokemon.name.toUpperCase()}
      </Text>
      <Text style={[styles.id, { color: textColor }]}>
        #{String(pokemon.id).padStart(3, '0')}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 160,
    padding: 12,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  sprite: { width: 100, height: 100 },
  name: { fontSize: 16, fontWeight: 'bold', marginTop: 8 },
  id: { fontSize: 12, opacity: 0.7 },
});