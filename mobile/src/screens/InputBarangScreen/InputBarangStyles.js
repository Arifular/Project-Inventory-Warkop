import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFC' },
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 20, paddingTop: 50, paddingBottom: 15,
    backgroundColor: '#FAFAFC', 
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#1A1A1A', marginLeft: 15 },
  scrollContent: { padding: 20, paddingBottom: 40 },
  
  // --- TITLE TEXT ---
  mainTitle: { fontSize: 26, fontWeight: '900', color: '#1A1A1A', marginBottom: 6 },
  subTitle: { fontSize: 14, color: '#555', marginBottom: 20, lineHeight: 20 },

  // --- BANNER ---
  bannerContainer: {
    width: '100%', height: 160, borderRadius: 12, overflow: 'hidden', marginBottom: 24,
  },
  bannerImage: { width: '100%', height: '100%', justifyContent: 'flex-end' },
  bannerOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.3)' },
  badgeContainer: {
    backgroundColor: '#FFCC00', alignSelf: 'flex-start',
    paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20,
    margin: 15,
  },
  badgeText: { fontSize: 12, fontWeight: 'bold', color: '#1A1A1A' },

  // --- FORM GROUP ---
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 13, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  inputWrapper: {
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1, borderColor: '#D1D1D6', borderRadius: 8,
    backgroundColor: '#FAFAFC', paddingHorizontal: 15, height: 50,
  },
  input: { flex: 1, fontSize: 15, color: '#333' },

  // --- DROPDOWN ---
  dropdownTrigger: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderWidth: 1, borderColor: '#D1D1D6', borderRadius: 8,
    backgroundColor: '#FAFAFC', paddingHorizontal: 15, height: 50,
  },
  dropdownText: { fontSize: 15, color: '#333' },
  dropdownPlaceholder: { fontSize: 15, color: '#999' },
  dropdownList: {
    marginTop: 5, borderWidth: 1, borderColor: '#EAEAEA', borderRadius: 8,
    backgroundColor: '#FFF', overflow: 'hidden', elevation: 2,
  },
  dropdownItem: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#F5F5F5' },
  dropdownItemText: { fontSize: 15, color: '#333' },

  // --- JUMLAH & UNIT ROW ---
  rowInputs: { flexDirection: 'row', alignItems: 'center' },
  flexInput: { flex: 1 },
  unitBox: {
    backgroundColor: '#E5E5EA', height: 50, borderRadius: 8,
    justifyContent: 'center', alignItems: 'center',
    paddingHorizontal: 20, marginLeft: 12,
  },
  unitText: { fontSize: 14, fontWeight: 'bold', color: '#333' },

  // --- BUTTON SIMPAN ---
  btnSave: {
    backgroundColor: '#FFCC00', flexDirection: 'row', height: 54, borderRadius: 12,
    justifyContent: 'center', alignItems: 'center', marginTop: 10,
  },
  btnSaveDisabled: { backgroundColor: '#FFE57F' },
  btnText: { fontSize: 16, fontWeight: 'bold', color: '#1A1A1A', marginLeft: 10 },
});