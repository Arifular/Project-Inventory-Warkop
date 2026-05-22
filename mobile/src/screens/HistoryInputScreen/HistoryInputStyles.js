import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFC' },
  
  // HEADER FULLSCREEN & DROPDOWN CABANG
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingTop: 50, paddingBottom: 15,
    backgroundColor: '#FFF', borderBottomWidth: 1, borderBottomColor: '#EAEAEA',
    zIndex: 50,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '900', color: '#1A1A1A', marginLeft: 15 },
  
  branchSelector: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0F0F0',
    paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8,
  },
  branchText: { fontSize: 13, fontWeight: 'bold', color: '#333', marginRight: 5 },
  dropdownList: {
    position: 'absolute', top: 90, right: 20, backgroundColor: '#FFFFFF',
    borderRadius: 8, borderWidth: 1, borderColor: '#EAEAEA',
    elevation: 5, width: 120, zIndex: 1000,
  },
  dropdownItem: {
    paddingHorizontal: 15, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F5F5F5',
  },

  // FILTER SECTION
  filterSection: { padding: 20, backgroundColor: '#FFF', zIndex: 10 },
  dateRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  dateBox: { flex: 1, marginRight: 10 },
  dateLabel: { fontSize: 12, fontWeight: 'bold', color: '#777', marginBottom: 5 },
  dateInput: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: '#F9F9F9', borderWidth: 1, borderColor: '#EAEAEA',
    borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10,
  },
  dateText: { fontSize: 13, color: '#333' },

  // TOMBOL SHOW & DOWNLOAD (BERDAMPINGAN)
  actionRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 10 },
  btnShow: {
    flex: 1, backgroundColor: '#FFCC00', flexDirection: 'row',
    justifyContent: 'center', alignItems: 'center',
    paddingVertical: 12, borderRadius: 8, elevation: 1,
  },
  btnDownload: {
    flex: 1, backgroundColor: '#2E7D32', flexDirection: 'row', // Hijau yang serasi
    justifyContent: 'center', alignItems: 'center',
    paddingVertical: 12, borderRadius: 8, elevation: 1,
  },
  btnTextBlack: { fontSize: 14, fontWeight: 'bold', color: '#1A1A1A', marginLeft: 8 },
  btnTextWhite: { fontSize: 14, fontWeight: 'bold', color: '#FFF', marginLeft: 8 },

  // AREA TABEL
  tableContainer: { flex: 1, backgroundColor: '#FFF', marginTop: 10, paddingHorizontal: 15, paddingTop: 10 },
  tableHeader: {
    flexDirection: 'row', backgroundColor: '#F0F0F0',
    paddingVertical: 12, borderRadius: 8, marginBottom: 5,
  },
  colNo: { width: '10%', textAlign: 'center', fontSize: 12, fontWeight: 'bold', color: '#333' },
  colName: { width: '35%', textAlign: 'left', fontSize: 12, fontWeight: 'bold', color: '#333' },
  colQty: { width: '15%', textAlign: 'center', fontSize: 12, fontWeight: 'bold', color: '#333' },
  colPic: { width: '20%', textAlign: 'center', fontSize: 12, fontWeight: 'bold', color: '#333' },
  colDate: { width: '20%', textAlign: 'center', fontSize: 12, fontWeight: 'bold', color: '#333' },

  row: {
    flexDirection: 'row', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#F5F5F5', alignItems: 'center',
  },
  cellNo: { width: '10%', textAlign: 'center', fontSize: 12, color: '#555' },
  cellName: { width: '35%', textAlign: 'left', fontSize: 12, fontWeight: '700', color: '#1A1A1A' },
  cellQty: { width: '15%', textAlign: 'center', fontSize: 12, fontWeight: 'bold', color: '#E53935' }, // Merah untuk qty
  cellPic: { width: '20%', textAlign: 'center', fontSize: 12, color: '#555' },
  cellDate: { width: '20%', textAlign: 'center', fontSize: 11, color: '#888' },

  // PAGINATION
  // pagination: {
  //   flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
  //   paddingVertical: 20, backgroundColor: '#FFF', gap: 10, borderTopWidth: 1, borderTopColor: '#EAEAEA'
  // },
  // pageBtnActive: { width: 32, height: 32, borderRadius: 8, backgroundColor: '#1A1A1A', justifyContent: 'center', alignItems: 'center' },
  // pageBtnInactive: { width: 32, height: 32, borderRadius: 8, backgroundColor: '#F0F0F0', justifyContent: 'center', alignItems: 'center' },
  // pageTxtActive: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
  // pageTxtInactive: { color: '#888', fontWeight: 'bold', fontSize: 14 },
});