import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppProviders as ContextProvider } from "./src/contexts";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { default as AppNavigation } from "./src/navigation/StackNavigator";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Profile from "./src/screens/stacks/Profile";
import Toast from "react-native-toast-message";
import { MessageProvider } from "./src/contexts/ChatDataContext"; // thêm dòng này

export default function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
          <MessageProvider>
            {" "}
            {/* ✅ Bọc MessageProvider ở đây */}
            <ContextProvider>
              <Provider store={store}>
                <NavigationContainer>
                  <AppNavigation />
                </NavigationContainer>
              </Provider>
            </ContextProvider>
          </MessageProvider>
          <Toast />
        </SafeAreaView>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
