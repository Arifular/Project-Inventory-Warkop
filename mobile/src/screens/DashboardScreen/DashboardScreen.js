import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './DashboardStyles';

export default function DashboardScreen({ route }) {
  const { user } = route.params; // Ambil data dari login
  const [selectedCabang, setSelectedCabang] = useState(user.cabang === 'all' ? 'Meteora 1' : user.cabang);

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image source={require('../../../assets/logo3.jpg')} style={styles.logoHeader} />
          <Text style={styles.headerTitle}>Warkop Meteora</Text>
        </View>
        
        {user.role === 'owner' ? (
          <View style={styles.pickerContainer}>
            <Text style={{fontWeight:'bold'}}>{selectedCabang} ▼</Text>
          </View>
        ) : (
          <Text style={styles.headerTitle}>{user.cabang.toUpperCase()}</Text>
        )}

        {user.role === 'owner' && (
          <TouchableOpacity><Ionicons name="person-circle-outline" size={32} color="#333" /></TouchableOpacity>
        )}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* TOTAL INVENTORY CARD */}
        <View style={styles.mainCard}>
          <View>
            <Text style={styles.cardLabel}>Total Inventory</Text>
            <Text style={styles.cardValue}>1,248 Items</Text>
            <Text style={styles.cardSub}>↗ +12% from last week</Text>
          </View>
          <Image source={require('../../../assets/box.jpg')} style={styles.boxIcon} />
        </View>

        {/* TILES LOW STOCK & DELIVERED */}
        <View style={styles.tileRow}>
          <View style={styles.tile}>
            <Text style={styles.tileLabel}>LOW STOCK</Text>
            <Text style={styles.tileValue}>08</Text>
          </View>
          <View style={styles.tile}>
            <Text style={styles.tileLabel}>DELIVERED</Text>
            <Text style={[styles.tileValue, {color:'#2E7D32'}]}>24</Text>
          </View>
        </View>

        {/* LIST BARANG */}
        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>Current Stock</Text>
          <TouchableOpacity><Text style={styles.seeAll}>See All →</Text></TouchableOpacity>
        </View>

        {/* Contoh Item List */}
        <View style={styles.itemCard}>
          <View>
            <Text style={styles.itemName}>Kopi Susu</Text>
            <Text style={styles.itemSub}>Minuman Dingin</Text>
          </View>
          <View style={styles.itemStock}>
            <Text style={styles.stockText}>25</Text>
            <Text style={styles.itemSub}>PCS</Text>
          </View>
        </View>

        <View style={[styles.itemCard, {borderLeftWidth: 5, borderLeftColor: '#E53935'}]}>
          <View>
            <Text style={styles.itemName}>Susu UHT 1L</Text>
            <Text style={[styles.itemSub, {color:'#E53935'}]}>Low Stock Alert</Text>
          </View>
          <View style={styles.itemStock}>
            <Text style={[styles.stockText, {color:'#E53935'}]}>04</Text>
            <Text style={styles.itemSub}>PCS</Text>
          </View>
        </View>
      </ScrollView>

      {/* BOTTOM NAV */}
      <View style={styles.bottomNav}>
        <TouchableOpacity><Ionicons name="grid" size={24} color="#FFCC00" /></TouchableOpacity>
        <TouchableOpacity><Ionicons name="download-outline" size={24} color="#888" /></TouchableOpacity>
        
        <TouchableOpacity style={styles.fab}>
          <Ionicons name="add" size={32} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity><Ionicons name="share-outline" size={24} color="#888" /></TouchableOpacity>
        
        {user.role === 'owner' ? (
          <TouchableOpacity><Ionicons name="time-outline" size={24} color="#888" /></TouchableOpacity>
        ) : (
          <TouchableOpacity><Ionicons name="person-outline" size={24} color="#888" /></TouchableOpacity>
        )}
      </View>
    </View>
  );
}