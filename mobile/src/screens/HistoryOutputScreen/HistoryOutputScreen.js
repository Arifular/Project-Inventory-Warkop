import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import XLSX from 'xlsx';
import { styles } from './HistoryOutputStyles';

export default function HistoryOutputScreen({ navigation, route }) {
  const user = route?.params?.user;

  const [selectedCabang, setSelectedCabang] = useState('Meteora 1');
  const [showDropdown, setShowDropdown] = useState(false);
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

  // FETCH DATA UNTUK OUTPUT (BARANG KELUAR)
  const fetchHistoryOutput = async () => {
    setLoading(true);
    try {
      // Perhatikan parameter jenis_transaksi=Keluar
      const url = `http://192.168.1.22:3000/api/inventory/history?jenis_transaksi=Keluar&cabang=${selectedCabang}&startDate=${startDate}&endDate=${endDate}`;
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

  // FITUR DOWNLOAD EXCEL MENGGUNAKAN SAF
  const handleDownload = async () => {
    if (data.length === 0) {
      Alert.alert('Info', 'Tidak ada data untuk diekspor. Silakan tampilkan data terlebih dahulu.');
      return;
    }

    try {
      const excelData = data.map((item, index) => ({
        'No': index + 1,
        'Nama Barang': item.nama_barang,
        'Kategori': item.kategori || 'COFFEE',
        'Qty Keluar': item.jumlah, // Disesuaikan untuk Output
        'PIC': item.pic,
        'Tanggal Output': new Date(item.tanggal).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }),
        'Waktu': new Date(item.tanggal).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      }));

      const worksheet = XLSX.utils.json_to_sheet(excelData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Riwayat Output");

      const wbout = XLSX.write(workbook, { type: 'base64', bookType: 'xlsx' });
      // Nama file disesuaikan menjadi History_Output
      const fileName = `History_Output_${selectedCabang.replace(' ', '_')}_${startDate}`;

      const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

      if (permissions.granted) {
        const directoryUri = permissions.directoryUri;
        const fileUri = await FileSystem.StorageAccessFramework.createFileAsync(
          directoryUri,
          fileName,
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );

        await FileSystem.StorageAccessFramework.writeAsStringAsync(fileUri, wbout, {
          encoding: 'base64'
        });

        Alert.alert('Sukses Simpan', `File laporan Output berhasil disimpan langsung ke folder pilihan Anda!`);
      } else {
        const fallbackUri = FileSystem.cacheDirectory + `${fileName}.xlsx`;
        await FileSystem.writeAsStringAsync(fallbackUri, wbout, { encoding: 'base64' });
        await Sharing.shareAsync(fallbackUri);
      }

    } catch (error) {
      console.error("Error Export Excel: ", error);
      Alert.alert('Error', 'Gagal mengekspor data ke format Excel.');
    }
  };

  const getBadgeColor = (cat) => {
    switch (cat?.toLowerCase()) {
      case 'minuman': return { bg: '#E3F2FD', txt: '#1565C0' };
      case 'snack': return { bg: '#FFF3E0', txt: '#E65100' };
      case 'bahan baku': return { bg: '#E8F5E9', txt: '#2E7D32' };
      default: return { bg: '#FFEBEE', txt: '#C62828' };
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>History Output</Text>
        </View>

        <TouchableOpacity style={styles.branchSelector} onPress={() => setShowDropdown(!showDropdown)}>
          <Text style={styles.branchText}>{selectedCabang}</Text>
          <Ionicons name={showDropdown ? "chevron-up" : "chevron-down"} size={16} color="#333" />
        </TouchableOpacity>
      </View>

      {showDropdown && (
        <View style={styles.dropdownList}>
          {['Meteora 1', 'Meteora 2'].map((item, index) => (
            <TouchableOpacity key={index} style={styles.dropdownItem} onPress={() => { setSelectedCabang(item); setShowDropdown(false); }}>
              <Text style={styles.branchText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

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

        <TouchableOpacity style={styles.btnDownload} onPress={handleDownload}>
          <Ionicons name="download-outline" size={18} color="#1A1A1A" />
          <Text style={styles.btnTextBlack}>Download .xlsx</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnShow} onPress={fetchHistoryOutput}>
          <Ionicons name="search" size={18} color="#FFF" />
          <Text style={styles.btnTextWhite}>Show Data</Text>
        </TouchableOpacity>
      </View>

      {showPickerFrom && <DateTimePicker value={dateFromObj} mode="date" display="default" onChange={onChangeFrom} />}
      {showPickerTo && <DateTimePicker value={dateToObj} mode="date" display="default" onChange={onChangeTo} />}

      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.colNo}>No</Text>
          <Text style={styles.colName}>Item Name</Text>
          <Text style={styles.colQty}>Qty</Text>
          <Text style={styles.colPic}>PIC</Text>
          <Text style={styles.colDate}>Tanggal Output</Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#6D4C41" style={{ marginTop: 50 }} />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {data.length === 0 ? (
              <Text style={{ textAlign: 'center', marginTop: 40, color: '#888' }}>Tidak ada data riwayat output.</Text>
            ) : (
              data.map((item, index) => {
                const badgeStyle = getBadgeColor(item.kategori);
                return (
                  <View key={item.id_transaksi.toString()} style={styles.row}>
                    <Text style={styles.cellNo}>{String(index + 1).padStart(2, '0')}</Text>

                    <View style={styles.cellNameWrapper}>
                      <Text style={styles.cellName}>{item.nama_barang}</Text>
                      <View style={[styles.badgeCategory, { backgroundColor: badgeStyle.bg }]}>
                        <Text style={[styles.badgeText, { color: badgeStyle.txt }]}>{item.kategori || 'COFFEE'}</Text>
                      </View>
                    </View>

                    {/* PERUBAHAN: Tanda minus dan warna merah untuk barang keluar */}
                    <Text style={[styles.cellQty, { color: '#D32F2F' }]}>- {item.jumlah}</Text>
                    <Text style={styles.cellPic}>{item.pic.split(' ')[0]}</Text>

                    <Text style={styles.cellDate}>
                      {new Date(item.tanggal).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}{'\n'}• {new Date(item.tanggal).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                    </Text>
                  </View>
                );
              })
            )}
          </ScrollView>
        )}

        {/* <View style={styles.pagination}>
          <Text style={styles.paginationLeft}>Showing {data.length} records</Text>
          <View style={styles.paginationRight}>
            <TouchableOpacity style={styles.pageBtnActive}><Text style={styles.pageTxtActive}>1</Text></TouchableOpacity>
            <TouchableOpacity style={styles.pageBtnInactive}><Text style={styles.pageTxtInactive}>2</Text></TouchableOpacity>
            <TouchableOpacity style={styles.pageBtnInactive}><Text style={styles.pageTxtInactive}>3</Text></TouchableOpacity>
            <Text style={{ color: '#888' }}>...</Text>
            <TouchableOpacity style={styles.pageBtnInactive}><Text style={styles.pageTxtInactive}>32</Text></TouchableOpacity>
          </View>
        </View> */}

      </View>
    </View>
  );
}