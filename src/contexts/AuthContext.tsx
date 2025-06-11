import { createContext, useState, ReactNode } from "react";
import { User } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Định nghĩa kiểu cho Context
type AuthContextType = {
    user: User | null;
    login: (userData: User, token: string) => void;
    logout: () => void;
};

// Khởi tạo Context
export const Context = createContext<AuthContextType | undefined>(undefined);

// Component Provider
export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    // Hàm đăng nhập
    const login = async (userData: User, token: string) => {
        setUser(userData);
        await AsyncStorage.setItem("token", token);
    };

    // Hàm đăng xuất
    const logout = async () => {
        setUser(null);
        await AsyncStorage.removeItem("token");
    };

    return (
        <Context.Provider value={{ user, login, logout }}>
            {children}
        </Context.Provider>
    );
}