import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppProvider } from './src/contexts/AuthContext';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import StackNavigator from './src/navigation/StackNavigator';

export default function App() {
  return (
    <SafeAreaProvider>

      <AppProvider>
        <SafeAreaView style={{ flex: 1 }} edges={['top']}>
          <NavigationContainer>
            <StackNavigator />
          </NavigationContainer>
        </SafeAreaView>
      </AppProvider>
    </SafeAreaProvider>
  );
}