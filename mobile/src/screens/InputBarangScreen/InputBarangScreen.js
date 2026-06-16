import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, ActivityIndicator, KeyboardAvoidingView, Platform, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './InputBarangStyles';

export default function InputBarangScreen({ route, navigation }) {
  // Tangkap data user dan cabang yang dipilih dari layar sebelumnya
  const user = route?.params?.user;
  const targetCabang = route?.params?.cabang || user?.cabang || 'Meteora 1';

  const [namaBarang, setNamaBarang] = useState('');
  const [jumlah, setJumlah] = useState('');
  
  const [kategori, setKategori] = useState('Makanan'); // Default sesuai gambar
  const [satuan, setSatuan] = useState('Unit'); // Teks default di kotak abu-abu

  const [showDropdownKategori, setShowDropdownKategori] = useState(false);
  const [showDropdownSatuan, setShowDropdownSatuan] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const listKategori = ['Minuman', 'Makanan', 'Snack', 'Bahan Baku'];
  const listSatuan = ['Gelas', 'Porsi', 'Pcs', 'Bungkus', 'Kg'];

  const handleSimpanBarang = async () => {
    if (!namaBarang || !kategori || satuan === 'Unit' || !jumlah) {
      Alert.alert('Peringatan', 'Mohon lengkapi semua data dan pilih Unit (Satuan)!');
      return;
    }

    setIsLoading(true);

    try {
      // Pastikan IP disesuaikan dengan IP terbarumu (.22)
      const response = await fetch('https://warkop.sikitom.my.id/api/inventory/in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tipe_input: 'baru',
          nama_barang: namaBarang,
          kategori: kategori,
          satuan: satuan,
          jumlah: parseInt(jumlah),
          cabang: targetCabang,
          id_user: user?.id_user
        }),
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert('Sukses', 'Barang baru berhasil ditambahkan!', [
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
      
      {/* HEADER FULLSCREEN */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tambah Barang</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* JUDUL & SUBJUDUL */}
        <Text style={styles.mainTitle}>Tambah Barang Baru</Text>
        <Text style={styles.subTitle}>Pastikan data stok barang sudah sesuai dengan fisik di gudang.</Text>

        {/* BANNER IMAGE */}
        <View style={styles.bannerContainer}>
          <ImageBackground 
            source={require('../../../assets/banner.jpg')} 
            style={styles.bannerImage}
          >
            <View style={styles.bannerOverlay} />
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>Inventory Sync</Text>
            </View>
          </ImageBackground>
        </View>

        {/* KATEGORI DROPDOWN */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Kategori</Text>
          <TouchableOpacity style={styles.dropdownTrigger} onPress={() => { setShowDropdownKategori(!showDropdownKategori); setShowDropdownSatuan(false); }}>
            <Text style={styles.dropdownText}>{kategori}</Text>
            <Ionicons name="chevron-down" size={20} color="#666" />
          </TouchableOpacity>
          {showDropdownKategori && (
            <View style={styles.dropdownList}>
              {listKategori.map((item, index) => (
                <TouchableOpacity key={index} style={styles.dropdownItem} onPress={() => { setKategori(item); setShowDropdownKategori(false); }}>
                  <Text style={styles.dropdownItemText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* NAMA BARANG */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nama Barang</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Contoh: Kopi Arabika 1Kg"
              placeholderTextColor="#999"
              value={namaBarang}
              onChangeText={setNamaBarang}
            />
          </View>
        </View>

        {/* JUMLAH AWAL & KOTAK SATUAN */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Jumlah Awal</Text>
          <View style={styles.rowInputs}>
            <View style={[styles.inputWrapper, styles.flexInput]}>
              <TextInput
                style={styles.input}
                placeholder="0"
                placeholderTextColor="#999"
                keyboardType="numeric"
                value={jumlah}
                onChangeText={setJumlah}
              />
            </View>
            
            {/* KOTAK UNIT DIJADIKAN TRIGGER DROPDOWN */}
            <TouchableOpacity style={styles.unitBox} onPress={() => { setShowDropdownSatuan(!showDropdownSatuan); setShowDropdownKategori(false); }}>
              <Text style={styles.unitText}>{satuan}</Text>
            </TouchableOpacity>
          </View>
          
          {/* DROPDOWN SATUAN MUNCUL DI BAWAH KOTAK UNIT */}
          {showDropdownSatuan && (
            <View style={styles.dropdownList}>
              {listSatuan.map((item, index) => (
                <TouchableOpacity key={index} style={styles.dropdownItem} onPress={() => { setSatuan(item); setShowDropdownSatuan(false); }}>
                  <Text style={styles.dropdownItemText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* TOMBOL SIMPAN */}
        <TouchableOpacity style={[styles.btnSave, isLoading && styles.btnSaveDisabled]} onPress={handleSimpanBarang} disabled={isLoading}>
          {isLoading ? <ActivityIndicator color="#1A1A1A" /> : (
            <>
              <Ionicons name="save-outline" size={20} color="#1A1A1A" />
              <Text style={styles.btnText}>Simpan</Text>
            </>
          )}
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}