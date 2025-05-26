import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Account } from './src/screens/tabs';

export default function App() {
  return (
    // <NavigationContainer>
    //   <AppNavigator />
    // </NavigationContainer>
    <SafeAreaView style={{ flex: 1 }}>
      <Account />
    </SafeAreaView>
  );
}
