import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F6F3F2' },
  // --- HEADER ---
  header: { 
    backgroundColor: '#FFF', paddingTop: 50, paddingHorizontal: 20, 
    paddingBottom: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' 
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  logoHeader: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  pickerContainer: { 
    backgroundColor: '#EEE', borderRadius: 10, paddingHorizontal: 10, height: 35, justifyContent: 'center' 
  },
  // --- CARD KUNING ---
  mainCard: { 
    backgroundColor: '#FFCC00', margin: 20, borderRadius: 20, padding: 20,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    elevation: 5, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 5
  },
  cardLabel: { fontSize: 14, fontWeight: '600', color: '#555', textTransform: 'uppercase' },
  cardValue: { fontSize: 32, fontWeight: 'bold', color: '#000', marginVertical: 5 },
  cardSub: { fontSize: 14, color: '#333' },
  boxIcon: { width: 80, height: 80, opacity: 0.8 },
  // --- TILES ---
  tileRow: { flexDirection: 'row', paddingHorizontal: 20, justifyContent: 'space-between' },
  tile: { backgroundColor: '#FFF', width: '47%', borderRadius: 15, padding: 15, elevation: 2 },
  tileLabel: { fontSize: 12, color: '#888', fontWeight: 'bold', marginBottom: 5 },
  tileValue: { fontSize: 24, fontWeight: 'bold', color: '#E53935' }, // Merah untuk Low Stock
  // --- LIST ---
  listHeader: { 
    flexDirection: 'row', justifyContent: 'space-between', 
    paddingHorizontal: 20, marginTop: 25, marginBottom: 15 
  },
  listTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  seeAll: { color: '#FFCC00', fontWeight: 'bold' },
  itemCard: { 
    backgroundColor: '#FFF', marginHorizontal: 20, marginBottom: 10, 
    borderRadius: 15, padding: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' 
  },
  itemName: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  itemSub: { fontSize: 12, color: '#999' },
  itemStock: { alignItems: 'flex-end' },
  stockText: { fontSize: 18, fontWeight: 'bold' },
  // --- BOTTOM NAV ---
  bottomNav: { 
    height: 70, backgroundColor: '#121212', flexDirection: 'row', 
    justifyContent: 'space-around', alignItems: 'center', paddingBottom: 10
  },
  fab: { 
    backgroundColor: '#FFCC00', width: 60, height: 60, borderRadius: 30, 
    justifyContent: 'center', alignItems: 'center', marginTop: -40,
    borderWidth: 5, borderColor: '#F6F3F2'
  }
});