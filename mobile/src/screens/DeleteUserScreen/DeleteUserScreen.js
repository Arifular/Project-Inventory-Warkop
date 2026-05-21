import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './DeleteUserStyles';

export default function DeleteUserScreen({ navigation }) {
  // States Dropdown
  const [showDropdownCabang, setShowDropdownCabang] = useState(false);
  const [showDropdownStaff, setShowDropdownStaff] = useState(false);

  // States Data
  const [cabang, setCabang] = useState('');
  const [staffList, setStaffList] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingStaff, setIsFetchingStaff] = useState(false);

  const listCabang = ['Meteora 1', 'Meteora 2'];

  // 1. FUNGSI MENGAMBIL DAFTAR STAFF
  const fetchStaffByCabang = async (selectedCabang) => {
    setIsFetchingStaff(true);
    setSelectedStaff(null); 
    setStaffList([]);

    try {
      const response = await fetch(`http://192.168.1.22:3000/api/users/staff/${selectedCabang}`);
      const result = await response.json();

      if (response.ok) {
        setStaffList(result.data);
      } else {
        Alert.alert('Gagal', result.error || 'Gagal mengambil data staf');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Tidak dapat terhubung ke server.');
    } finally {
      setIsFetchingStaff(false);
    }
  };

  // 2. FUNGSI KONFIRMASI POP-UP
  const handleHapusUser = () => {
    if (!cabang || !selectedStaff) {
      Alert.alert('Peringatan', 'Mohon pilih Cabang dan Akun Staff terlebih dahulu!');
      return;
    }

    // Tampilkan Pop-up Konfirmasi (Yes/No)
    Alert.alert(
      "Konfirmasi Penghapusan",
      `Apakah yakin untuk menghapus akun "${selectedStaff.username}" secara permanen?`,
      [
        { text: "Tidak", style: "cancel" },
        { 
          text: "Ya, Hapus", 
          onPress: () => eksekusiHapus(),
          style: 'destructive' // Membuat teks tombol ini berwarna merah di iOS
        }
      ]
    );
  };

  // 3. FUNGSI EKSEKUSI HAPUS KE API
  const eksekusiHapus = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`http://192.168.1.22:3000/api/users/delete-user/${selectedStaff.id_user}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert('Sukses', result.message || 'User berhasil dihapus!', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      } else {
        Alert.alert('Gagal', result.error || result.message || 'Terjadi kesalahan.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Tidak dapat terhubung ke server.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Hapus User</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.mainCard}>
          
          {/* PILIH CABANG */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Pilih Cabang</Text>
            <TouchableOpacity 
              style={styles.dropdownTrigger} 
              onPress={() => {
                setShowDropdownCabang(!showDropdownCabang);
                setShowDropdownStaff(false);
              }}
            >
              <Text style={cabang ? styles.dropdownText : styles.dropdownPlaceholder}>
                {cabang ? cabang : 'Pilih cabang'}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#666" />
            </TouchableOpacity>

            {showDropdownCabang && (
              <View style={styles.dropdownList}>
                {listCabang.map((item, index) => (
                  <TouchableOpacity 
                    key={index} 
                    style={styles.dropdownItem}
                    onPress={() => {
                      setCabang(item);
                      setShowDropdownCabang(false);
                      fetchStaffByCabang(item);
                    }}
                  >
                    <Text style={styles.dropdownItemText}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* PILIH AKUN USER */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Pilih Akun User</Text>
            <TouchableOpacity 
              style={styles.dropdownTrigger} 
              onPress={() => {
                if (!cabang) {
                  Alert.alert('Info', 'Silakan pilih cabang terlebih dahulu.');
                  return;
                }
                if (staffList.length === 0 && !isFetchingStaff) {
                  Alert.alert('Info', 'Tidak ada akun staff di cabang ini.');
                  return;
                }
                setShowDropdownStaff(!showDropdownStaff);
                setShowDropdownCabang(false);
              }}
            >
              <Text style={selectedStaff ? styles.dropdownText : styles.dropdownPlaceholder}>
                {isFetchingStaff ? 'Memuat data...' : (selectedStaff ? selectedStaff.username : 'Pilih Akun')}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#666" />
            </TouchableOpacity>

            {showDropdownStaff && (
              <View style={styles.dropdownList}>
                {staffList.map((staf) => (
                  <TouchableOpacity 
                    key={staf.id_user.toString()} 
                    style={styles.dropdownItem}
                    onPress={() => {
                      setSelectedStaff(staf);
                      setShowDropdownStaff(false);
                    }}
                  >
                    <Text style={styles.dropdownItemText}>{staf.username}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

        </View>
      </ScrollView>

      {/* FOOTER & TOMBOL HAPUS */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.btnDelete, isLoading && styles.btnDeleteDisabled]} 
          onPress={handleHapusUser}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <>
              <Text style={styles.btnText}>Hapus</Text>
              <Ionicons name="send-outline" size={20} color="#FFFFFF" />
            </>
          )}
        </TouchableOpacity>
      </View>

    </KeyboardAvoidingView>
  );
}