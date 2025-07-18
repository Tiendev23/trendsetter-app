import { ReactNode } from "react";
import { AuthProvider } from "./AuthContext";
import { AddressProvider } from "./AddressContext";
import { CartProvider } from "./CartContext";
import { MessageProvider } from "./ChatDataContext";

export function AppProviders({ children }: { children: ReactNode }) {
    return (
        <AuthProvider>
            <CartProvider>
                <AddressProvider>
                    <MessageProvider>
                        {children}
                    </MessageProvider>
                </AddressProvider>
            </CartProvider>
        </AuthProvider>
    );
}
