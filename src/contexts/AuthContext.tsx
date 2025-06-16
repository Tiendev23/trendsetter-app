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
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Component Provider
export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    // Hàm đăng nhập
    const login = async (userData: User, token: string) => {
        try {
            setUser(userData);
            await AsyncStorage.setItem("token", token);
        } catch (error) {
            console.error("Lưu token thất bại:", error);
        }
    };

    // Hàm đăng xuất
    const logout = async () => {
        try {
            setUser(null);
            await AsyncStorage.removeItem("token");
        } catch (error) {
            console.error("Xóa token thất bại:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}