
import {Text, View, ScrollView,SafeAreaView} from 'react-native'
import { useState } from 'react';
import { Stack,useRouter } from 'expo-router';
import { ThemeProvider } from '../assets/styles/ThemeContext';


// import {Colors} from '../../constants';
import Login from './Login'
export default function HomeScreen() {
  return (
    <ThemeProvider>
            <Login />
        </ThemeProvider>
  );
}

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: 'absolute',
//   },
// });
