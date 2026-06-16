import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './AddUserStyles';

export default function AddUserScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // State untuk Cabang
  const [cabang, setCabang] = useState('');
  const [showDropdownCabang, setShowDropdownCabang] = useState(false);
  const listCabang = ['Meteora 1', 'Meteora 2'];

  // State untuk Role
  const [role, setRole] = useState('');
  const [showDropdownRole, setShowDropdownRole] = useState(false);
  const listRole = ['Admin', 'Staf']; 
  
  const [showPwd, setShowPwd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSimpan = async () => {
    // LOGIKA PINTAR: Jika role Admin, paksa payload cabang menjadi 'all'
    const payloadCabang = role === 'Admin' ? 'all' : cabang;

    if (!username || !password || !role || !payloadCabang) {
      Alert.alert('Peringatan', 'Semua kolom wajib diisi!');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('https://warkop.sikitom.my.id/api/users/add-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          password: password,
          cabang: payloadCabang, // Kirim payload yang sudah difilter
          role: role 
        }),
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert('Sukses', 'User baru berhasil ditambahkan!', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      } else {
        Alert.alert('Gagal', result.message || result.error || 'Username sudah terdaftar.');
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

          {/* PILIH ROLE */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Pilih Role</Text>
            <TouchableOpacity 
              style={styles.dropdownTrigger} 
              onPress={() => {
                setShowDropdownRole(!showDropdownRole);
                setShowDropdownCabang(false); 
              }}
            >
              <Text style={role ? styles.dropdownText : styles.dropdownPlaceholder}>
                {role ? role : 'Pilih role'}
              </Text>
              <Ionicons name={showDropdownRole ? "chevron-up" : "chevron-down"} size={20} color="#666" />
            </TouchableOpacity>

            {showDropdownRole && (
              <View style={styles.dropdownList}>
                {listRole.map((item, index) => (
                  <TouchableOpacity 
                    key={index} 
                    style={styles.dropdownItem}
                    onPress={() => {
                      setRole(item);
                      setShowDropdownRole(false);
                      // Reset cabang jika user tiba-tiba mengganti pilihan role
                      if(item === 'Admin') setCabang('all');
                      else setCabang('');
                    }}
                  >
                    <Text style={styles.dropdownItemText}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* LOGIKA PERUBAHAN TAMPILAN CABANG */}
          {role === 'Admin' ? (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Cabang Akses</Text>
              {/* Tampilan input palsu yang dikunci (disabled) */}
              <View style={[styles.inputWrapper, { backgroundColor: '#EFEFEF', justifyContent: 'center' }]}>
                <Text style={{ color: '#555', fontSize: 14 }}>Semua Cabang (Akses Penuh)</Text>
              </View>
            </View>
          ) : (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Pilih Cabang</Text>
              <TouchableOpacity 
                style={styles.dropdownTrigger} 
                onPress={() => {
                  setShowDropdownCabang(!showDropdownCabang);
                  setShowDropdownRole(false); 
                }}
              >
                {/* Pastikan 'all' tidak tertampil sebagai text jika sempat tersimpan */}
                <Text style={cabang && cabang !== 'all' ? styles.dropdownText : styles.dropdownPlaceholder}>
                  {cabang && cabang !== 'all' ? cabang : 'Pilih cabang'}
                </Text>
                <Ionicons name={showDropdownCabang ? "chevron-up" : "chevron-down"} size={20} color="#666" />
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
                      }}
                    >
                      <Text style={styles.dropdownItemText}>{item}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          )}

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