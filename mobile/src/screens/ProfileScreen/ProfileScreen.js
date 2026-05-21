import React, { useState } from 'react';
// PERUBAHAN: Tambahkan import Modal
import { View, Text, TouchableOpacity, Image, ScrollView, Switch, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './ProfileStyles';

export default function ProfileScreen({ route, navigation }) {
  const { user } = route.params;
  const isOwner = user?.role?.toLowerCase() === 'owner' || user?.cabang?.toLowerCase() === 'all';

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNotifEnabled, setIsNotifEnabled] = useState(true);
  
  // STATE BARU: Untuk mengontrol tampilnya Custom Modal Logout
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);

  // Fungsi saat tombol "Ya, Keluar" di modal ditekan
  const executeLogout = () => {
    setLogoutModalVisible(false); // Tutup modal dulu
    navigation.replace('Login');  // Eksekusi pindah layar
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
            <Image 
              source={isOwner ? require('../../../assets/owner.jpg') : require('../../../assets/staff.jpg')} 
              style={styles.avatarImg} 
            />
          </View>
          <Text style={styles.nameText}>{user?.username}</Text>
          <View style={styles.badgeContainer}>
            <View style={styles.roleBadge}>
              <Text style={styles.roleText}>{isOwner ? 'Owner' : 'Staff'}</Text>
            </View>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.warkopText}>Warkop Meteora</Text>
          </View>
        </View>

        {/* DAFTAR MENU */}
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuCard} onPress={() => navigation.navigate('ChangePwd', { user })}>
            <View style={styles.iconBox}><Ionicons name="lock-closed-outline" size={22} color="#B8860B" /></View>
            <Text style={styles.menuText}>Ganti Password</Text>
            <Ionicons name="chevron-forward" size={20} color="#CCC" />
          </TouchableOpacity>

          {isOwner && (
            <>
              <TouchableOpacity style={styles.menuCard} onPress={() => navigation.navigate('AddUser', { user })}>
                <View style={styles.iconBox}><Ionicons name="person-add-outline" size={22} color="#B8860B" /></View>
                <Text style={styles.menuText}>Tambah User Baru</Text>
                <Ionicons name="chevron-forward" size={20} color="#CCC" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuCard} onPress={() => navigation.navigate('ChangeStaffPwd', { user })}>
                <View style={styles.iconBox}><Ionicons name="shield-checkmark-outline" size={22} color="#B8860B" /></View>
                <Text style={styles.menuText}>Ganti Password Staff</Text>
                <Ionicons name="chevron-forward" size={20} color="#CCC" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuCard} onPress={() => navigation.navigate('DeleteUser', { user })}>
                <View style={[styles.iconBox, styles.iconBoxRed]}><Ionicons name="person-remove-outline" size={22} color="#D32F2F" /></View>
                <Text style={styles.menuText}>Hapus User</Text>
                <Ionicons name="chevron-forward" size={20} color="#CCC" />
              </TouchableOpacity>
            </>
          )}

          {/* TOMBOL LOGOUT (Memicu Modal Muncul) */}
          <TouchableOpacity 
            style={[styles.menuCard, styles.menuCardRed]} 
            onPress={() => setLogoutModalVisible(true)}
          >
            <View style={[styles.iconBox, styles.iconBoxRed]}>
              <Ionicons name="log-out-outline" size={22} color="#D32F2F" />
            </View>
            <Text style={[styles.menuText, styles.menuTextRed]}>Keluar</Text>
          </TouchableOpacity>

          {/* PENGATURAN APLIKASI */}
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

          <View style={styles.footer}>
            <Text style={styles.footerText}>Warkop Meteora v.1{'\n'}© 2026</Text>
          </View>
        </View>
      </ScrollView>

      {/* --- KOMPONEN CUSTOM MODAL LOGOUT --- */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isLogoutModalVisible}
        onRequestClose={() => setLogoutModalVisible(false)} // Menutup modal jika tombol back Android ditekan
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            
            <View style={styles.modalIconCircle}>
              <Ionicons name="alert-triangle" size={32} color="#D32F2F" />
            </View>
            
            <Text style={styles.modalTitle}>Konfirmasi Keluar</Text>
            <Text style={styles.modalSubtitle}>
              Apakah Anda yakin ingin keluar dari sesi saat ini? Anda harus login kembali untuk masuk.
            </Text>

            <TouchableOpacity style={styles.btnModalPrimary} onPress={executeLogout}>
              <Text style={styles.btnModalPrimaryText}>Ya, Keluar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnModalSecondary} onPress={() => setLogoutModalVisible(false)}>
              <Text style={styles.btnModalSecondaryText}>Tidak</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

    </View>
  );
}