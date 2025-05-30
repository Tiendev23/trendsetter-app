import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Account } from './src/screens/tabs';
import LoginScreen from './src/screens/LoginScreen';
import AuthNavigator from './src/navigation/AuthNavigator';
import { Text } from 'react-native';

export default function App() {
  return (
    // <NavigationContainer>
    //   <AuthNavigator />
    // </NavigationContainer>
    <SafeAreaView style={{ flex: 1 }}>
      <LoginScreen />
    </SafeAreaView>
  );
}
