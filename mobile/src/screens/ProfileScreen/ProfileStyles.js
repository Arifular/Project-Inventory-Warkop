import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFC', // Warna latar belakang abu-abu sangat muda
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginLeft: 20,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  
  // --- BAGIAN PROFIL ATAS ---
  profileSection: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  avatarContainer: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 4,
    borderColor: '#FFCC00', // Lingkaran kuning khas Meteora
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roleBadge: {
    backgroundColor: '#E8EAF6',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
  },
  roleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
  },
  dot: {
    fontSize: 18,
    color: '#888',
    marginHorizontal: 10,
  },
  warkopText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#8B6B1D', // Warna emas/coklat gelap sesuai desain
  },

  // --- BAGIAN MENU KOTAK (CARDS) ---
  menuContainer: {
    paddingHorizontal: 20,
  },
  menuCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  menuCardRed: {
    borderColor: '#FFCDD2',
    backgroundColor: '#FFF9F9',
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#FFF9E6', // Kuning sangat pudar
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  iconBoxRed: {
    backgroundColor: '#FFEBEE', // Merah sangat pudar
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  menuTextRed: {
    color: '#D32F2F',
  },
  
  // --- PENGATURAN APLIKASI ---
  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#888',
    letterSpacing: 1,
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  settingsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginLeft: 15,
  },
  divider: {
    height: 1,
    backgroundColor: '#EAEAEA',
    marginLeft: 40, // Agar garis tidak memotong ikon
  },

  // --- FOOTER ---
  footer: {
    alignItems: 'center',
    marginTop: 40,
  },
  footerText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#A0A0A0',
    textAlign: 'center',
    lineHeight: 20,
  },
  // --- CUSTOM MODAL POP-UP ---
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Efek gelap transparan di background
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFEBEE', // Merah pudar
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  btnModalPrimary: {
    width: '100%',
    backgroundColor: '#B3261E', // Merah gelap
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
    backgroundColor: '#E0E0E0', // Abu-abu
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnModalSecondaryText: {
    color: '#333333',
    fontSize: 16,
    fontWeight: 'bold',
  }
});