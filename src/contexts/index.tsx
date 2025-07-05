import { ReactNode } from "react";
import { AuthProvider } from "./AuthContext";
import { DataProvider } from "./DataContext";
import { CartProvider } from "./CartContext";
import { MessageProvider } from "./ChatDataContext";

export function AppProviders({ children }: { children: ReactNode }) {
    return (
        <AuthProvider>
            <CartProvider>
                <DataProvider>
                    <MessageProvider>
                        {children}
                    </MessageProvider>
                </DataProvider>
            </CartProvider>
        </AuthProvider>
    );
}
