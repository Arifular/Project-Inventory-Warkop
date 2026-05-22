import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function OutputScreen() {
  return (
    <View style={styles.container}>
      <Ionicons name="cloud-upload-outline" size={80} color="#FFCC00" />
      <Text style={styles.title}>Menu Output Barang</Text>
      <Text style={styles.subtitle}>Tampilan ini sedang dalam tahap pengembangan oleh Ketua.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FAFAFC' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#1A1A1A', marginTop: 20 },
  subtitle: { fontSize: 14, color: '#888', marginTop: 10, textAlign: 'center', paddingHorizontal: 40 }
});