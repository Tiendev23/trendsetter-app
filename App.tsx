import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppProviders as ContextProvider } from './src/contexts';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { default as AppNavigation } from './src/navigation/StackNavigator';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { KeyboardAvoidingView, Platform } from 'react-native';

export default function App() {
    return (
        <SafeAreaProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <SafeAreaView style={{ flex: 1 }} edges={['top']}>
                    <ContextProvider>
                        <Provider store={store}>
                            <KeyboardAvoidingView
                                style={{ flex: 1 }}
                                behavior={'padding'}
                                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -45} // điều chỉnh nếu bạn có header
                            >
                                <NavigationContainer>
                                    <AppNavigation />
                                    <Toast />
                                </NavigationContainer>
                            </KeyboardAvoidingView>
                        </Provider>
                    </ContextProvider>
                </SafeAreaView>
            </GestureHandlerRootView>
        </SafeAreaProvider >
    );
}