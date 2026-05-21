import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFC', // Warna latar abu-abu sangat muda
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginLeft: 20,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  
  // --- KOTAK INFO ---
  infoBox: {
    backgroundColor: '#F4F5FB', // Biru keabu-abuan sangat muda
    borderWidth: 1,
    borderColor: '#E2E5F0',
    borderRadius: 12,
    padding: 15,
    marginBottom: 25,
  },
  infoText: {
    fontSize: 13,
    color: '#4B5563',
    lineHeight: 20,
  },

  // --- FORM INPUT ---
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#5D4037', // Coklat gelap sesuai desain
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D7CCC8', // Warna border coklat/emas pudar
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    height: 52,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },
  eyeIcon: {
    padding: 5,
  },

  // --- FOOTER & TOMBOL ---
  footer: {
    padding: 20,
    backgroundColor: '#FAFAFC',
  },
  btnSave: {
    backgroundColor: '#FFCC00',
    flexDirection: 'row',
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  btnSaveDisabled: {
    backgroundColor: '#FFE57F',
    elevation: 0,
  },
  btnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8,
  }
});