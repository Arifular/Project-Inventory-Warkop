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
  // --- CUSTOM MODAL POP-UP (BARU) ---
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    elevation: 5,
  },
  modalIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#FDE8E8', // Merah pudar khas alert
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#4B5563',
    textAlign: 'center',
    marginBottom: 26,
    lineHeight: 22,
  },
  btnModalPrimary: {
    width: '100%',
    backgroundColor: '#C5221F', // Warna merah tegas "Ya, Hapus"
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  btnModalPrimaryText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  btnModalSecondary: {
    width: '100%',
    backgroundColor: '#E5E7EB', // Warna abu-abu tombol "Tidak"
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnModalSecondaryText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: 'bold',
  }
});
