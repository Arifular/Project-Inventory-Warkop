import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFCC00', // Ini warna background cokelat gelap dari gambarmu
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 60,
  },
  topText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 20,
    letterSpacing: 1, // Sedikit renggang biar elegan
  },
  centerGroup: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1, // Agar bagian tengah ini mengambil ruang sisa dan logo benar-benar di tengah
  },
  logoImage: {
    // POIN 2: Ukuran logo diperbesar (sebelumnya 200x200)
    width: 280, 
    height: 280,
    resizeMode: 'contain',
    // marginBottom dihapus karena teks di bawahnya sudah hilang
  },
  // Style untuk brandText dihapus karena teksnya sudah tidak ada di .js
  
  bottomGroup: {
    alignItems: 'center',
    marginBottom: 20,
  },
  // Style untuk creditText dihapus karena teksnya sudah tidak ada di .js
  
  versionText: {
    // POIN 4: Ukuran versi diperbesar sedikit (sebelumnya 12)
    fontSize: 16, 
    color: '#FFFFFF',
    fontWeight: '500', // Sedikit ditebalkan biar jelas
    opacity: 0.8, // Tetap sedikit redup tapi jelas dibaca
  },
});