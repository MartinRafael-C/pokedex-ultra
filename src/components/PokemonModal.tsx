// src/components/PokemonModal.tsx
import React from 'react';
import { Modal, View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { ThemedView } from './ThemedView';     // DIRECTO
import { ThemedText } from './ThemedText';     // DIRECTO
import { useThemeColor } from '../hooks/useThemedColor';

type Props = {
  visible: boolean;
  pokemon: any;
  onClose: () => void;
};

export default function PokemonModal({ visible, pokemon, onClose }: Props) {
  if (!pokemon) return null;

  const primary = useThemeColor('primary');
  const accent = useThemeColor('accent');

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <ThemedView style={styles.overlay}>
        <ThemedView style={styles.modal}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Image
              source={{ uri: pokemon.sprites.front_default }}
              style={styles.bigSprite}
            />
            <ThemedText style={styles.name}>
              {pokemon.name.toUpperCase()}
            </ThemedText>
            <ThemedText style={styles.id}>
              #{String(pokemon.id).padStart(3, '0')}
            </ThemedText>

            <View style={styles.section}>
              <ThemedText style={styles.label}>Tipo:</ThemedText>
              <View style={styles.types}>
                {pokemon.types.map((t: any) => (
                  <View key={t.slot} style={[styles.typeBadge, { backgroundColor: primary }]}>
                    <ThemedText style={styles.typeText}>
                      {t.type.name.toUpperCase()}
                    </ThemedText>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <ThemedText style={styles.label}>Altura:</ThemedText>
              <ThemedText>{pokemon.height / 10} m</ThemedText>
            </View>

            <View style={styles.section}>
              <ThemedText style={styles.label}>Peso:</ThemedText>
              <ThemedText>{pokemon.weight / 10} kg</ThemedText>
            </View>

            <View style={styles.section}>
              <ThemedText style={styles.label}>Habilidades:</ThemedText>
              {pokemon.abilities.map((a: any) => (
                <ThemedText key={a.slot} style={styles.ability}>
                  • {a.ability.name.replace('-', ' ')}
                </ThemedText>
              ))}
            </View>

            <TouchableOpacity style={[styles.closeButton, { backgroundColor: accent }]} onPress={onClose}>
              <ThemedText style={styles.closeText}>CERRAR</ThemedText>
            </TouchableOpacity>
          </ScrollView>
        </ThemedView>
      </ThemedView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '90%',
    maxHeight: '85%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 20,
  },
  bigSprite: { width: 200, height: 200, alignSelf: 'center', marginBottom: 10 },
  name: { fontSize: 28, fontWeight: 'bold', textAlign: 'center' },
  id: { fontSize: 16, textAlign: 'center', opacity: 0.6, marginBottom: 15 },
  section: { marginVertical: 10 },
  label: { fontWeight: 'bold', fontSize: 16, marginBottom: 5 },
  types: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  typeBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  typeText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  ability: { marginLeft: 10, fontStyle: 'italic' },
  closeButton: {
    marginTop: 20,
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
  closeText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});