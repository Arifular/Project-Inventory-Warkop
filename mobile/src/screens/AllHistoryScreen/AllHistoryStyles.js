import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFC' },
  
  header: {
    flexDirection: 'row', alignItems: 'center', 
    paddingHorizontal: 20, paddingTop: 50, paddingBottom: 15,
    backgroundColor: '#FFF', borderBottomWidth: 1, borderBottomColor: '#EAEAEA',
    zIndex: 50,
  },
  headerTitle: { fontSize: 18, fontWeight: '900', color: '#1A1A1A', marginLeft: 15 },
  
  // FILTER SECTION
  filterSection: { 
    margin: 20, padding: 20, backgroundColor: '#FFF', 
    borderRadius: 16, borderWidth: 1, borderColor: '#E6DFD9',
  },
  dateBox: { marginBottom: 15 },
  dateLabel: { fontSize: 12, fontWeight: 'bold', color: '#6D4C41', marginBottom: 6 },
  dateInput: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: '#F5F5F5', borderWidth: 1, borderColor: '#DDD',
    borderRadius: 10, paddingHorizontal: 15, paddingVertical: 12,
  },
  dateText: { fontSize: 14, color: '#333', fontWeight: '500' },

  actionRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 10, marginTop: 10 },
  btnShow: {
    flex: 1, backgroundColor: '#FFCC00', flexDirection: 'row',
    justifyContent: 'center', alignItems: 'center',
    paddingVertical: 14, borderRadius: 10,
  },
  btnDownload: {
    flex: 1, backgroundColor: '#2E7D32', flexDirection: 'row',
    justifyContent: 'center', alignItems: 'center',
    paddingVertical: 14, borderRadius: 10,
  },
  btnTextBlack: { fontSize: 14, fontWeight: 'bold', color: '#1A1A1A', marginLeft: 8 },
  btnTextWhite: { fontSize: 14, fontWeight: 'bold', color: '#FFF', marginLeft: 8 },

  // SUMMARY CARDS (Total Input & Output)
  summaryContainer: { flexDirection: 'row', paddingHorizontal: 20, gap: 15, marginBottom: 20 },
  summaryCard: { 
    flex: 1, flexDirection: 'row', alignItems: 'center', 
    padding: 15, borderRadius: 12, borderWidth: 1 
  },
  summaryIconBox: { 
    width: 40, height: 40, borderRadius: 20, 
    justifyContent: 'center', alignItems: 'center', marginRight: 12 
  },
  summaryTitle: { fontSize: 12, color: '#555', fontWeight: '600', marginBottom: 2 },
  summaryValue: { fontSize: 15, fontWeight: 'bold', color: '#1A1A1A' },

  // TABLE STYLES (Lebar tetap agar rapi saat di-scroll horizontal)
  tableOuterContainer: { flex: 1, backgroundColor: '#FFF', marginHorizontal: 20, borderRadius: 16, borderWidth: 1, borderColor: '#EAEAEA', overflow: 'hidden' },
  tableInner: { minWidth: 650 }, // MEMBUAT TABEL BISA DI-SCROLL HORIZONTAL
  tableHeader: { flexDirection: 'row', backgroundColor: '#F5F2F0', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#EAEAEA' },
  
  colNo: { width: 40, textAlign: 'center', fontSize: 13, fontWeight: 'bold', color: '#555' },
  colName: { width: 140, textAlign: 'left', fontSize: 13, fontWeight: 'bold', color: '#555', paddingLeft: 10 },
  colQty: { width: 80, textAlign: 'center', fontSize: 13, fontWeight: 'bold', color: '#555' },
  colDate: { width: 100, textAlign: 'center', fontSize: 13, fontWeight: 'bold', color: '#555' },
  colCat: { width: 90, textAlign: 'center', fontSize: 13, fontWeight: 'bold', color: '#555' },
  colPic: { width: 100, textAlign: 'center', fontSize: 13, fontWeight: 'bold', color: '#555' },

  row: { flexDirection: 'row', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#F5F5F5', alignItems: 'center' },
  
  cellNo: { width: 40, textAlign: 'center', fontSize: 13, color: '#444' },
  cellName: { width: 140, paddingLeft: 10, fontSize: 13, fontWeight: '600', color: '#2B2B2B' },
  cellQty: { width: 80, textAlign: 'center', fontSize: 15, fontWeight: 'bold', color: '#5D4037' },
  cellDate: { width: 100, textAlign: 'center', fontSize: 12, color: '#444' },
  cellDateEmpty: { width: 100, textAlign: 'center', fontSize: 12, color: '#CCC' },
  cellPic: { width: 100, textAlign: 'center', fontSize: 12, color: '#444' },
  
  cellCatWrapper: { width: 90, alignItems: 'center' },
  badgeStatus: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20 },
  badgeStatusText: { fontSize: 10, fontWeight: 'bold' },

  pagination: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 20, backgroundColor: '#F5F2F0', borderTopWidth: 1, borderTopColor: '#EAEAEA' },
  paginationLeft: { fontSize: 12, color: '#666' },
  paginationRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  pageBtnActive: { width: 32, height: 32, borderRadius: 6, backgroundColor: '#5D4037', justifyContent: 'center', alignItems: 'center' },
  pageBtnInactive: { width: 32, height: 32, borderRadius: 6, backgroundColor: '#FFF', borderWidth: 1, borderColor: '#DDD', justifyContent: 'center', alignItems: 'center' },
  pageTxtActive: { color: '#FFF', fontWeight: 'bold', fontSize: 12 },
  pageTxtInactive: { color: '#555', fontSize: 12 },
});