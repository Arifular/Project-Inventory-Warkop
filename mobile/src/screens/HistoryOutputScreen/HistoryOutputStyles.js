import { StyleSheet, Dimensions } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  
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

  btnDownload: {
    backgroundColor: '#FFCC00', flexDirection: 'row',
    justifyContent: 'center', alignItems: 'center',
    paddingVertical: 14, borderRadius: 10, marginTop: 5,
  },
  btnShow: {
    backgroundColor: '#6D4C41', flexDirection: 'row',
    justifyContent: 'center', alignItems: 'center',
    paddingVertical: 14, borderRadius: 10, marginTop: 10,
  },
  btnTextBlack: { fontSize: 15, fontWeight: 'bold', color: '#1A1A1A', marginLeft: 8 },
  btnTextWhite: { fontSize: 15, fontWeight: 'bold', color: '#FFF', marginLeft: 8 },

  tableContainer: { flex: 1, backgroundColor: '#FFF', marginHorizontal: 20, borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: '#EAEAEA' },
  tableHeader: {
    flexDirection: 'row', backgroundColor: '#F5F2F0', paddingVertical: 15,
  },
  colNo: { width: '12%', textAlign: 'center', fontSize: 13, fontWeight: 'bold', color: '#555' },
  colName: { width: '38%', textAlign: 'left', fontSize: 13, fontWeight: 'bold', color: '#555', paddingLeft: 10 },
  colQty: { width: '15%', textAlign: 'center', fontSize: 13, fontWeight: 'bold', color: '#555' },
  colPic: { width: '15%', textAlign: 'center', fontSize: 13, fontWeight: 'bold', color: '#555' },
  colDate: { width: '20%', textAlign: 'center', fontSize: 13, fontWeight: 'bold', color: '#555' },

  row: {
    flexDirection: 'row', paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: '#F5F5F5', alignItems: 'center',
  },
  cellNo: { width: '12%', textAlign: 'center', fontSize: 14, color: '#444' },
  cellNameWrapper: { width: '38%', paddingLeft: 10 },
  cellName: { fontSize: 14, fontWeight: '600', color: '#2B2B2B', lineHeight: 18 },
  
  badgeCategory: {
    alignSelf: 'flex-start', backgroundColor: '#FFEBEE', 
    paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, marginTop: 5
  },
  badgeText: { fontSize: 9, fontWeight: 'bold', color: '#C62828', textTransform: 'uppercase' },

  cellQty: { width: '15%', textAlign: 'center', fontSize: 22, fontWeight: 'bold' }, 
  cellPic: { width: '15%', textAlign: 'center', fontSize: 13, color: '#444' },
  cellDate: { width: '20%', textAlign: 'center', fontSize: 11, color: '#777', lineHeight: 14 },

  // pagination: {
  //   flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  //   paddingVertical: 15, paddingHorizontal: 20, backgroundColor: '#F5F2F0',
  //   borderTopWidth: 1, borderTopColor: '#EAEAEA'
  // },
  // paginationLeft: { fontSize: 12, color: '#666' },
  // paginationRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  // pageBtnActive: { width: 32, height: 32, borderRadius: 6, backgroundColor: '#5D4037', justifyContent: 'center', alignItems: 'center' },
  // pageBtnInactive: { width: 32, height: 32, borderRadius: 6, backgroundColor: '#FFF', borderWidth: 1, borderColor: '#DDD', justifyContent: 'center', alignItems: 'center' },
  // pageTxtActive: { color: '#FFF', fontWeight: 'bold', fontSize: 12 },
  // pageTxtInactive: { color: '#555', fontSize: 12 },
});