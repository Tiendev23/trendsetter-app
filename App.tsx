import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppProvider } from './src/contexts/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import StackNavigator from './src/navigation/StackNavigator';
import { StyleSheet } from 'react-native';

export default function App() {
  return (
    <AppProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </SafeAreaView>
    </AppProvider>
  );
}