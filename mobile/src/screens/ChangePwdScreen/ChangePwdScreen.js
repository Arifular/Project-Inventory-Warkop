import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './ChangePwdStyles';

export default function ChangePwdScreen({ route, navigation }) {
  // Ambil data user dari parameter navigasi
  const { user } = route.params;

  // State untuk form input
  const [passwordLama, setPasswordLama] = useState('');
  const [passwordBaru, setPasswordBaru] = useState('');
  const [konfirmasiPassword, setKonfirmasiPassword] = useState('');

  // State untuk toggle mata (lihat password)
  const [showPwdLama, setShowPwdLama] = useState(false);
  const [showPwdBaru, setShowPwdBaru] = useState(false);
  const [showPwdKonfirm, setShowPwdKonfirm] = useState(false);

  // State loading saat hit API
  const [isLoading, setIsLoading] = useState(false);

  const handleSimpan = async () => {
    // Validasi kosong
    if (!passwordLama || !passwordBaru || !konfirmasiPassword) {
      Alert.alert('Peringatan', 'Semua kolom wajib diisi!');
      return;
    }

    // Validasi konfirmasi password
    if (passwordBaru !== konfirmasiPassword) {
      Alert.alert('Peringatan', 'Konfirmasi password baru tidak cocok!');
      return;
    }

    setIsLoading(true);

    try {
      // PASTIKAN IP ADDRESS INI SAMA DENGAN IP LAPTOPMU
      const response = await fetch('https://warkop.sikitom.my.id/api/users/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_user: user.id_user,
          passwordLama: passwordLama,
          passwordBaru: passwordBaru,
          konfirmasiPassword: konfirmasiPassword
        }),
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert('Sukses', result.message, [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      } else {
        Alert.alert('Gagal', result.message || 'Terjadi kesalahan saat mengganti password.');
      }
    } catch (error) {
      console.error("Error ganti password:", error);
      Alert.alert('Error', 'Tidak dapat terhubung ke server.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ganti Password</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* KOTAK INFO */}
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Demi keamanan akun Anda, gunakan minimal 8 karakter dengan kombinasi angka dan huruf untuk password baru.
          </Text>
        </View>

        {/* INPUT PASSWORD LAMA */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password Lama</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Masukkan password lama"
              placeholderTextColor="#999"
              secureTextEntry={!showPwdLama}
              value={passwordLama}
              onChangeText={setPasswordLama}
            />
            <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPwdLama(!showPwdLama)}>
              <Ionicons name={showPwdLama ? "eye-off-outline" : "eye-outline"} size={20} color="#666" />
            </TouchableOpacity>
          </View>
        </View>

        {/* INPUT PASSWORD BARU */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password Baru</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Masukkan password baru"
              placeholderTextColor="#999"
              secureTextEntry={!showPwdBaru}
              value={passwordBaru}
              onChangeText={setPasswordBaru}
            />
            <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPwdBaru(!showPwdBaru)}>
              <Ionicons name={showPwdBaru ? "eye-off-outline" : "eye-outline"} size={20} color="#666" />
            </TouchableOpacity>
          </View>
        </View>

        {/* INPUT KONFIRMASI PASSWORD */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Konfirmasi Password Baru</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Ulangi password baru"
              placeholderTextColor="#999"
              secureTextEntry={!showPwdKonfirm}
              value={konfirmasiPassword}
              onChangeText={setKonfirmasiPassword}
            />
            <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPwdKonfirm(!showPwdKonfirm)}>
              <Ionicons name={showPwdKonfirm ? "eye-off-outline" : "eye-outline"} size={20} color="#666" />
            </TouchableOpacity>
          </View>
        </View>
        
      </ScrollView>

      {/* FOOTER & TOMBOL SIMPAN */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.btnSave, isLoading && styles.btnSaveDisabled]} 
          onPress={handleSimpan}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#333" />
          ) : (
            <>
              <Ionicons name="save-outline" size={20} color="#333" />
              <Text style={styles.btnText}>Simpan</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
      
    </KeyboardAvoidingView>
  );
}