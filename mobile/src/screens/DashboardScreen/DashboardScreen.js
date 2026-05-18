import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './DashboardStyles';

export default function DashboardScreen({ route }) {
  const { user } = route.params; 
  
  const isOwner = user.role?.toLowerCase() === 'owner' || user.cabang?.toLowerCase() === 'all';
  const [selectedCabang, setSelectedCabang] = useState('Meteora 1');
  const [activeCategory, setActiveCategory] = useState('Minuman');

  // --- 1. STATE UNTUK MENAMPUNG DATA ASLI DARI DATABASE ---
  const [items, setItems] = useState([]);

  // --- 2. PENYEDOT DATA OTOMATIS (USE EFFECT) ---
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        // Ingat! Gunakan IP Hotspot-mu yang terakhir kali dipakai
        const response = await fetch('http://192.168.1.37:3000/api/items');
        const result = await response.json();

        if (response.ok) {
          // Masukkan data JSON dari Postman tadi ke dalam State aplikasi
          setItems(result.data);
        } else {
          Alert.alert('Gagal Mengambil Data', result.message || 'Terjadi kesalahan');
        }
      } catch (error) {
        console.error("Error Fetch Inventory:", error);
        // Alert.alert('Koneksi Error', 'Tidak dapat terhubung ke server backend.');
      }
    };

    fetchInventory();
  }, []); // Array kosong berarti fungsi ini hanya berjalan 1x saat layar Dashboard pertama kali terbuka

