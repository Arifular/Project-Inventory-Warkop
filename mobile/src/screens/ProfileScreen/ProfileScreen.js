import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Alert, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './ProfileStyles'; // Import style terpisah

export default function ProfileScreen({ route, navigation }) {
  const { user } = route.params;
  const isOwner = user?.role?.toLowerCase() === 'owner' || user?.cabang?.toLowerCase() === 'all';

  // State untuk Switch UI Pengaturan Aplikasi
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNotifEnabled, setIsNotifEnabled] = useState(true);

  // --- FUNGSI LOGOUT ---
  const handleLogout = () => {
    Alert.alert(
      "Konfirmasi Logout",
      "Apakah Anda yakin ingin keluar?",
      [
        { text: "Batal", style: "cancel" },
        { 
          text: "Keluar", 
          onPress: () => navigation.replace('Login'),
          style: 'destructive'
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* BAGIAN FOTO DAN IDENTITAS */}
    <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            {/* Render gambar sesuai role */}
            <Image 
              source={isOwner ? require('../../../assets/owner.jpg') : require('../../../assets/staff.jpg')} 
              style={styles.avatarImg} 
            />
          </View>
          
          {/* PERBAIKAN: Hapus kondisi isOwner, panggil username secara langsung */}
          <Text style={styles.nameText}>{user?.username}</Text>
          
          <View style={styles.badgeContainer}>
            <View style={styles.roleBadge}>
              <Text style={styles.roleText}>{isOwner ? 'Owner' : 'Staff'}</Text>
            </View>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.warkopText}>Warkop Meteora</Text>
          </View>
    </View>

        {/* DAFTAR MENU (Tergantung Role) */}
        <View style={styles.menuContainer}>
          
          {/* 1. Ganti Password (Semua Role) */}
          <TouchableOpacity style={styles.menuCard} onPress={() => navigation.navigate('ChangePwd', { user })}>
            <View style={styles.iconBox}>
              <Ionicons name="lock-closed-outline" size={22} color="#B8860B" />
            </View>
            <Text style={styles.menuText}>Ganti Password</Text>
            <Ionicons name="chevron-forward" size={20} color="#CCC" />
          </TouchableOpacity>

          {/* Menu Khusus Owner */}
          {isOwner && (
            <>
              {/* 2. Tambah User Baru */}
              <TouchableOpacity style={styles.menuCard} onPress={() => navigation.navigate('AddUser', { user })}>
                <View style={styles.iconBox}>
                  <Ionicons name="person-add-outline" size={22} color="#B8860B" />
                </View>
                <Text style={styles.menuText}>Tambah User Baru</Text>
                <Ionicons name="chevron-forward" size={20} color="#CCC" />
              </TouchableOpacity>

              {/* 3. Ganti Password Staff */}
              <TouchableOpacity style={styles.menuCard} onPress={() => navigation.navigate('ChangeStaffPwd', { user })}>
                <View style={styles.iconBox}>
                  <Ionicons name="shield-checkmark-outline" size={22} color="#B8860B" />
                </View>
                <Text style={styles.menuText}>Ganti Password Staff</Text>
                <Ionicons name="chevron-forward" size={20} color="#CCC" />
              </TouchableOpacity>

              {/* 4. Hapus User */}
              <TouchableOpacity style={styles.menuCard} onPress={() => navigation.navigate('DeleteUser', { user })}>
                <View style={[styles.iconBox, styles.iconBoxRed]}>
                  <Ionicons name="person-remove-outline" size={22} color="#D32F2F" />
                </View>
                <Text style={styles.menuText}>Hapus User</Text>
                <Ionicons name="chevron-forward" size={20} color="#CCC" />
              </TouchableOpacity>
            </>
          )}

          {/* 5. Tombol Keluar (Semua Role) */}
          <TouchableOpacity style={[styles.menuCard, styles.menuCardRed]} onPress={handleLogout}>
            <View style={[styles.iconBox, styles.iconBoxRed]}>
              <Ionicons name="log-out-outline" size={22} color="#D32F2F" />
            </View>
            <Text style={[styles.menuText, styles.menuTextRed]}>Keluar</Text>
          </TouchableOpacity>

          {/* --- PENGATURAN APLIKASI --- */}
          <Text style={styles.sectionTitle}>PENGATURAN APLIKASI</Text>
          <View style={styles.settingsCard}>
            
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <Ionicons name="moon-outline" size={24} color="#555" />
                <Text style={styles.settingText}>Mode Gelap</Text>
              </View>
              <Switch 
                trackColor={{ false: "#D3D3D3", true: "#FFCC00" }}
                thumbColor={"#FFF"}
                onValueChange={() => setIsDarkMode(!isDarkMode)}
                value={isDarkMode}
              />
            </View>
            
            <View style={styles.divider} />

            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <Ionicons name="notifications-outline" size={24} color="#555" />
                <Text style={styles.settingText}>Notifikasi Stok</Text>
              </View>
              <Switch 
                trackColor={{ false: "#D3D3D3", true: "#FFCC00" }}
                thumbColor={"#FFF"}
                onValueChange={() => setIsNotifEnabled(!isNotifEnabled)}
                value={isNotifEnabled}
              />
            </View>

          </View>

          {/* FOOTER */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Warkop Meteora v.1{'\n'}© 2026</Text>
          </View>

        </View>
      </ScrollView>
    </View>
  );
}