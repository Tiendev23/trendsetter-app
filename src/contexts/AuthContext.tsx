import { createContext, useState, ReactNode, useContext } from "react";
import { User } from "../types/models";
import { showErrorToast } from "@/utils/toast";
import * as Storage from "@/services/asyncStorage.service";

// Định nghĩa kiểu cho Context
export type AuthContextType = {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
    setUser: (user: User | null) => void;

    // ??? Làm vậy chi, lấy email thì trong user có rồi?
    // để khi forgotpass thành công thì input email sẽ được nhập luôn
    email: string;
    setEmail: (email: string) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [email, setEmail] = useState<string>('')

    const login = async (userData: User) => {
        setUser(userData);

    };

    // Hàm đăng xuất
    const logout = async () => {
        try {
            setUser(null);
            await Storage.removeItem("@token");
            await Storage.removeItem("@cart");
        } catch (error) {
            console.error("Xóa token thất bại:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, setUser, email, setEmail }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error('useAuth must be used within a AuthProvider');
    return context;
}