// --- 3. LOGIKA FILTER & PERHITUNGAN MATEMATIKA OTOMATIS ---
  
  // A. Pertama, saring data HANYA untuk cabang yang sedang dilihat (Meteora 1 / Meteora 2)
  const branchItems = items.filter(item => item.cabang === selectedCabang);

  // B. Kedua, saring lagi berdasarkan tab yang diklik (Minuman / Makanan)
  const filteredItems = branchItems.filter(item => item.kategori === activeCategory);
  
  // C. Menghitung statistik KHUSUS untuk cabang tersebut
  const totalInventory = branchItems.length;
  // Perhatikan: kita sekarang memanggil item.jumlah_stok sesuai nama kolom di tb_stok
  const lowStockCount = branchItems.filter(item => (item.jumlah_stok || 0) < 5).length; 
  const safeStockCount = totalInventory - lowStockCount;

  return (
    <View style={styles.container}>
      
      {/* --- HEADER --- */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image source={require('../../../assets/logo3.jpg')} style={styles.logoHeader} />
          <View>
            <Text style={styles.headerTitleTop}>Warkop</Text>
            <Text style={styles.headerTitleBottom}>Meteora</Text>
          </View>
        </View>
        
        {isOwner ? (
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.pickerContainer}>
              <Text style={styles.pickerText}>{selectedCabang} ▼</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="person-circle-outline" size={32} color="#333" />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.pickerContainerStaff}>
            <Text style={styles.pickerTextStaff}>{user.cabang?.toUpperCase()}</Text>
          </View>
        )}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* TOTAL INVENTORY CARD DENGAN DATA ASLI */}
        <View style={styles.mainCard}>
          <View>
            <Text style={styles.cardLabel}>TOTAL INVENTORY</Text>
            {/* Tampilkan angka dinamis dari database */}
            <Text style={styles.cardValue}>{totalInventory} <Text style={styles.cardItemsText}>items</Text></Text>
            <Text style={styles.cardSub}>Data Real-Time MySQL</Text>
          </View>
          <Image source={require('../../../assets/box.jpg')} style={styles.boxIcon} />
        </View>

        {/* TILES LOW STOCK & SAFE STOCK DENGAN DATA ASLI */}
        <View style={styles.tileRow}>
          <View style={styles.tile}>
            <Text style={styles.tileLabel}>LOW STOCK</Text>
            <Text style={styles.tileValueRed}>
              {lowStockCount < 10 ? `0${lowStockCount}` : lowStockCount}
            </Text>
          </View>
          <View style={styles.tile}>
            <Text style={styles.tileLabel}>SAFE STOCK</Text>
            <Text style={[styles.tileValueYellow, {color: '#2E7D32'}]}>
              {safeStockCount < 10 ? `0${safeStockCount}` : safeStockCount}
            </Text>
          </View>
        </View>

        {/* KATEGORI TABS */}
        <View style={styles.categoryRow}>
          <TouchableOpacity 
            style={activeCategory === 'Minuman' ? styles.btnCategoryActive : styles.btnCategoryInactive}
            onPress={() => setActiveCategory('Minuman')}
          >
            <Text style={activeCategory === 'Minuman' ? styles.txtCategoryActive : styles.txtCategoryInactive}>Minuman</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={activeCategory === 'Makanan' ? styles.btnCategoryActive : styles.btnCategoryInactive}
            onPress={() => setActiveCategory('Makanan')}
          >
            <Text style={activeCategory === 'Makanan' ? styles.txtCategoryActive : styles.txtCategoryInactive}>Makanan</Text>
          </TouchableOpacity>
        </View>

        {/* LIST BARANG */}
        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>Current Stock</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All →</Text>
          </TouchableOpacity>
        </View>

        {/* --- RENDER DATA MYSQL KE LAYAR --- */}
        {filteredItems.length === 0 ? (
          <Text style={{textAlign: 'center', marginTop: 20, color: '#888'}}>Tidak ada data {activeCategory}</Text>
        ) : (
          filteredItems.map((item) => {
            const currentStock = item.jumlah_stok || 0; // Baca kolom stok, jika null jadikan 0
            const isAlert = currentStock < 5; // Syarat warning merah

            return (
              <View 
                key={item.id_barang.toString()} 
                style={[styles.itemCard, isAlert && { borderColor: '#E53935', borderWidth: 1, borderLeftWidth: 5 }]}
              >
                <View style={styles.itemLeft}>
                  <View style={[styles.iconPlaceholder, isAlert && { backgroundColor: '#FFEBEE' }]}>
                    <Ionicons 
                      name={item.kategori === 'Minuman' ? 'cafe-outline' : 'fast-food-outline'} 
                      size={20} 
                      color={isAlert ? '#E53935' : '#888'} 
                    />
                  </View>
                  <View>
                    <Text style={styles.itemName}>{item.nama_barang}</Text>
                    {/* Menggunakan nama_barang untuk subtitel agar tidak kosong */}
                    <Text style={[styles.itemSub, isAlert && { color: '#E53935' }]}>
                      {isAlert ? 'Low Stock Alert' : item.kategori}
                    </Text>
                  </View>
                </View>
                <View style={styles.itemStock}>
                  <Text style={[styles.stockText, isAlert && { color: '#E53935' }]}>{currentStock}</Text>
                  <Text style={isAlert ? styles.itemSubUnitRed : styles.itemSubUnit}>{item.satuan}</Text>
                </View>
              </View>
            );
          })
        )}
        
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* --- BOTTOM GROUP NAVIGATION --- */}
      <View style={styles.bottomNav}>
        <TouchableOpacity><Ionicons name="grid" size={24} color="#FFCC00" /></TouchableOpacity> 
        <TouchableOpacity><Ionicons name="download-outline" size={24} color="#888" /></TouchableOpacity> 
        
        <TouchableOpacity style={styles.fab}>
          <Ionicons name="add" size={32} color="#FFCC00" /> 
        </TouchableOpacity> 

        <TouchableOpacity><Ionicons name="share-outline" size={24} color="#888" /></TouchableOpacity> 
        
        {isOwner ? (
          <TouchableOpacity><Ionicons name="time" size={24} color="#888" /></TouchableOpacity> 
        ) : (
          <TouchableOpacity><Ionicons name="person" size={24} color="#888" /></TouchableOpacity> 
        )}
      </View>

    </View>
  );
}