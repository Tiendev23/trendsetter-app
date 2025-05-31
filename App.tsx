import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Account } from './src/screens/tabs';
import LoginScreen from './src/screens/LoginScreen';
import { Text } from 'react-native';
import SignUpScreen from './src/screens/SignUpScreen';
import AuthNavigator from './src/navigation/AuthNavigator';

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AppProvider>
  );
}
