import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './InputStyles';

export default function InputScreen({ route, navigation }) {
    // Ambil data user dari route params (dikirim dari Tab Navigator nanti)
    const user = route?.params?.user || { role: 'Owner', cabang: 'Meteora 1' }; // Fallback sementara

    const isOwner = user?.role?.toLowerCase() === 'owner' || user?.cabang?.toLowerCase() === 'all';

    // State untuk Cabang
    const [selectedCabang, setSelectedCabang] = useState(isOwner ? 'Meteora 1' : user?.cabang);
    const [showDropdown, setShowDropdown] = useState(false);

    const listCabang = ['Meteora 1', 'Meteora 2'];

    return (
        <View style={styles.container}>
            {/* HEADER */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Image source={require('../../../assets/logo4.jpg')} style={styles.logo} />
                    <Text style={styles.headerTitle}>Input Stok</Text>
                </View>

                {/* LOGIKA CABANG OWNER VS STAFF */}
                {isOwner ? (
                    <TouchableOpacity
                        style={styles.branchSelector}
                        onPress={() => setShowDropdown(!showDropdown)}
                    >
                        <Text style={styles.branchText}>{selectedCabang}</Text>
                        <Ionicons name={showDropdown ? "chevron-up" : "chevron-down"} size={16} color="#333" />
                    </TouchableOpacity>
                ) : (
                    <View style={styles.branchSelector}>
                        <Text style={styles.branchText}>{selectedCabang}</Text>
                    </View>
                )}
            </View>

            {/* MODAL DROPDOWN (HANYA UNTUK OWNER) */}
            {showDropdown && isOwner && (
                <View style={styles.dropdownList}>
                    {listCabang.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.dropdownItem}
                            onPress={() => {
                                setSelectedCabang(item);
                                setShowDropdown(false);
                            }}
                        >
                            <Text style={styles.dropdownItemText}>{item}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* BANNER IMAGE */}
                <View style={styles.bannerContainer}>
                    {/* Pastikan kamu punya gambar banner.jpg di folder assets */}
                    <ImageBackground
                        source={require('../../../assets/banner.jpg')}
                        style={styles.bannerImage}
                    >
                        <View style={styles.bannerOverlay} />
                        <View style={styles.bannerTextContainer}>
                            <Text style={styles.bannerTitle}>Kelola Inventaris</Text>
                            <Text style={styles.bannerSubtitle}>Perbarui stok harian anda dengan cepat.</Text>
                        </View>
                    </ImageBackground>
                </View>

                {/* KARTU 1: RESTOCK BARANG */}
                <TouchableOpacity
                    style={styles.card}
                    onPress={() => navigation.navigate('RestockBarang', { user, cabang: selectedCabang })}
                >
                    <View style={styles.iconBoxYellow}>
                        <Ionicons name="archive-outline" size={28} color="#333" />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.cardTitle}>ReStock Barang</Text>
                        <Text style={styles.cardDesc}>Tambah jumlah stok untuk item yang sudah terdaftar.</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={24} color="#CCC" />
                </TouchableOpacity>

                {/* KARTU 2: INPUT BARANG BARU */}
                {/* Nanti di-onPress arahkan ke layar form Input Baru */}
                <TouchableOpacity style={styles.card}
                    onPress={() => navigation.navigate('InputBarangBaru', { user, cabang: selectedCabang })}
                >
                    <View style={styles.iconBoxBrown}>
                        <Ionicons name="add-circle-outline" size={30} color="#FFF" />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.cardTitle}>Input Barang Baru</Text>
                        <Text style={styles.cardDesc}>Daftarkan produk atau bahan baku baru ke sistem.</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={24} color="#CCC" />
                </TouchableOpacity>

            </ScrollView>
        </View>
    );
}