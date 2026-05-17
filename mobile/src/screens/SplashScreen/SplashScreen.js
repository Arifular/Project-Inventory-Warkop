import React, {useEffect} from 'react';
import { Text, View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { styles } from './SplashScreenStyles'; // Mengimpor style yang dipisah tadi

export default function SplashScreen({navigation}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      // Navigasi ke halaman login setelah 3 detik
      navigation.replace('Login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.topText}>Sistem Inventaris Barang</Text>

      <View style={styles.centerGroup}>
        {/* Naik satu folder ke src, lalu ke assets */}
        <Image 
          source={require('../../../assets/logo.jpg')} 
          style={styles.logoImage} 
        />
        {/* <Text style={styles.brandText}>Warkop Meteora</Text> */}
      </View>

      <View style={styles.bottomGroup}>
        {/* <Text style={styles.creditText}>Create with Al farhan & Alifia Rahma</Text> */}
        <Text style={styles.versionText}>Versi 1.0.0</Text>
      </View>
      
      <StatusBar style="light" />
    </View>
  );
}