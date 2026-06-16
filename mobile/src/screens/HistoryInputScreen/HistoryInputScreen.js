import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import XLSX from 'xlsx';
import { styles } from './HistoryInputStyles';

export default function HistoryInputScreen({ navigation, route }) {
    const user = route?.params?.user;

    const [selectedCabang, setSelectedCabang] = useState('Meteora 1');
    const [showDropdown, setShowDropdown] = useState(false);

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    // --- LOGIKA DATE PICKER ---
    const [dateFromObj, setDateFromObj] = useState(new Date());
    const [dateToObj, setDateToObj] = useState(new Date());
    const [showPickerFrom, setShowPickerFrom] = useState(false);
    const [showPickerTo, setShowPickerTo] = useState(false);

    // Fungsi merubah format Date() ke YYYY-MM-DD untuk API MySQL
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
    // -------------------------

    const fetchHistoryInput = async () => {
        setLoading(true);
        try {
            const url = `https://warkop.sikitom.my.id/api/inventory/history?jenis_transaksi=Masuk&cabang=${selectedCabang}&startDate=${startDate}&endDate=${endDate}`;

            const response = await fetch(url);
            const result = await response.json();

            if (response.ok) {
                setData(result.data);
            } else {
                Alert.alert('Error', result.message || 'Gagal mengambil data');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Terjadi kesalahan jaringan.');
        } finally {
            setLoading(false);
        }
    };

   const handleDownload = async () => {
    if (data.length === 0) {
      Alert.alert('Info', 'Tidak ada data untuk diekspor. Silakan tampilkan data terlebih dahulu.');
      return;
    }

    try {
      // 1. Merapikan data dari JSON MySQL ke format Kolom Excel
      const excelData = data.map((item, index) => ({
        'No': index + 1,
        'Nama Barang': item.nama_barang,
        'Kategori': item.kategori || 'COFFEE',
        'Qty Masuk': item.jumlah,
        'PIC': item.pic,
        'Tanggal Input': new Date(item.tanggal).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }),
        'Waktu': new Date(item.tanggal).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      }));

      // 2. Membuat Worksheet dan Workbook Excel
      const worksheet = XLSX.utils.json_to_sheet(excelData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Riwayat Input");

      // 3. Konversi file ke format Base64
      const wbout = XLSX.write(workbook, { type: 'base64', bookType: 'xlsx' });
      const fileName = `History_Input_${selectedCabang.replace(' ', '_')}_${startDate}`;

      // 4. JURUS SIMPAN LANGSUNG MENGGUNAKAN STORAGE ACCESS FRAMEWORK (SAF)
      // Meminta user memilih folder tujuan (hanya muncul di Android)
      const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      
      if (permissions.granted) {
        const directoryUri = permissions.directoryUri;
        
        // Buat file kosong baru di folder pilihan user tersebut
        const fileUri = await FileSystem.StorageAccessFramework.createFileAsync(
          directoryUri,
          fileName,
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );

        // Tulis data Excel base64 langsung ke dalam file kosong tersebut
        await FileSystem.StorageAccessFramework.writeAsStringAsync(fileUri, wbout, {
          encoding: 'base64'
        });

        Alert.alert('Sukses Simpan', `File laporan berhasil disimpan langsung ke folder pilihan Anda!`);
      } else {
        // FALLBACK: Jika user menolak izin folder, lempar ke menu Share biasa (Aman)
        const fallbackUri = FileSystem.cacheDirectory + `${fileName}.xlsx`;
        await FileSystem.writeAsStringAsync(fallbackUri, wbout, { encoding: 'base64' });
        await Sharing.shareAsync(fallbackUri);
      }

    } catch (error) {
      console.error("Error Export Excel: ", error);
      Alert.alert('Error', 'Gagal mengekspor data ke format Excel.');
    }
  };

    return (
        <View style={styles.container}>

            {/* HEADER FULLSCREEN DENGAN DROPDOWN CABANG */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Riwayat Input</Text>
                </View>

                <TouchableOpacity
                    style={styles.branchSelector}
                    onPress={() => setShowDropdown(!showDropdown)}
                >
                    <Text style={styles.branchText}>{selectedCabang}</Text>
                    <Ionicons name={showDropdown ? "chevron-up" : "chevron-down"} size={16} color="#333" />
                </TouchableOpacity>
            </View>

            {/* DROPDOWN MENU */}
            {showDropdown && (
                <View style={styles.dropdownList}>
                    {['Meteora 1', 'Meteora 2'].map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.dropdownItem}
                            onPress={() => {
                                setSelectedCabang(item);
                                setShowDropdown(false);
                            }}
                        >
                            <Text style={styles.branchText}>{item}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}

            {/* FILTER TANGGAL & ACTION BUTTON */}
            <View style={styles.filterSection}>
                <View style={styles.dateRow}>
                    <View style={styles.dateBox}>
                        <Text style={styles.dateLabel}>Tanggal Dari</Text>
                        <TouchableOpacity style={styles.dateInput} onPress={() => setShowPickerFrom(true)}>
                            <Text style={styles.dateText}>{startDate}</Text>
                            <Ionicons name="calendar-outline" size={16} color="#888" />
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.dateBox, { marginRight: 0 }]}>
                        <Text style={styles.dateLabel}>Tanggal Sampai</Text>
                        <TouchableOpacity style={styles.dateInput} onPress={() => setShowPickerTo(true)}>
                            <Text style={styles.dateText}>{endDate}</Text>
                            <Ionicons name="calendar-outline" size={16} color="#888" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* MODAL DATE PICKER NATIVE */}
                {showPickerFrom && (
                    <DateTimePicker
                        value={dateFromObj}
                        mode="date"
                        display="default"
                        onChange={onChangeFrom}
                    />
                )}
                {showPickerTo && (
                    <DateTimePicker
                        value={dateToObj}
                        mode="date"
                        display="default"
                        onChange={onChangeTo}
                    />
                )}

                <View style={styles.actionRow}>
                    <TouchableOpacity style={styles.btnShow} onPress={fetchHistoryInput}>
                        <Ionicons name="search" size={18} color="#1A1A1A" />
                        <Text style={styles.btnTextBlack}>Show</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnDownload} onPress={handleDownload}>
                        <Ionicons name="download-outline" size={18} color="#FFF" />
                        <Text style={styles.btnTextWhite}>Download</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* TABEL DATA */}
            <View style={styles.tableContainer}>
                <View style={styles.tableHeader}>
                    <Text style={styles.colNo}>No</Text>
                    <Text style={styles.colName}>Nama Barang</Text>
                    <Text style={styles.colQty}>Jumlah</Text>
                    <Text style={styles.colPic}>PIC</Text>
                    <Text style={styles.colDate}>Tgl Input</Text>
                </View>

                {loading ? (
                    <ActivityIndicator size="large" color="#FFCC00" style={{ marginTop: 50 }} />
                ) : (
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {data.length === 0 ? (
                            <Text style={{ textAlign: 'center', marginTop: 30, color: '#888' }}>
                                Tidak ada data. Silakan sesuaikan tanggal dan tekan "Show".
                            </Text>
                        ) : (
                            data.map((item, index) => (
                                <View key={item.id_transaksi.toString()} style={styles.row}>
                                    <Text style={styles.cellNo}>{String(index + 1).padStart(2, '0')}</Text>
                                    <Text style={styles.cellName}>{item.nama_barang}</Text>
                                    <Text style={[styles.cellQty, { color: '#2E7D32' }]}>+ {item.jumlah}</Text>
                                    <Text style={styles.cellPic}>{item.pic.split(' ')[0]}</Text>
                                    <Text style={styles.cellDate}>
                                        {new Date(item.tanggal).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })}
                                    </Text>
                                </View>
                            ))
                        )}
                        <View style={{ height: 20 }} />
                    </ScrollView>
                )}
            </View>

            {/* PAGINATION FOOTER */}
            {/* <View style={styles.pagination}>
                <TouchableOpacity style={styles.pageBtnActive}>
                    <Text style={styles.pageTxtActive}>1</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.pageBtnInactive}>
                    <Text style={styles.pageTxtInactive}>2</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.pageBtnInactive}>
                    <Text style={styles.pageTxtInactive}>3</Text>
                </TouchableOpacity>
                <Ionicons name="ellipsis-horizontal" size={16} color="#888" style={{ marginHorizontal: 5 }} />
                <TouchableOpacity style={styles.pageBtnInactive}>
                    <Ionicons name="chevron-forward" size={16} color="#888" />
                </TouchableOpacity>
            </View> */}

        </View>
    );
}