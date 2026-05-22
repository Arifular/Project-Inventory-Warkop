import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // IMPORT BARU
import { Ionicons } from '@expo/vector-icons';

// Import halaman utama
import SplashScreen from './src/screens/SplashScreen/SplashScreen';
import LoginScreen from './src/screens/LoginScreen/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen/DashboardScreen';

// IMPORT HALAMAN INPUT (Pastikan path-nya benar sesuai yang kamu buat)
import InputScreen from './src/screens/InputScreen/InputScreen'; 

// Import Halaman Profil
import ProfileScreen from './src/screens/ProfileScreen/ProfileScreen';
import AddUserScreen from './src/screens/AddUserScreen/AddUserScreen';
import ChangePwdScreen from './src/screens/ChangePwdScreen/ChangePwdScreen';
import ChangeStaffPwdScreen from './src/screens/ChangeStaffPwdScreen/ChangeStaffPwdScreen';
import DeleteUserScreen from './src/screens/DeleteUserScreen/DeleteUserScreen';

import InputBarangScreen from './src/screens/InputBarangScreen/InputBarangScreen';

import RestockScreen from './src/screens/RestockScreen/RestockScreen';

// IMPORT HALAMAN HALAMAN SEMENTARA (Kamu bisa buat file ini nanti, untuk sementara tampilkan "Under Construction" atau sejenisnya)
import HistoryScreen from './src/screens/HistoryScreen/HistoryScreen';
import OutputScreen from './src/screens/OutputScreen/OutputScreen';

import HistoryInputScreen from './src/screens/HistoryInputScreen/HistoryInputScreen';
import HistoryOutputScreen from './src/screens/HistoryOutputScreen/HistoryOutputScreen';
import AllHistoryScreen from './src/screens/AllHistoryScreen/AllHistoryScreen';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// --- KOMPONEN BOTTOM TAB NAVIGATOR ---
function MainTabs({ route }) {
  const user = route.params?.user; 
  // Cek apakah user adalah Owner
  const isOwner = user?.role?.toLowerCase() === 'owner' || user?.cabang?.toLowerCase() === 'all';

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#1A1A1A',
          borderTopWidth: 0,
          height: 70,
        },
        tabBarActiveTintColor: '#FFCC00',
        tabBarInactiveTintColor: '#888888',
      }}
    >
      {/* 1. TAB DASHBOARD */}
      <Tab.Screen 
        name="DashboardTab" 
        component={DashboardScreen} 
        initialParams={{ user }}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="grid" size={26} color={color} />
        }}
      />

      {/* 2. TAB MENU INPUT (KOTAK PLUS) */}
      <Tab.Screen 
        name="InputMenuTab" 
        component={InputScreen} 
        initialParams={{ user }}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="add-circle-outline" size={30} color={color} />
        }}
      />

      {/* 3. TAB TENGAH (TOMBOL PLUS BULAT BESAR) */}
      <Tab.Screen 
        name="InputCenterTab" 
        component={InputScreen} 
        initialParams={{ user }}
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity 
              {...props} 
              style={{
                top: -25,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View style={{
                width: 64, height: 64, borderRadius: 32, 
                backgroundColor: '#1A1A1A',
                justifyContent: 'center', alignItems: 'center',
                borderWidth: 4, borderColor: '#FAFAFC'
              }}>
                <Ionicons name="add" size={36} color="#FFCC00" />
              </View>
            </TouchableOpacity>
          )
        }}
      />

      {/* 4. TAB KELUAR/EXPORT */}
      <Tab.Screen 
        name="ExportTab" 
        component={OutputScreen} 
        initialParams={{ user }}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="cloud-upload-outline" size={28} color={color} />
        }}
      />

      {/* 5. LOGIKA TAB TERAKHIR: DINAMIS SESUAI ROLE */}
      {isOwner ? (
        // JIKA OWNER, TAMPILKAN MENU HISTORI
        <Tab.Screen 
          name="HistoryTab" 
          component={HistoryScreen} // Ganti dengan HistoryScreen jika file layarnya sudah kamu buat
          initialParams={{ user }}
          options={{
            tabBarIcon: ({ color }) => <Ionicons name="time-outline" size={26} color={color} />
          }}
        />
      ) : (
        // JIKA STAFF, TAMPILKAN MENU PROFILE
        <Tab.Screen 
          name="ProfileTab" 
          component={ProfileScreen} 
          initialParams={{ user }}
          options={{
            tabBarIcon: ({ color }) => <Ionicons name="person-outline" size={26} color={color} />
          }}
        />
      )}

    </Tab.Navigator>
  );
}

// --- STACK NAVIGATOR UTAMA ---
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        
        {/* PERUBAHAN: Dashboard kini diarahkan ke MainTabs */}
        <Stack.Screen name="Dashboard" component={MainTabs} />
        
        {/* Layar Profil Lainnya Tetap Menggunakan Stack (Agar menu tab di bawah tertutup saat form ini dibuka) */}
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="AddUser" component={AddUserScreen} />
        <Stack.Screen name="ChangePwd" component={ChangePwdScreen} />
        <Stack.Screen name="ChangeStaffPwd" component={ChangeStaffPwdScreen} />
        <Stack.Screen name="DeleteUser" component={DeleteUserScreen} />

        <Stack.Screen name="InputBarangBaru" component={InputBarangScreen} />

        <Stack.Screen name="RestockBarang" component={RestockScreen} />
        <Stack.Screen name="HistoryInputScreen" component={HistoryInputScreen} options={{headerShown: false}} />
        <Stack.Screen name="HistoryOutputScreen" component={HistoryOutputScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AllHistoryScreen" component={AllHistoryScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}