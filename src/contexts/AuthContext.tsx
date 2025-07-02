import { createContext, useState, ReactNode } from "react";
import { User } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Định nghĩa kiểu cho Context
type AuthContextType = {
    user: User | null;
    login: (userData: User, token: string) => void;
    logout: () => void;
    setUser: (user: User | null) => void;
};

// Khởi tạo Context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Component Provider
export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(
        null
        // {
        //     _id: "684d708f62b10398864096d2",
        //     username: "thailuan195",
        //     password: "$2b$10$rjFf8rHQWomJOfjnlFF0UOIhnt5.kxZQ0IzQia6t3ZYhgdJ53r5Me",
        //     email: "thailuan195@gmail.com",
        //     fullName: "Thái Luân",
        //     role: "customer",
        //     favorites: [],
        //     createdAt: "2025-06-14T12:52:31.162Z",
        //     updatedAt: "2025-06-14T12:52:31.162Z",
        //     __v: 0
        // }
    );

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
        <AuthContext.Provider value={{ user, login, logout, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}