import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Switch, Modal, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications'; // IMPORT LIBRARY NOTIFIKASI
import { styles } from './ProfileStyles';

// KONFIGURASI NOTIFIKASI SISTEM
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function ProfileScreen({ route, navigation }) {
  const { user } = route.params;
  const isOwner = user?.role?.toLowerCase() === 'owner' || user?.cabang?.toLowerCase() === 'all';

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNotifEnabled, setIsNotifEnabled] = useState(true);
  
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);

  const [notifikasi, setNotifikasi] = useState([]);
  const [loadingNotif, setLoadingNotif] = useState(false);

  // MEMINTA IZIN NOTIFIKASI SAAT LAYAR DIBUKA
  useEffect(() => {
    async function requestNotificationPermission() {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        // Jika ditolak, notifikasi sistem tidak akan bunyi (tapi UI dalam app tetap jalan)
        console.log('Izin notifikasi ditolak pengguna.');
      }
    }
    requestNotificationPermission();
  }, []);

  // FUNGSI PEMICU NOTIFIKASI SISTEM (SEPERTI WA)
  const triggerLocalNotification = async (items) => {
    if (items.length === 0) return;

    if (items.length === 1) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: '⚠️ Stok Kritis Warkop Meteora!',
          body: `Bahan baku "${items[0].nama_barang}" tersisa ${items[0].jumlah_stok} lagi di ${items[0].cabang}.`,
          sound: true,
        },
        trigger: null,
      });
    } else {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: '⚠️ Peringatan: Banyak Stok Menipis!',
          body: `Ada ${items.length} bahan baku yang sudah menyentuh batas aman. Segera lakukan restock!`,
          sound: true,
        },
        trigger: null,
      });
    }
  };

  const fetchNotifikasiStok = async () => {
    setLoadingNotif(true);
    try {
      const response = await fetch(`https://warkop.sikitom.my.id/api/inventory/low-stock`);
      const result = await response.json();
      
      if (response.ok) {
        const filteredData = isOwner 
          ? result.data 
          : result.data.filter(item => item.cabang?.toLowerCase() === user?.cabang?.toLowerCase());
          
        setNotifikasi(filteredData);

        // PICU NOTIFIKASI SISTEM JIKA ADA DATA DAN TOGGLE MENYALA
        if (filteredData.length > 0 && isNotifEnabled) {
          triggerLocalNotification(filteredData);
        }
      }
    } catch (error) {
      console.error("Gagal load notifikasi:", error);
    } finally {
      setLoadingNotif(false);
    }
  };

  useEffect(() => {
    if (isNotifEnabled) {
      fetchNotifikasiStok();
    }
  }, [isNotifEnabled]);

  const executeLogout = () => {
    setLogoutModalVisible(false);
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image source={isOwner ? require('../../../assets/owner.jpg') : require('../../../assets/staff.jpg')} style={styles.avatarImg} />
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

        {/* AREA NOTIFIKASI STOK MENIPIS DI UI (IN-APP ALERT) */}
        {isNotifEnabled && (
          <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
            <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#888', marginBottom: 10, textTransform: 'uppercase' }}>
              Peringatan Stok (Sisa ≤ 10)
            </Text>
            
            {loadingNotif ? (
              <ActivityIndicator size="small" color="#FFCC00" />
            ) : notifikasi.length === 0 ? (
              <View style={{ backgroundColor: '#E8F5E9', padding: 15, borderRadius: 12, flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="checkmark-circle" size={24} color="#2E7D32" style={{ marginRight: 10 }} />
                <Text style={{ color: '#2E7D32', fontWeight: '600', fontSize: 14 }}>Semua stok bahan baku aman!</Text>
              </View>
            ) : (
              notifikasi.map((item, index) => (
                <View key={index} style={{ 
                  backgroundColor: '#FFF', padding: 15, borderRadius: 12, marginBottom: 8, 
                  flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
                  borderWidth: 1, borderColor: '#FFCDD2', elevation: 1
                }}>
                  <View>
                    <Text style={{ fontWeight: 'bold', color: '#C62828', fontSize: 15 }}>{item.nama_barang}</Text>
                    <Text style={{ fontSize: 12, color: '#E53935', marginTop: 4 }}>
                      <Ionicons name="location-outline" size={12} /> {item.cabang}
                    </Text>
                  </View>
                  <View style={{ backgroundColor: '#D32F2F', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#FFF' }}>
                      Sisa {item.jumlah_stok}
                    </Text>
                  </View>
                </View>
              ))
            )}
          </View>
        )}

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

          <TouchableOpacity style={[styles.menuCard, styles.menuCardRed]} onPress={() => setLogoutModalVisible(true)}>
            <View style={[styles.iconBox, styles.iconBoxRed]}><Ionicons name="log-out-outline" size={22} color="#D32F2F" /></View>
            <Text style={[styles.menuText, styles.menuTextRed]}>Keluar</Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>PENGATURAN APLIKASI</Text>
          <View style={styles.settingsCard}>
            {/* <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <Ionicons name="moon-outline" size={24} color="#555" />
                <Text style={styles.settingText}>Mode Gelap</Text>
              </View>
              <Switch trackColor={{ false: "#D3D3D3", true: "#FFCC00" }} thumbColor={"#FFF"} onValueChange={() => setIsDarkMode(!isDarkMode)} value={isDarkMode} />
            </View> */}
            {/* <View style={styles.divider} /> */}
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <Ionicons name="notifications-outline" size={24} color="#555" />
                <Text style={styles.settingText}>Notifikasi Stok</Text>
              </View>
              <Switch trackColor={{ false: "#D3D3D3", true: "#FFCC00" }} thumbColor={"#FFF"} onValueChange={() => setIsNotifEnabled(!isNotifEnabled)} value={isNotifEnabled} />
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Warkop Meteora v.1{'\n'}© 2026</Text>
          </View>
        </View>
      </ScrollView>

      {/* CUSTOM MODAL LOGOUT */}
      <Modal animationType="fade" transparent={true} visible={isLogoutModalVisible} onRequestClose={() => setLogoutModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalIconCircle}><Ionicons name="alert-circle" size={32} color="#D32F2F" /></View>
            <Text style={styles.modalTitle}>Konfirmasi Keluar</Text>
            <Text style={styles.modalSubtitle}>Apakah Anda yakin ingin keluar dari sesi saat ini? Anda harus login kembali untuk masuk.</Text>
            <TouchableOpacity style={styles.btnModalPrimary} onPress={executeLogout}><Text style={styles.btnModalPrimaryText}>Ya, Keluar</Text></TouchableOpacity>
            <TouchableOpacity style={styles.btnModalSecondary} onPress={() => setLogoutModalVisible(false)}><Text style={styles.btnModalSecondaryText}>Tidak</Text></TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}