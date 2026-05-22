import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFC' },
  
  // HEADER DENGAN Z-INDEX UNTUK DROPDOWN
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start',
    paddingHorizontal: 20, paddingTop: 50, paddingBottom: 10,
    backgroundColor: '#FAFAFC', zIndex: 50, // Penting agar dropdown tidak tertutup list di bawahnya
  },
  headerLeft: { flex: 1 },
  headerTitle: { fontSize: 20, fontWeight: '900', color: '#1A1A1A' },
  subTitle: { fontSize: 14, color: '#777', marginTop: 4 },

  // DROPDOWN CABANG DI HEADER
  branchSelector: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#E5E5EA',
    paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, marginTop: 5,
  },
  branchText: { fontSize: 13, fontWeight: 'bold', color: '#333', marginRight: 5 },
  dropdownListHeader: {
    position: 'absolute', top: 45, right: 20, backgroundColor: '#FFFFFF',
    borderRadius: 8, borderWidth: 1, borderColor: '#EAEAEA',
    elevation: 5, width: 120, zIndex: 1000,
  },
  dropdownItemHeader: {
    paddingHorizontal: 15, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: '#F5F5F5',
  },

  // CATEGORY TABS
  categoryScroll: { paddingHorizontal: 20, paddingBottom: 15, marginTop: 5 },
  btnCategoryActive: {
    backgroundColor: '#6D4C41', 
    paddingHorizontal: 20, paddingVertical: 10,
    borderRadius: 20, marginRight: 10, height: 40, justifyContent: 'center'
  },
  btnCategoryInactive: {
    backgroundColor: '#E5E5EA',
    paddingHorizontal: 20, paddingVertical: 10,
    borderRadius: 20, marginRight: 10, height: 40, justifyContent: 'center'
  },
  txtCategoryActive: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
  txtCategoryInactive: { color: '#555', fontWeight: 'bold', fontSize: 14 },

  // SEARCH BAR
  searchContainer: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#EFEFF4', borderRadius: 12,
    marginHorizontal: 20, marginBottom: 15, paddingHorizontal: 15, height: 45,
  },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 15, color: '#333' },

  // ITEM LIST
  listContent: { paddingHorizontal: 20, paddingBottom: 120 }, 
  itemCard: {
    flexDirection: 'row', backgroundColor: '#FFFFFF',
    borderRadius: 12, padding: 15, marginBottom: 15,
    alignItems: 'center', elevation: 1, borderWidth: 1, borderColor: '#F0F0F0',
  },
  iconBox: {
    width: 60, height: 60, borderRadius: 10,
    backgroundColor: '#FFF3E0', justifyContent: 'center', alignItems: 'center',
    marginRight: 15,
  },
  itemInfo: { flex: 1, justifyContent: 'center' },
  itemName: { fontSize: 16, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 4 },
  itemStock: { fontSize: 13, color: '#777' },
  
  // COUNTER (MINUS & PLUS)
  counterContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  btnMinus: {
    width: 32, height: 32, backgroundColor: '#FFF',
    borderWidth: 1, borderColor: '#DDD', borderRadius: 8,
    justifyContent: 'center', alignItems: 'center'
  },
  btnPlus: {
    width: 32, height: 32, backgroundColor: '#E53935', 
    borderRadius: 8, justifyContent: 'center', alignItems: 'center'
  },
  counterText: { width: 30, textAlign: 'center', fontSize: 16, fontWeight: 'bold', color: '#333' },

  // STICKY FOOTER
  footer: {
    position: 'absolute', bottom: 0, width: width,
    flexDirection: 'row', backgroundColor: '#FFFFFF',
    paddingHorizontal: 20, paddingVertical: 15,
    borderTopWidth: 1, borderTopColor: '#EAEAEA',
    alignItems: 'center', justifyContent: 'space-between',
    elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: -3 }, shadowOpacity: 0.1, shadowRadius: 5,
  },
  footerTextContainer: { flex: 1 },
  footerTotalLabel: { fontSize: 12, color: '#888', fontWeight: 'bold', letterSpacing: 1 },
  footerTotalItems: { fontSize: 16, color: '#E53935', fontWeight: 'bold', marginTop: 2 },
  
  // PERUBAHAN: Tombol Kuning Meteora
  btnSubmit: {
    backgroundColor: '#FFCC00', 
    flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 10,
    alignItems: 'center', elevation: 2,
  },
  btnSubmitDisabled: { backgroundColor: '#FFE57F', elevation: 0 },
  btnSubmitText: { fontSize: 15, fontWeight: 'bold', color: '#1A1A1A', marginLeft: 8 }, // Teks Hitam agar kontras
});