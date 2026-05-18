import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import halaman kita
import SplashScreen from './src/screens/SplashScreen/SplashScreen';
import LoginScreen from './src/screens/LoginScreen/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen/DashboardScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* headerShown: false digunakan agar judul bawaan navigasi disembunyikan */}
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}