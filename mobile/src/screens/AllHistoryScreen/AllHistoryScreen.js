import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import XLSX from 'xlsx';
import { styles } from './AllHistoryStyles';

export default function AllHistoryScreen({ navigation, route }) {
  const user = route?.params?.user;
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [dateFromObj, setDateFromObj] = useState(new Date());
  const [dateToObj, setDateToObj] = useState(new Date());
  const [showPickerFrom, setShowPickerFrom] = useState(false);
  const [showPickerTo, setShowPickerTo] = useState(false);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [startDate, setStartDate] = useState(formatDate(new Date()));
  const [endDate, setEndDate] = useState(formatDate(new Date()));

  const onChangeFrom = (event, selectedDate) => {
    setShowPickerFrom(Platform.OS === 'ios'); 
    if (selectedDate) {
      setDateFromObj(selectedDate);
      setStartDate(formatDate(selectedDate));
    }
  };

  const onChangeTo = (event, selectedDate) => {
    setShowPickerTo(Platform.OS === 'ios');
    if (selectedDate) {
      setDateToObj(selectedDate);
      setEndDate(formatDate(selectedDate));
    }
  };

  // FETCH SEMUA DATA (Tanpa Filter Cabang & Jenis)
  const fetchAllHistory = async () => {
    setLoading(true);
    try {
      // Endpoint yang sama, tapi parameter cabang & jenis_transaksi dikosongkan agar terbaca 'Semua'
      const url = `https://warkop.sikitom.my.id/api/inventory/history?startDate=${startDate}&endDate=${endDate}`;
      const response = await fetch(url);
      const result = await response.json();
      
      if (response.ok) {
        setData(result.data);
      }
    } catch (error) {
      Alert.alert('Error', 'Terjadi kesalahan jaringan.');
    } finally {
      setLoading(false);
    }
  };

  // MENGHITUNG SUMMARY CARDS SECARA OTOMATIS
  const totalInputCount = data.filter(item => item.jenis_transaksi?.toLowerCase() === 'masuk').length;
  const totalOutputCount = data.filter(item => item.jenis_transaksi?.toLowerCase() === 'keluar').length;

  const handleDownload = async () => {
    if (data.length === 0) {
      Alert.alert('Info', 'Tidak ada data untuk diekspor. Silakan tampilkan data terlebih dahulu.');
      return;
    }

    try {
      const excelData = data.map((item, index) => ({
        'No': index + 1,
        'Nama Barang': item.nama_barang,
        'Kategori': item.jenis_transaksi, // Masuk / Keluar
        'Qty': item.jumlah,
        'Tanggal Masuk': item.jenis_transaksi?.toLowerCase() === 'masuk' ? new Date(item.tanggal).toLocaleDateString('id-ID') : '-',
        'Tanggal Keluar': item.jenis_transaksi?.toLowerCase() === 'keluar' ? new Date(item.tanggal).toLocaleDateString('id-ID') : '-',
        'Cabang': item.cabang,
        'PIC': item.pic
      }));

      const worksheet = XLSX.utils.json_to_sheet(excelData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Semua Riwayat");

      const wbout = XLSX.write(workbook, { type: 'base64', bookType: 'xlsx' });
      const fileName = `Semua_Riwayat_${startDate}`;

      const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      
      if (permissions.granted) {
        const directoryUri = permissions.directoryUri;
        const fileUri = await FileSystem.StorageAccessFramework.createFileAsync(
          directoryUri,
          fileName,
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );

        await FileSystem.StorageAccessFramework.writeAsStringAsync(fileUri, wbout, { encoding: 'base64' });
        Alert.alert('Sukses Simpan', `Laporan Semua Riwayat berhasil disimpan langsung ke HP Anda!`);
      } else {
        const fallbackUri = FileSystem.cacheDirectory + `${fileName}.xlsx`;
        await FileSystem.writeAsStringAsync(fallbackUri, wbout, { encoding: 'base64' });
        await Sharing.shareAsync(fallbackUri);
      }

    } catch (error) {
      console.error("Error Export Excel: ", error);
      Alert.alert('Error', 'Gagal mengekspor data.');
    }
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All History</Text>
      </View>

      <View style={styles.filterSection}>
        <View style={styles.dateBox}>
          <Text style={styles.dateLabel}>Date From</Text>
          <TouchableOpacity style={styles.dateInput} onPress={() => setShowPickerFrom(true)}>
            <Text style={styles.dateText}>{startDate}</Text>
            <Ionicons name="calendar-outline" size={16} color="#888" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.dateBox}>
          <Text style={styles.dateLabel}>Date To</Text>
          <TouchableOpacity style={styles.dateInput} onPress={() => setShowPickerTo(true)}>
            <Text style={styles.dateText}>{endDate}</Text>
            <Ionicons name="calendar-outline" size={16} color="#888" />
          </TouchableOpacity>
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.btnShow} onPress={fetchAllHistory}>
            <Ionicons name="search" size={18} color="#1A1A1A" />
            <Text style={styles.btnTextBlack}>Show Data</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnDownload} onPress={handleDownload}>
            <Ionicons name="download-outline" size={18} color="#FFF" />
            <Text style={styles.btnTextWhite}>Download .xlsx</Text>
          </TouchableOpacity>
        </View>
      </View>

      {showPickerFrom && <DateTimePicker value={dateFromObj} mode="date" display="default" onChange={onChangeFrom} />}
      {showPickerTo && <DateTimePicker value={dateToObj} mode="date" display="default" onChange={onChangeTo} />}

      {/* SUMMARY CARDS */}
      <View style={styles.summaryContainer}>
        <View style={[styles.summaryCard, { backgroundColor: '#FFF9E6', borderColor: '#FDE49B' }]}>
          <View style={[styles.summaryIconBox, { backgroundColor: '#FFCC00' }]}>
            <Ionicons name="add" size={24} color="#1A1A1A" />
          </View>
          <View>
            <Text style={styles.summaryTitle}>Total Input</Text>
            <Text style={styles.summaryValue}>{totalInputCount} Items</Text>
          </View>
        </View>
        
        <View style={[styles.summaryCard, { backgroundColor: '#FFF5F5', borderColor: '#FAD4D4' }]}>
          <View style={[styles.summaryIconBox, { backgroundColor: '#FFCDD2' }]}>
            <Ionicons name="remove" size={24} color="#C62828" />
          </View>
          <View>
            <Text style={styles.summaryTitle}>Total Output</Text>
            <Text style={styles.summaryValue}>{totalOutputCount} Items</Text>
          </View>
        </View>
      </View>

      {/* TABLE VIEW DENGAN HORIZONTAL SCROLL */}
      <View style={styles.tableOuterContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#6D4C41" style={{ marginTop: 50 }} />
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={true}>
            <View style={styles.tableInner}>
              <View style={styles.tableHeader}>
                <Text style={styles.colNo}>No</Text>
                <Text style={styles.colName}>Item Name</Text>
                <Text style={styles.colQty}>Qty</Text>
                <Text style={styles.colDate}>Date In</Text>
                <Text style={styles.colDate}>Date Out</Text>
                <Text style={styles.colCat}>Category</Text>
                <Text style={styles.colPic}>PIC</Text>
              </View>

              <ScrollView showsVerticalScrollIndicator={true}>
                {data.length === 0 ? (
                  <Text style={{ textAlign: 'center', marginTop: 40, color: '#888' }}>Data belum tersedia.</Text>
                ) : (
                  data.map((item, index) => {
                    const isMasuk = item.jenis_transaksi?.toLowerCase() === 'masuk';
                    const formatTgl = new Date(item.tanggal).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
                    const formatJam = new Date(item.tanggal).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

                    return (
                      <View key={item.id_transaksi.toString()} style={styles.row}>
                        <Text style={styles.cellNo}>{String(index + 1).padStart(2, '0')}</Text>
                        <Text style={styles.cellName} numberOfLines={2}>{item.nama_barang}</Text>
                        
                        <Text style={[styles.cellQty, { color: isMasuk ? '#2E7D32' : '#D32F2F' }]}>
                          {isMasuk ? `+ ${item.jumlah}` : `- ${item.jumlah}`}
                        </Text>
                        
                        {/* Kolom Date In */}
                        <Text style={isMasuk ? styles.cellDate : styles.cellDateEmpty}>
                          {isMasuk ? `${formatTgl}\n${formatJam}` : '-'}
                        </Text>
                        
                        {/* Kolom Date Out */}
                        <Text style={!isMasuk ? styles.cellDate : styles.cellDateEmpty}>
                          {!isMasuk ? `${formatTgl}\n${formatJam}` : '-'}
                        </Text>

                        {/* Kolom Category (Badge Input/Output) */}
                        <View style={styles.cellCatWrapper}>
                          <View style={[styles.badgeStatus, { backgroundColor: isMasuk ? '#FFF59D' : '#FFCDD2' }]}>
                            <Text style={[styles.badgeStatusText, { color: isMasuk ? '#F57F17' : '#C62828' }]}>
                              {isMasuk ? 'Input' : 'Output'}
                            </Text>
                          </View>
                        </View>

                        <Text style={styles.cellPic}>{item.pic}</Text>
                      </View>
                    );
                  })
                )}
                {/* Space bottom for smooth scrolling */}
                <View style={{ height: 100 }} />
              </ScrollView>
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
}