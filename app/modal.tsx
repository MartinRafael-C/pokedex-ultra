// app/modal.tsx
import { Link } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function ModalScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">¡Modal Funciona!</ThemedText>
      <Link href="/" style={styles.link}>
        <ThemedText>Volver</ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  link: { marginTop: 20 },
});