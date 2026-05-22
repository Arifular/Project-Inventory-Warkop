import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './HistoryStyles';

export default function HistoryScreen({ navigation, route }) {
  const user = route?.params?.user;

  // Fungsi navigasi sementara untuk membedakan jenis laporan yang diklik
  const handleNavigate = (tipeLaporan) => {
    if (tipeLaporan === 'Input') {
      navigation.navigate('HistoryInputScreen', { user });
    } else if (tipeLaporan === 'Output') {
      navigation.navigate('HistoryOutputScreen', { user });
    } else if (tipeLaporan === 'Semua') {
      navigation.navigate('AllHistoryScreen', { user }); // <--- MENUJU LAYAR BARU KITA
    }
  };

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="menu" size={28} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Riwayat Inventaris</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* BANNER IMAGE */}
        <View style={styles.bannerContainer}>
          <ImageBackground
            source={require('../../../assets/banner2.jpg')}
            style={styles.bannerImage}
          >
            <View style={styles.bannerOverlay} />
            <View style={styles.bannerTextContainer}>
              <Text style={styles.bannerTitle}>Pilih Laporan</Text>
              <Text style={styles.bannerSub}>Pilih jenis laporan yang ingin Anda lihat untuk audit stok berkala.</Text>
            </View>
          </ImageBackground>
        </View>

        {/* LIST MENU KARTU */}
        <View style={styles.cardContainer}>

          {/* 1. KARTU RIWAYAT INPUT */}
          <TouchableOpacity style={styles.cardWhite} onPress={() => handleNavigate('Input')}>
            <View style={styles.iconBoxYellow}>
              <Ionicons name="add-circle-outline" size={28} color="#1A1A1A" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.titleDark}>Riwayat Input</Text>
              <Text style={styles.subDark}>Lihat log barang masuk</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#CCC" />
          </TouchableOpacity>

          {/* 2. KARTU RIWAYAT OUTPUT */}
          <TouchableOpacity style={styles.cardWhite} onPress={() => handleNavigate('Output')}>
            <View style={styles.iconBoxRed}>
              <Ionicons name="remove-circle-outline" size={28} color="#E53935" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.titleDark}>Riwayat Output</Text>
              <Text style={styles.subDark}>Lihat log barang keluar</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#CCC" />
          </TouchableOpacity>

          {/* 3. KARTU SEMUA RIWAYAT (DARK MODE) */}
          <TouchableOpacity style={styles.cardDark} onPress={() => handleNavigate('Semua')}>
            <View style={styles.iconBoxYellow}>
              <Ionicons name="list-outline" size={26} color="#1A1A1A" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.titleYellow}>Semua Riwayat</Text>
              <Text style={styles.subLight}>Laporan gabungan stok masuk & keluar</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#FFCC00" />
          </TouchableOpacity>

        </View>

        {/* Memberikan ruang kosong di bawah agar tidak tertutup bottom tab */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}