import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ListUserScreen({ navigation }) {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://warkop.sikitom.my.id/api/users/list');
      const json = await response.json();
      if (response.ok) {
        setUsers(json.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardInfo}>
        <Text style={styles.usernameText}>{item.username}</Text>
        <Text style={styles.cabangText}>Cabang: {item.cabang}</Text>
      </View>
      <View style={[styles.roleBadge, { backgroundColor: item.role === 'Admin' ? '#FFE0B2' : '#E0F7FA' }]}>
        <Text style={[styles.roleText, { color: item.role === 'Admin' ? '#E65100' : '#006064' }]}>
          {item.role}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Daftar Akun</Text>
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#FFC107" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id_user.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, backgroundColor: '#FFF', elevation: 2 },
  backButton: { marginRight: 15 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#1A1A1A' },
  listContainer: { padding: 15 },
  card: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFF', padding: 15, borderRadius: 10, marginBottom: 10, elevation: 1 },
  cardInfo: { flex: 1 },
  usernameText: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  cabangText: { fontSize: 14, color: '#666', marginTop: 4 },
  roleBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  roleText: { fontWeight: 'bold', fontSize: 12 }
});