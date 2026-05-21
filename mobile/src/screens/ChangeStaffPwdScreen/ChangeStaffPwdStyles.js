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
  scrollContent: { padding: 20, paddingBottom: 40 },
  
  // --- CARD UTAMA ---
  mainCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15, padding: 20,
    borderWidth: 1, borderColor: '#EAEAEA',
  },
  cardTitle: { fontSize: 22, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 8 },
  cardSubtitle: { fontSize: 13, color: '#666', lineHeight: 20, marginBottom: 25 },

  // --- FORM GROUP ---
  inputGroup: { marginBottom: 20 },
  label: {
    fontSize: 12, fontWeight: 'bold', color: '#5D4037', 
    marginBottom: 8, letterSpacing: 0.5,
  },
  inputWrapper: {
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1, borderColor: '#E2E5F0',
    borderRadius: 10, backgroundColor: '#F4F6F9', // Biru pucat sesuai desain
    paddingHorizontal: 15, height: 52,
  },
  input: { flex: 1, fontSize: 14, color: '#333' },

  // --- DROPDOWN ---
  dropdownTrigger: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderWidth: 1, borderColor: '#E2E5F0',
    borderRadius: 10, backgroundColor: '#F4F6F9',
    paddingHorizontal: 15, height: 52,
  },
  dropdownText: { fontSize: 14, color: '#333' },
  dropdownPlaceholder: { fontSize: 14, color: '#666' },
  dropdownList: {
    marginTop: 5, borderWidth: 1, borderColor: '#EAEAEA',
    borderRadius: 10, backgroundColor: '#FFF', overflow: 'hidden',
  },
  dropdownItem: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#F5F5F5' },
  dropdownItemText: { fontSize: 14, color: '#333' },

  // --- INFO BOX (LEFT BORDER) ---
  infoBox: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#EEF2FF', // Biru keunguan sangat muda
    borderLeftWidth: 4, borderLeftColor: '#8B6B1D',
    borderRadius: 8, padding: 15, marginBottom: 25,
  },
  infoText: { flex: 1, fontSize: 12, color: '#444', lineHeight: 18, marginLeft: 10, fontWeight: '500' },

  // --- BUTTON ---
  btnSave: {
    backgroundColor: '#FFCC00', flexDirection: 'row',
    height: 52, borderRadius: 10,
    justifyContent: 'center', alignItems: 'center',
  },
  btnSaveDisabled: { backgroundColor: '#FFE57F' },
  btnText: { fontSize: 16, fontWeight: 'bold', color: '#333', marginRight: 10 },
});