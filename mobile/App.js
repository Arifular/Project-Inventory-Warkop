import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import halaman utama
import SplashScreen from './src/screens/SplashScreen/SplashScreen';
import LoginScreen from './src/screens/LoginScreen/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen/DashboardScreen';

// Import 5 Halaman Profil Baru
import ProfileScreen from './src/screens/ProfileScreen/ProfileScreen';
import AddUserScreen from './src/screens/AddUserScreen/AddUserScreen';
import ChangePwdScreen from './src/screens/ChangePwdScreen/ChangePwdScreen';
import ChangeStaffPwdScreen from './src/screens/ChangeStaffPwdScreen/ChangeStaffPwdScreen';
import DeleteUserScreen from './src/screens/DeleteUserScreen/DeleteUserScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* headerShown: false digunakan agar judul bawaan navigasi disembunyikan */}
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        
        {/* Daftarkan rute layar profil di bawah sini */}
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="AddUser" component={AddUserScreen} />
        <Stack.Screen name="ChangePwd" component={ChangePwdScreen} />
        <Stack.Screen name="ChangeStaffPwd" component={ChangeStaffPwdScreen} />
        <Stack.Screen name="DeleteUser" component={DeleteUserScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}