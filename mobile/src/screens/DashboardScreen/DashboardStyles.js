import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F6F3F2' },
  
  // --- HEADER STYLE ---
  header: { 
    backgroundColor: '#FFF', 
    paddingTop: 50, 
    paddingHorizontal: 20, 
    paddingBottom: 15, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#EAEAEA'
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  logoHeader: { width: 42, height: 42, borderRadius: 21, marginRight: 12 },
  headerTitleTop: { fontSize: 16, fontWeight: '900', color: '#1A1A1A', lineHeight: 18 },
  headerTitleBottom: { fontSize: 16, fontWeight: '900', color: '#1A1A1A', lineHeight: 18 },
  
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  
  pickerContainer: { 
    backgroundColor: '#F0F0F0', 
    borderRadius: 20, 
    paddingHorizontal: 14, 
    paddingVertical: 6,
    justifyContent: 'center' 
  },
  pickerText: { fontSize: 13, fontWeight: '700', color: '#333' },
  
  pickerContainerStaff: {
    backgroundColor: '#F0F0F0', 
    borderRadius: 20, 
    paddingHorizontal: 14, 
    paddingVertical: 6,
  },
  pickerTextStaff: { fontSize: 13, fontWeight: '700', color: '#333' },

  // --- TAMBAHAN STYLE UNTUK DROPDOWN OWNER ---
  dropdownMenu: {
    position: 'absolute',
    top: 40, 
    right: 0,
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingVertical: 5,
    width: 120,
    elevation: 5, 
    shadowColor: '#000', 
    shadowOpacity: 0.2, 
    shadowRadius: 5,
    zIndex: 1000, // Memastikan dropdown menimpa elemen di bawahnya
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  dropdownItemText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#333',
  },

  // --- MAIN CARD (YELLOW) ---
 mainCard: { 
    backgroundColor: '#FFCC00', margin: 20, borderRadius: 24, padding: 24,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    elevation: 2, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4,
    overflow: 'hidden' // Tambahan ini agar kardus tidak keluar dari lengkungan pinggir
  },
  cardLabel: { fontSize: 12, fontWeight: '700', color: '#7A6000', letterSpacing: 0.5 },
  cardValue: { fontSize: 36, fontWeight: 'bold', color: '#000', marginTop: 4 },
  cardItemsText: { fontSize: 16, fontWeight: '400' },
  cardSub: { fontSize: 13, color: '#000', marginTop: 12, fontWeight: '500' },

  boxIcon: { 
    width: 110, // Diperbesar (sebelumnya 70)
    height: 110, // Diperbesar
    opacity: 0.4, // Dibuat lebih jelas (sebelumnya 0.15)
    position: 'absolute', // Mengatur posisi agar menempel ke kanan
    right: -10,
    bottom: -15
  },
  
  // --- STOCK TILES ---
  tileRow: { flexDirection: 'row', paddingHorizontal: 20, justifyContent: 'space-between' },
  tile: { backgroundColor: '#FFF', width: '47%', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#EAEAEA' },
  tileLabel: { fontSize: 11, color: '#888', fontWeight: '700', letterSpacing: 0.5 },
  tileValueRed: { fontSize: 28, fontWeight: 'bold', color: '#E53935', marginTop: 4 }, 
  tileValueYellow: { fontSize: 28, fontWeight: 'bold', color: '#FFCC00', marginTop: 4 }, 
  
  // --- CATEGORY TABS ---
  categoryRow: { flexDirection: 'row', paddingHorizontal: 20, marginTop: 24, gap: 12 },
  btnCategoryActive: { flex: 1, backgroundColor: '#FFCC00', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  btnCategoryInactive: { flex: 1, backgroundColor: '#F0F0F0', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  txtCategoryActive: { fontWeight: '700', color: '#000', fontSize: 15 },
  txtCategoryInactive: { fontWeight: '700', color: '#888', fontSize: 15 },

  // --- LIST STOCK ---
  listHeader: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 28, marginBottom: 16, alignItems: 'center' },
  listTitle: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  seeAll: { color: '#B89400', fontWeight: '700', fontSize: 14 },
  
  itemCard: { 
    backgroundColor: '#FFF', marginHorizontal: 20, marginBottom: 12, 
    borderRadius: 16, padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    borderWidth: 1, borderColor: '#F0F0F0'
  },
  itemLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconPlaceholder: { width: 40, height: 40, backgroundColor: '#F5F5F5', borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  itemName: { fontSize: 15, fontWeight: '700', color: '#000' },
  itemSub: { fontSize: 12, color: '#888', marginTop: 2 },
  itemStock: { alignItems: 'center' },
  stockText: { fontSize: 20, fontWeight: 'bold', color: '#000' },
  itemSubUnit: { fontSize: 10, color: '#888', fontWeight: '700', marginTop: 2 },
  itemSubUnitRed: { fontSize: 10, color: '#E53935', fontWeight: '700', marginTop: 2 },

  // --- BOTTOM NAVIGATION BAR ---
  bottomNav: { 
    position: 'absolute', bottom: 0, left: 0, right: 0,
    height: 75, backgroundColor: '#1A1A1A', flexDirection: 'row', 
    justifyContent: 'space-around', alignItems: 'center', paddingBottom: 15
  },
  fab: { 
    backgroundColor: '#1A1A1A', width: 64, height: 64, borderRadius: 32, 
    justifyContent: 'center', alignItems: 'center', marginTop: -35,
    borderWidth: 4, borderColor: '#FFF',
    elevation: 4, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 4
  }
});