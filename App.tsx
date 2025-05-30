import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import LoginScreen from './src/screens/LoginScreen';

export default function App() {
  return (
    // <NavigationContainer>
    //   <AppNavigator />
    // </NavigationContainer>
    <LoginScreen/>
  );
}
