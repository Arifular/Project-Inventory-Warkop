import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './DashboardStyles';

// PERBAIKAN NAVIGASI 1: Tambahkan 'navigation' di parameter fungsi
export default function DashboardScreen({ route, navigation }) {
  const { user } = route.params; 
  
  const isOwner = user.role?.toLowerCase() === 'owner' || user.cabang?.toLowerCase() === 'all';
  
  // Jika Owner, default Meteora 1. Jika Staff, sesuaikan dengan cabangnya sendiri!
  const [selectedCabang, setSelectedCabang] = useState(isOwner ? 'Meteora 1' : user.cabang);
  
  // STATE BARU: Untuk mengontrol buka/tutup menu Dropdown Combo Box
  const [showDropdown, setShowDropdown] = useState(false);
  
  const [activeCategory, setActiveCategory] = useState('Minuman');
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch('http://192.168.1.22:3000/api/items'); 
        const result = await response.json();

        if (response.ok) {
          setItems(result.data);
        } else {
          Alert.alert('Gagal Mengambil Data', result.message || 'Terjadi kesalahan');
        }
      } catch (error) {
        console.error("Error Fetch Inventory:", error);
      }
    };

    fetchInventory();
  }, []); 

  // --- LOGIKA FILTER CABANG & KATEGORI ---
  const branchItems = items.filter(item => item.cabang?.toLowerCase() === selectedCabang?.toLowerCase());
  const filteredItems = branchItems.filter(item => item.kategori === activeCategory);
  
  const totalInventory = branchItems.length;
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
            
            <View style={{ position: 'relative', zIndex: 10 }}>
              <TouchableOpacity 
                style={styles.pickerContainer} 
                onPress={() => setShowDropdown(!showDropdown)} 
              >
                <Text style={styles.pickerText}>{selectedCabang} ▼</Text>
              </TouchableOpacity>

              {showDropdown && (
                <View style={styles.dropdownMenu}>
                  <TouchableOpacity 
                    style={styles.dropdownItem} 
                    onPress={() => {
                      setSelectedCabang('Meteora 1'); 
                      setShowDropdown(false); 
                    }}
                  >
                    <Text style={styles.dropdownItemText}>Meteora 1</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.dropdownItem} 
                    onPress={() => {
                      setSelectedCabang('Meteora 2'); 
                      setShowDropdown(false); 
                    }}
                  >
                    <Text style={styles.dropdownItemText}>Meteora 2</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
            
            {/* PERBAIKAN NAVIGASI 2: Pasang fungsi onPress untuk Owner (Header Kanan) */}
            <TouchableOpacity onPress={() => navigation.navigate('Profile', { user })}>
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
            const currentStock = item.jumlah_stok || 0; 
            const isAlert = currentStock < 5; 

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
          /* PERBAIKAN NAVIGASI 3: Pasang fungsi onPress untuk Staff (Bottom Nav Kanan) */
          <TouchableOpacity onPress={() => navigation.navigate('Profile', { user })}>
            <Ionicons name="person" size={24} color="#888" />
          </TouchableOpacity> 
        )}
      </View>

    </View>
  );
}