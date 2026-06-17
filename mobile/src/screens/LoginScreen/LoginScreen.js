import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView,
  Alert // Tambahkan Alert di sini
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './LoginScreenStyles';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // --- FUNGSI UNTUK MENGIRIM DATA KE BACKEND ---
  const handleLogin = async () => {
    // 1. Cek kalau ada kolom yang kosong
    if (!username || !password) {

      Alert.alert('Perhatian', 'Username dan password tidak boleh kosong!');
      return;
    }

    try {
      //2. Tembak API Backend menggunakan IP Wi-Fi Laptop
      const response = await fetch('https://warkop.sikitom.my.id/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      // const response = await fetch('http://192.168.68.109:3000/api/auth/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     username: username,
      //     password: password,
      //   }),
      // });


      // 3. Baca balasan dari database
      const data = await response.json();

      // 4. Logika jika sukses atau gagal
      if (response.ok) {
        // Jika sukses, munculkan pop-up dengan nama cabang
        //Alert.alert('Login Berhasil! 🎉', `Selamat datang, kamu login sebagai ${data.user.role} di cabang ${data.user.cabang}`);
        // (Nantinya di sini kita buat kode untuk pindah ke halaman Dashboard)
        navigation.replace('Dashboard', { user: data.user });
      } else {
        // Jika username/password salah
        Alert.alert('Login Gagal ❌', data.error);
      }
      
    } catch (error) {
      console.error(error);
      Alert.alert('Koneksi Error', 'Tidak dapat terhubung ke server. Pastikan Backend menyala dan HP satu jaringan dengan Wi-Fi laptop.');
    }
  };
  // ---------------------------------------------

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        <View style={styles.headerSection}>
          <Image source={require('../../../assets/logo2.jpg')} style={styles.logo} />
          <Text style={styles.brandName}>Meteora</Text>
          <Text style={styles.inventoryText}>INVENTORY SYSTEM</Text>
        </View>

        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Welcome Back</Text>
          <Text style={styles.welcomeSubtitle}>Sign in to manage your stock</Text>
        </View>

        <Text style={styles.inputLabel}>Username</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color="#888" style={styles.inputIcon} />
          <TextInput 
            style={[styles.input, { color: '#000000' }]}
            placeholder="Masukan username"
            placeholderTextColor="#888888"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
        </View>

        <Text style={styles.inputLabel}>Password</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#000000" style={styles.inputIcon} />
          <TextInput 
            style={[styles.input, { color: '#000000' }]}
            placeholder="••••••••"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons 
              name={showPassword ? "eye-off-outline" : "eye-outline"} 
              size={20} 
              color="#888" 
            />
          </TouchableOpacity>
        </View>

        {/* POIN PENTING: Tambahkan onPress={handleLogin} ke tombol ini */}
        <TouchableOpacity style={styles.loginButton} activeOpacity={0.8} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Log In</Text>
          <Ionicons name="arrow-forward-outline" size={20} color="#000" />
        </TouchableOpacity>

        <Text style={styles.footerText}>© 2026 Warkop Meteora.</Text>

      </ScrollView>
      <StatusBar style="dark" />
    </KeyboardAvoidingView>
  );
}