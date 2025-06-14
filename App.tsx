import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppProviders as ContextProvider } from './src/contexts';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { default as AppNavigation } from './src/navigation/StackNavigator';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

export default function App() {
    return (
        <SafeAreaProvider>
            <Provider store={store}>
                <ContextProvider>
                    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
                        <NavigationContainer>
                            <AppNavigation />
                        </NavigationContainer>
                    </SafeAreaView>
                </ContextProvider>
            </Provider>
        </SafeAreaProvider>

        
    
    );
}