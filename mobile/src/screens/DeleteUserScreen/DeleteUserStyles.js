import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFC' },
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 20, paddingTop: 50, paddingBottom: 15,
    borderBottomWidth: 1, borderBottomColor: '#EAEAEA',
    backgroundColor: '#FFFFFF',
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#1A1A1A', marginLeft: 20 },
  scrollContent: { padding: 20, flexGrow: 1 },
  
  // --- CARD UTAMA ---
  mainCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12, padding: 20,
    borderWidth: 1, borderColor: '#D7CCC8', // Border coklat pudar sesuai desain
    elevation: 1,
  },

  // --- FORM GROUP ---
  inputGroup: { marginBottom: 20 },
  label: {
    fontSize: 13, fontWeight: 'bold', color: '#5D4037', 
    marginBottom: 8,
  },

  // --- DROPDOWN ---
  dropdownTrigger: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderWidth: 1, borderColor: '#EAEAEA',
    borderRadius: 10, backgroundColor: '#FAFAFA',
    paddingHorizontal: 15, height: 52,
  },
  dropdownText: { fontSize: 15, color: '#333', fontWeight: '500' },
  dropdownPlaceholder: { fontSize: 15, color: '#1A1A1A', fontWeight: '500' }, // Warna gelap seperti desain
  dropdownList: {
    marginTop: 5, borderWidth: 1, borderColor: '#EAEAEA',
    borderRadius: 10, backgroundColor: '#FFF', overflow: 'hidden',
  },
  dropdownItem: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#F5F5F5' },
  dropdownItemText: { fontSize: 15, color: '#333' },

  // --- BUTTON ---
  footer: { padding: 20, backgroundColor: '#FAFAFC' },
  btnDelete: {
    backgroundColor: '#B3261E', // Merah gelap yang elegan
    flexDirection: 'row',
    height: 54, borderRadius: 12,
    justifyContent: 'center', alignItems: 'center',
    elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2, shadowRadius: 3,
  },
  btnDeleteDisabled: { backgroundColor: '#E57373', elevation: 0 },
  btnText: { fontSize: 16, fontWeight: 'bold', color: '#FFFFFF', marginRight: 10 },
});