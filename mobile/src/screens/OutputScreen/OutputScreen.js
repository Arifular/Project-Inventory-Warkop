import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './OutputStyles';

export default function OutputScreen({ route, navigation }) {
    const user = route?.params?.user;
    const isOwner = user?.role?.toLowerCase() === 'owner' || user?.cabang?.toLowerCase() === 'all';

    // State untuk Cabang (Default Meteora 1 untuk Owner)
    const [selectedCabang, setSelectedCabang] = useState(isOwner ? 'Meteora 1' : user?.cabang);
    const [showDropdownCabang, setShowDropdownCabang] = useState(false);

    const [activeCategory, setActiveCategory] = useState('Makanan');
    const [searchQuery, setSearchQuery] = useState('');

    const [items, setItems] = useState([]);
    const [isLoadingFetch, setIsLoadingFetch] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [outputCart, setOutputCart] = useState({});

    const categories = ['Makanan', 'Minuman', 'Snack', 'Bahan Baku'];
    const listCabang = ['Meteora 1', 'Meteora 2'];

    const getCategoryIcon = (cat) => {
        switch (cat) {
            case 'Minuman': return { name: 'cafe-outline', color: '#8D6E63' };
            case 'Makanan': return { name: 'fast-food-outline', color: '#E53935' };
            case 'Snack': return { name: 'pizza-outline', color: '#FFB300' };
            case 'Bahan Baku': return { name: 'cube-outline', color: '#43A047' };
            default: return { name: 'layers-outline', color: '#888' };
        }
    };

    // 1. Jalankan fetch ulang setiap kali state 'selectedCabang' berubah (Combo Box diganti)
    // --- PERBAIKAN TOTAL: KODE EMAS ANTI-STALE CLOSURE ---
    useEffect(() => {
        // 1. Ambil data secara langsung saat komponen pertama dimuat ATAU saat combo box diganti
        fetchInventory();

        // 2. Daftarkan listener focus yang selalu membawa nilai cabang terbaru
        const unsubscribe = navigation.addListener('focus', () => {
            fetchInventory();
        });

        // 3. Fungsi pembersih (cleanup) untuk menghancurkan listener lama agar tidak tumpang tindih
        return unsubscribe;
    }, [navigation, selectedCabang]); // <--- Memasukkan selectedCabang di sini adalah kuncinya!

    const fetchInventory = async () => {
        setIsLoadingFetch(true);
        try {
            const response = await fetch('http://192.168.1.22:3000/api/items');
            const result = await response.json();
            if (response.ok) {
                // Filter berdasarkan selectedCabang
                const branchItems = result.data.filter(item => item.cabang?.toLowerCase() === selectedCabang?.toLowerCase());
                setItems(branchItems);
                setOutputCart({});
            }
        } catch (error) {
            console.error("Fetch Error:", error);
        } finally {
            setIsLoadingFetch(false);
        }
    };

    const filteredItems = items.filter(item => {
        const matchCategory = item.kategori === activeCategory;
        const matchSearch = item.nama_barang.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCategory && matchSearch;
    });

    const handleUpdateCart = (id_barang, action, maxStok) => {
        setOutputCart(prev => {
            const currentQty = prev[id_barang] || 0;
            let newQty = currentQty;

            if (action === 'plus') {
                if (currentQty < maxStok) {
                    newQty += 1;
                } else {
                    Alert.alert('Batas Stok', 'Jumlah keluar tidak boleh melebihi stok yang ada!');
                }
            } else if (action === 'minus' && currentQty > 0) {
                newQty -= 1;
            }

            return { ...prev, [id_barang]: newQty };
        });
    };

    const totalItemToOutput = Object.values(outputCart).filter(qty => qty > 0).length;

    const handleSimpanOutput = async () => {
        if (totalItemToOutput === 0) {
            Alert.alert('Peringatan', 'Pilih minimal satu barang untuk dikeluarkan.');
            return;
        }

        setIsSubmitting(true);
        let apiGagal = false;

        try {
            const itemsToSubmit = Object.keys(outputCart).filter(id => outputCart[id] > 0);

            await Promise.all(itemsToSubmit.map(async (id_barang) => {
                const jumlahKeluar = outputCart[id_barang];

                const response = await fetch('http://192.168.1.22:3000/api/inventory/out', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        id_barang: parseInt(id_barang),
                        jumlah: jumlahKeluar,
                        cabang: selectedCabang,
                        id_user: user?.id_user
                    })
                });

                if (!response.ok) {
                    apiGagal = true;
                }
            }));

            if (!apiGagal) {
                Alert.alert('Sukses', 'Data barang keluar berhasil dicatat!', [
                    { text: 'OK', onPress: () => fetchInventory() }
                ]);
            } else {
                Alert.alert('Gagal', 'Beberapa atau seluruh item gagal diproses oleh server.');
            }

        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Terjadi kesalahan saat mencatat barang keluar.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <View style={styles.container}>

            {/* HEADER DENGAN PILIHAN CABANG */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Text style={styles.headerTitle}>Output Barang</Text>
                    <Text style={styles.subTitle}>Pengeluaran stok harian</Text>
                </View>

                {isOwner ? (
                    <View>
                        <TouchableOpacity
                            style={styles.branchSelector}
                            onPress={() => setShowDropdownCabang(!showDropdownCabang)}
                        >
                            <Text style={styles.branchText}>{selectedCabang}</Text>
                            <Ionicons name={showDropdownCabang ? "chevron-up" : "chevron-down"} size={16} color="#333" />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.branchSelector}>
                        <Text style={styles.branchText}>{selectedCabang}</Text>
                    </View>
                )}
            </View>

            {/* DROPDOWN MENU MUNCUL DI ATAS LIST */}
            {showDropdownCabang && isOwner && (
                <View style={styles.dropdownListHeader}>
                    {listCabang.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.dropdownItemHeader}
                            onPress={() => {
                                setSelectedCabang(item);
                                setShowDropdownCabang(false);
                            }}
                        >
                            <Text style={styles.branchText}>{item}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}

            {/* CATEGORY TABS */}
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

            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#888" />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Cari item untuk dikeluarkan..."
                    placeholderTextColor="#999"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            {isLoadingFetch ? (
                <ActivityIndicator size="large" color="#FFCC00" style={{ marginTop: 50 }} />
            ) : (
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContent}>
                    {filteredItems.length === 0 ? (
                        <Text style={{ textAlign: 'center', color: '#888', marginTop: 20 }}>Tidak ada data barang.</Text>
                    ) : (
                        filteredItems.map((item) => {
                            const { name: iconName, color: iconColor } = getCategoryIcon(item.kategori);
                            const qtyToOutput = outputCart[item.id_barang] || 0;

                            return (
                                <View key={item.id_barang.toString()} style={styles.itemCard}>
                                    <View style={styles.iconBox}>
                                        <Ionicons name={iconName} size={32} color={iconColor} />
                                    </View>

                                    <View style={styles.itemInfo}>
                                        <Text style={styles.itemName}>{item.nama_barang}</Text>
                                        <Text style={styles.itemStock}>Stok tersedia: {item.jumlah_stok} {item.satuan}</Text>

                                        <View style={styles.counterContainer}>
                                            <TouchableOpacity style={styles.btnMinus} onPress={() => handleUpdateCart(item.id_barang, 'minus', item.jumlah_stok)}>
                                                <Ionicons name="remove" size={18} color="#1A1A1A" />
                                            </TouchableOpacity>
                                            <Text style={styles.counterText}>{qtyToOutput}</Text>
                                            <TouchableOpacity style={styles.btnPlus} onPress={() => handleUpdateCart(item.id_barang, 'plus', item.jumlah_stok)}>
                                                <Ionicons name="add" size={18} color="#FFF" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            );
                        })
                    )}
                </ScrollView>
            )}

            {/* FOOTER */}
            <View style={styles.footer}>
                <View style={styles.footerTextContainer}>
                    <Text style={styles.footerTotalLabel}>BARANG KELUAR</Text>
                    <Text style={styles.footerTotalItems}>{totalItemToOutput} Items</Text>
                </View>

                <TouchableOpacity
                    style={[styles.btnSubmit, isSubmitting && styles.btnSubmitDisabled]}
                    onPress={handleSimpanOutput}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? <ActivityIndicator color="#1A1A1A" /> : (
                        <>
                            {/* Icon diubah warnanya menjadi gelap agar kontras dengan tombol kuning */}
                            <Ionicons name="log-out-outline" size={20} color="#1A1A1A" />
                            <Text style={styles.btnSubmitText}>Simpan Output</Text>
                        </>
                    )}
                </TouchableOpacity>
            </View>

        </View>
    );
}