import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppProviders as ContextProvider } from './src/contexts';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { default as AppNavigation } from './src/navigation/StackNavigator';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Profile from './src/screens/stacks/Profile';

export default function App() {
    return (
        <SafeAreaProvider>
            <GestureHandlerRootView>
                <SafeAreaView style={{ flex: 1 }} edges={['top']}>
                    <ContextProvider>
                        <Provider store={store}>
                            <NavigationContainer>
                                <AppNavigation />
                                {/* <Profile/> */}
                            </NavigationContainer>
                        </Provider>
                    </ContextProvider>
                </SafeAreaView>
            </GestureHandlerRootView>
        </SafeAreaProvider >



    );
}