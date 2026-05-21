import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './ChangeStaffPwdStyles';

export default function ChangeStaffPwdScreen({ navigation }) {
  // States untuk UI Dropdown
  const [showDropdownCabang, setShowDropdownCabang] = useState(false);
  const [showDropdownStaff, setShowDropdownStaff] = useState(false);

  // States untuk Data
  const [cabang, setCabang] = useState('');
  const [staffList, setStaffList] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null); // Menyimpan objek {id_user, username}
  
  // States untuk Form Password
  const [passwordBaru, setPasswordBaru] = useState('');
  const [konfirmasiPassword, setKonfirmasiPassword] = useState('');
  const [showPwdBaru, setShowPwdBaru] = useState(false);
  const [showPwdKonfirm, setShowPwdKonfirm] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingStaff, setIsFetchingStaff] = useState(false);

  const listCabang = ['Meteora 1', 'Meteora 2'];

  // FUNGSI 1: MENGAMBIL DAFTAR STAFF BERDASARKAN CABANG
  const fetchStaffByCabang = async (selectedCabang) => {
    setIsFetchingStaff(true);
    setSelectedStaff(null); // Reset pilihan staff jika cabang diganti
    setStaffList([]);

    try {
      // Pastikan IP Address sama dengan laptopmu
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

  // FUNGSI 2: MENYIMPAN PERUBAHAN PASSWORD
  const handleSimpanPerubahan = async () => {
    if (!selectedStaff || !passwordBaru || !konfirmasiPassword) {
      Alert.alert('Peringatan', 'Mohon pilih akun staf dan isi form password!');
      return;
    }

    if (passwordBaru !== konfirmasiPassword) {
      Alert.alert('Peringatan', 'Konfirmasi password tidak cocok!');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://192.168.1.22:3000/api/users/reset-staff-password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_user: selectedStaff.id_user,
          passwordBaru: passwordBaru,
          konfirmasiPassword: konfirmasiPassword
        }),
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert('Sukses', 'Password staf berhasil diperbarui!', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      } else {
        Alert.alert('Gagal', result.message || 'Terjadi kesalahan.');
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
        <Text style={styles.headerTitle}>Ganti Password Staff</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.mainCard}>
          <Text style={styles.cardTitle}>Update Kredensial</Text>
          <Text style={styles.cardSubtitle}>
            Silakan lengkapi formulir di bawah ini untuk memperbarui kata sandi staff di cabang tertentu.
          </Text>

          {/* 1. PILIH CABANG */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>PILIH CABANG</Text>
            <TouchableOpacity 
              style={styles.dropdownTrigger} 
              onPress={() => {
                setShowDropdownCabang(!showDropdownCabang);
                setShowDropdownStaff(false); // Tutup dropdown sebelahnya
              }}
            >
              <Text style={cabang ? styles.dropdownText : styles.dropdownPlaceholder}>
                {cabang ? cabang : 'Pilih Lokasi Cabang'}
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
                      fetchStaffByCabang(item); // Panggil API Staff otomatis
                    }}
                  >
                    <Text style={styles.dropdownItemText}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* 2. PILIH AKUN STAFF */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>PILIH AKUN STAFF</Text>
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
                {isFetchingStaff ? 'Memuat data...' : (selectedStaff ? selectedStaff.username : 'Cari Nama Staff')}
              </Text>
              <Ionicons name="person-outline" size={20} color="#666" />
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

          {/* 3. PASSWORD BARU */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>PASSWORD BARU</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Masukkan password baru"
                placeholderTextColor="#999"
                secureTextEntry={!showPwdBaru}
                value={passwordBaru}
                onChangeText={setPasswordBaru}
              />
              <TouchableOpacity onPress={() => setShowPwdBaru(!showPwdBaru)}>
                <Ionicons name={showPwdBaru ? "eye-off-outline" : "eye-outline"} size={22} color="#666" />
              </TouchableOpacity>
            </View>
          </View>

          {/* 4. KONFIRMASI PASSWORD */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>KONFIRMASI PASSWORD BARU</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Ulangi password baru"
                placeholderTextColor="#999"
                secureTextEntry={!showPwdKonfirm}
                value={konfirmasiPassword}
                onChangeText={setKonfirmasiPassword}
              />
              <TouchableOpacity onPress={() => setShowPwdKonfirm(!showPwdKonfirm)}>
                <Ionicons name={showPwdKonfirm ? "eye-off-outline" : "eye-outline"} size={22} color="#666" />
              </TouchableOpacity>
            </View>
          </View>

          {/* INFO BOX */}
          <View style={styles.infoBox}>
            <Ionicons name="information-circle-outline" size={20} color="#8B6B1D" />
            <Text style={styles.infoText}>
              Password minimal 8 karakter dengan kombinasi huruf besar, kecil, dan angka untuk keamanan maksimal.
            </Text>
          </View>

          {/* BUTTON SIMPAN */}
          <TouchableOpacity 
            style={[styles.btnSave, isLoading && styles.btnSaveDisabled]} 
            onPress={handleSimpanPerubahan}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#333" />
            ) : (
              <>
                <Text style={styles.btnText}>Simpan Perubahan</Text>
                <Ionicons name="save-outline" size={20} color="#333" />
              </>
            )}
          </TouchableOpacity>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}