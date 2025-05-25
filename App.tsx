import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import HomeScreen from './src/screens/HomeScreen';
import { AppProvider } from './src/contexts/AuthContext';

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <HomeScreen />
      </NavigationContainer>
    </AppProvider>
  );
}
