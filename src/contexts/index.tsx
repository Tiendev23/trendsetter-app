import { ReactNode } from "react";
import { AuthProvider } from "./AuthContext";
import { DataProvider } from "./DataContext";
import { CartProvider } from "./CartContext";

export function AppProviders({ children }: { children: ReactNode }) {
    return (
        <AuthProvider>
            <CartProvider>
                <DataProvider>
                    {children}
                </DataProvider>
            </CartProvider>
        </AuthProvider>
    );
}
