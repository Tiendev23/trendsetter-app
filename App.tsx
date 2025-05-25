import React from 'react';
import { theme } from './src/theme/theme';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
// import AppNavigator from './src/navigation/AppNavigator';
import AddBannerScreen from './src/screens/AddBannerScreen';

export default function App() {
  return (
    <PaperProvider theme={theme}>
      {/* <AppNavigator /> */}
      <AddBannerScreen />
    </PaperProvider>
  );
}
