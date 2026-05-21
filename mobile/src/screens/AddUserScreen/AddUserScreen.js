import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './AddUserStyles';

export default function AddUserScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cabang, setCabang] = useState(''); // State untuk pilihan cabang
  
  const [showPwd, setShowPwd] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const listCabang = ['Meteora 1', 'Meteora 2'];

  const handleSimpan = async () => {
    if (!username || !password || !cabang) {
      Alert.alert('Peringatan', 'Semua kolom wajib diisi!');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://192.168.1.22:3000/api/users/add-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          password: password,
          cabang: cabang,
          role: 'Staff' // Default role sesuai rancangan awal kita untuk menu ini
        }),
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert('Sukses', 'User baru berhasil ditambahkan!', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      } else {
        Alert.alert('Gagal', result.message || 'Username sudah terdaftar.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Gagal terhubung ke server.');
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
        <Text style={styles.headerTitle}>Tambah User Baru</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.mainCard}>
          
          {/* INPUT USERNAME */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Username</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Masukkan username"
                placeholderTextColor="#999"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* INPUT PASSWORD */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Masukkan password"
                placeholderTextColor="#999"
                secureTextEntry={!showPwd}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPwd(!showPwd)}>
                <Ionicons name={showPwd ? "eye-off-outline" : "eye-outline"} size={22} color="#666" />
              </TouchableOpacity>
            </View>
          </View>

          {/* PILIH CABANG (DROPDOWN CUSTOM) */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Pilih Cabang</Text>
            <TouchableOpacity 
              style={styles.dropdownTrigger} 
              onPress={() => setShowDropdown(!showDropdown)}
            >
              <Text style={cabang ? styles.dropdownText : styles.dropdownPlaceholder}>
                {cabang ? cabang : 'Pilih cabang'}
              </Text>
              <Ionicons name={showDropdown ? "chevron-up" : "chevron-down"} size={20} color="#666" />
            </TouchableOpacity>

            {showDropdown && (
              <View style={styles.dropdownList}>
                {listCabang.map((item, index) => (
                  <TouchableOpacity 
                    key={index} 
                    style={styles.dropdownItem}
                    onPress={() => {
                      setCabang(item);
                      setShowDropdown(false);
                    }}
                  >
                    <Text style={styles.dropdownItemText}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* INFO BOX */}
          <View style={styles.infoBox}>
            <Ionicons name="information-circle-outline" size={20} color="#8B6B1D" style={styles.infoIcon} />
            <Text style={styles.infoText}>
              Pastikan username unik dan password mengandung minimal 8 karakter untuk keamanan data inventaris.
            </Text>
          </View>

        </View>
      </ScrollView>

      {/* BUTTON SIMPAN */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.btnSave} 
          onPress={handleSimpan}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#333" />
          ) : (
            <>
              <Text style={styles.btnText}>Simpan User Baru</Text>
              <Ionicons name="send-outline" size={18} color="#333" style={styles.btnIcon} />
            </>
          )}
        </TouchableOpacity>
      </View>

    </KeyboardAvoidingView>
  );
}