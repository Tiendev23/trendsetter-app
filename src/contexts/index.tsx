import { ReactNode } from "react";
import { AuthProvider } from "./AuthContext";
import { DataProvider } from "./DataContext";

export function AppProviders({ children }: { children: ReactNode }) {
    return (
        <AuthProvider>
            <DataProvider>
                {children}
            </DataProvider>
        </AuthProvider>
    );
}
