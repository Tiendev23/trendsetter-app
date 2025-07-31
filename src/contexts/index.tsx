import { ReactNode } from "react";
import { AuthProvider } from "./AuthContext";
import { AddressProvider } from "./AddressContext";
import { CartProvider } from "./CartContext";
import { MessageProvider } from "./ChatDataContext";
import { FavoriteProvider } from "./FavoriteContext";
import { Provider } from 'react-redux';
import { store } from '../redux/store'; 

export function AppProviders({ children }: { children: ReactNode }) {
    return (
        <Provider store={store}>
            <AuthProvider>
                <CartProvider>
                    <AddressProvider>
                        <MessageProvider>
                            <FavoriteProvider>
                                {children}
                            </FavoriteProvider>
                        </MessageProvider>
                    </AddressProvider>
                </CartProvider>
            </AuthProvider>
        </Provider>
    );
}
