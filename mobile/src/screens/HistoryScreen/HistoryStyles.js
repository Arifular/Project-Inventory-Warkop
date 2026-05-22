import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFC' },
  
  // HEADER
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 20, paddingTop: 50, paddingBottom: 15,
    backgroundColor: '#FFF',
  },
  headerTitle: { fontSize: 20, fontWeight: '900', color: '#1A1A1A', marginLeft: 15 },
  
  // BANNER
  bannerContainer: { width: '100%', height: 180 },
  bannerImage: { width: '100%', height: '100%', justifyContent: 'flex-end' },
  bannerOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.5)' }, // Menggelapkan gambar agar teks terbaca
  bannerTextContainer: { padding: 20, paddingBottom: 25 },
  bannerTitle: { fontSize: 24, fontWeight: 'bold', color: '#FFCC00', marginBottom: 4 },
  bannerSub: { fontSize: 13, color: '#FFF', lineHeight: 18, fontWeight: '500' },

  // CARD LIST CONTAINER
  cardContainer: { padding: 20, marginTop: -10 },
  
  // KARTU TERANG (INPUT & OUTPUT)
  cardWhite: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF',
    padding: 16, borderRadius: 12, marginBottom: 16,
    borderWidth: 1, borderColor: '#EAEAEA', elevation: 1
  },
  
  // KARTU GELAP (SEMUA RIWAYAT)
  cardDark: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#22120F', // Warna custom Ketua
    padding: 16, borderRadius: 12, marginBottom: 16, elevation: 3
  },

  // IKON BOX
  iconBoxYellow: { width: 48, height: 48, borderRadius: 12, backgroundColor: '#FFCC00', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  iconBoxRed: { width: 48, height: 48, borderRadius: 12, backgroundColor: '#FFEBEE', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  
  // TEXT STYLES
  textContainer: { flex: 1 },
  titleDark: { fontSize: 16, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 2 },
  subDark: { fontSize: 12, color: '#777' },
  
  titleYellow: { fontSize: 16, fontWeight: 'bold', color: '#FFCC00', marginBottom: 2 },
  subLight: { fontSize: 12, color: '#DDD' },
});