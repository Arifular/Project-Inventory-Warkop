import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './RestockStyles';

export default function RestockScreen({ route, navigation }) {
  const user = route?.params?.user;
  const targetCabang = route?.params?.cabang || 'Meteora 1';

  const [activeCategory, setActiveCategory] = useState('Makanan');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [items, setItems] = useState([]);
  const [isLoadingFetch, setIsLoadingFetch] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State Keranjang ReStock: Menyimpan ID Barang dan jumlah yang akan ditambahkan { "1": 5, "3": 12 }
  const [restockCart, setRestockCart] = useState({});

  const categories = ['Makanan', 'Minuman', 'Snack', 'Bahan Baku'];

  // Fungsi untuk mendapatkan icon berdasarkan kategori
  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'Minuman': return { name: 'cafe-outline', color: '#8D6E63' };
      case 'Makanan': return { name: 'fast-food-outline', color: '#E53935' };
      case 'Snack': return { name: 'pizza-outline', color: '#FFB300' };
      case 'Bahan Baku': return { name: 'cube-outline', color: '#43A047' };
      default: return { name: 'layers-outline', color: '#888' };
    }
  };

  // 1. AMBIL DATA MASTER BARANG
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch('http://192.168.1.22:3000/api/items');
        const result = await response.json();
        if (response.ok) {
          // Hanya tampilkan barang dari cabang yang dipilih
          const branchItems = result.data.filter(item => item.cabang?.toLowerCase() === targetCabang?.toLowerCase());
          setItems(branchItems);
        }
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setIsLoadingFetch(false);
      }
    };
    fetchInventory();
  }, [targetCabang]);

  // 2. LOGIKA FILTER
  const filteredItems = items.filter(item => {
    const matchCategory = item.kategori === activeCategory;
    const matchSearch = item.nama_barang.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  // 3. FUNGSI TAMBAH/KURANG STOK
  const handleUpdateCart = (id_barang, action) => {
    setRestockCart(prev => {
      const currentQty = prev[id_barang] || 0;
      let newQty = currentQty;
      
      if (action === 'plus') newQty += 1;
      else if (action === 'minus' && currentQty > 0) newQty -= 1;

      return { ...prev, [id_barang]: newQty };
    });
  };

  // Menghitung jumlah jenis item yang sedang akan di-restock
  const totalItemToRestock = Object.values(restockCart).filter(qty => qty > 0).length;

  // 4. FUNGSI SIMPAN (BULK API CALL)
  const handleSimpanRestock = async () => {
    if (totalItemToRestock === 0) {
      Alert.alert('Peringatan', 'Belum ada barang yang ditambahkan jumlah restock-nya.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Mengubah object keranjang menjadi array lalu difilter yang > 0
      const itemsToSubmit = Object.keys(restockCart).filter(id => restockCart[id] > 0);

      // Menggunakan Promise.all agar mengirimkan perulangan API secara paralel
      await Promise.all(itemsToSubmit.map(async (id_barang) => {
        const jumlahTambah = restockCart[id_barang];

        await fetch('http://192.168.1.22:3000/api/inventory/in', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tipe_input: 'restock',
            id_barang: parseInt(id_barang),
            jumlah: jumlahTambah,
            cabang: targetCabang,
            id_user: user?.id_user
          })
        });
      }));

      Alert.alert('Sukses', 'Semua stok berhasil diperbarui!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
      
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Terjadi kesalahan saat menyimpan restock.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      
      {/* HEADER FULLSCREEN */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Restock Items</Text>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.mainTitle}>Restock Barang</Text>
        <Text style={styles.subTitle}>Tambah stok barang harian</Text>
      </View>

      {/* KATEGORI SCROLL HORIZONTAL */}
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
          {categories.map((cat, index) => (
            <TouchableOpacity 
              key={index} 
              style={activeCategory === cat ? styles.btnCategoryActive : styles.btnCategoryInactive}
              onPress={() => setActiveCategory(cat)}
            >
              <Text style={activeCategory === cat ? styles.txtCategoryActive : styles.txtCategoryInactive}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* SEARCH BAR */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#888" />
        <TextInput
          style={styles.searchInput}
          placeholder="Cari item..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* LIST ITEM */}
      {isLoadingFetch ? (
        <ActivityIndicator size="large" color="#FFCC00" style={{ marginTop: 50 }} />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContent}>
          {filteredItems.length === 0 ? (
            <Text style={{ textAlign: 'center', color: '#888', marginTop: 20 }}>Tidak ada data barang.</Text>
          ) : (
            filteredItems.map((item) => {
              const { name: iconName, color: iconColor } = getCategoryIcon(item.kategori);
              const qtyToAdd = restockCart[item.id_barang] || 0;

              return (
                <View key={item.id_barang.toString()} style={styles.itemCard}>
                  {/* ICON REPLACEMENT */}
                  <View style={styles.iconBox}>
                    <Ionicons name={iconName} size={32} color={iconColor} />
                  </View>
                  
                  {/* INFO BARANG & COUNTER (Dibungkus agar counter ada di bawah nama) */}
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName}>{item.nama_barang}</Text>
                    <Text style={styles.itemStock}>Stok saat ini: {item.jumlah_stok} {item.satuan.toLowerCase()}</Text>
                    
                    <View style={styles.counterContainer}>
                      <TouchableOpacity style={styles.btnMinus} onPress={() => handleUpdateCart(item.id_barang, 'minus')}>
                        <Ionicons name="remove" size={18} color="#E53935" />
                      </TouchableOpacity>
                      <Text style={styles.counterText}>{qtyToAdd}</Text>
                      <TouchableOpacity style={styles.btnPlus} onPress={() => handleUpdateCart(item.id_barang, 'plus')}>
                        <Ionicons name="add" size={18} color="#1A1A1A" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            })
          )}
        </ScrollView>
      )}

      {/* STICKY FOOTER */}
      <View style={styles.footer}>
        <View style={styles.footerTextContainer}>
          <Text style={styles.footerTotalLabel}>TOTAL ITEM</Text>
          <Text style={styles.footerTotalItems}>{totalItemToRestock} Items</Text>
        </View>

        <TouchableOpacity 
          style={[styles.btnSubmit, isSubmitting && styles.btnSubmitDisabled]} 
          onPress={handleSimpanRestock} 
          disabled={isSubmitting}
        >
          {isSubmitting ? <ActivityIndicator color="#1A1A1A" /> : (
            <>
              <Ionicons name="save" size={18} color="#1A1A1A" />
              <Text style={styles.btnSubmitText}>Simpan Restock</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

    </View>
  );
}