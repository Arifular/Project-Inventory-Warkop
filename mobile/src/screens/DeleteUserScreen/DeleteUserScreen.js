import React, { useState } from 'react';
// PERUBAHAN: Tambahkan import Modal
import { View, Text, TouchableOpacity, Alert, ScrollView, ActivityIndicator, KeyboardAvoidingView, Platform, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './DeleteUserStyles';

export default function DeleteUserScreen({ navigation }) {
  const [showDropdownCabang, setShowDropdownCabang] = useState(false);
  const [showDropdownStaff, setShowDropdownStaff] = useState(false);

  const [cabang, setCabang] = useState('');
  const [staffList, setStaffList] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingStaff, setIsFetchingStaff] = useState(false);
  
  // STATE BARU: Untuk mengontrol buka/tutup Custom Modal Hapus
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

  const listCabang = ['Meteora 1', 'Meteora 2'];

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

  // Pemicu tombol hapus di luar card
  const handleHapusUser = () => {
    if (!cabang || !selectedStaff) {
      Alert.alert('Peringatan', 'Mohon pilih Cabang dan Akun Staff terlebih dahulu!');
      return;
    }
    // Buka Custom Modal
    setDeleteModalVisible(true);
  };

  // Eksekusi pemanggilan API backend setelah dikonfirmasi di dalam modal
  const eksekusiHapus = async () => {
    setDeleteModalVisible(false); // Tutup modal terlebih dahulu
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

      {/* FOOTER & TOMBOL HAPUS UTAMA */}
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

      {/* --- KOMPONEN CUSTOM MODAL KONFIRMASI HAPUS --- */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isDeleteModalVisible}
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            
            <View style={styles.modalIconCircle}>
              <Ionicons name="warning" size={36} color="#D32F2F" />
            </View>
            
            <Text style={styles.modalTitle}>Konfirmasi Penghapusan</Text>
            <Text style={styles.modalSubtitle}>
              Apakah Anda yakin ingin menghapus akun "{selectedStaff?.username}"? Tindakan ini tidak dapat dibatalkan.
            </Text>

            <TouchableOpacity style={styles.btnModalPrimary} onPress={eksekusiHapus}>
              <Text style={styles.btnModalPrimaryText}>Ya, Hapus</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnModalSecondary} onPress={() => setDeleteModalVisible(false)}>
              <Text style={styles.btnModalSecondaryText}>Tidak</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

    </KeyboardAvoidingView>
  );
}