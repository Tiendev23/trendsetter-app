import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppProvider } from './src/contexts/AuthContext';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { default as AppNavigation } from './src/navigation/StackNavigator';
import { Provider } from 'react-redux';
import store from './src/redux/store';

export default function App() {
    return (
        <SafeAreaProvider>
            <Provider store={store}>
                <AppProvider>
                    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
                        <NavigationContainer>
                            <AppNavigation />
                        </NavigationContainer>
                    </SafeAreaView>
                </AppProvider>
            </Provider>
        </SafeAreaProvider>
    );
}