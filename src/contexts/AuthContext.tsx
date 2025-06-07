import { createContext, useState, ReactNode } from "react";

// Định nghĩa kiểu dữ liệu cho User
type User = {
    __v: number,
    _id: string;
    createdAt: string;
    email: string;
    favorites: string[],
    fullName: string;
    password: string;
    role: string;
    updatedAt: string;
    username: string;
};

// Định nghĩa kiểu cho Context
type AuthContextType = {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
};

// Khởi tạo Context
export const Context = createContext<AuthContextType | undefined>(undefined);

// Component Provider
export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    // Hàm đăng nhập
    const login = (userData: User) => {
        setUser(userData);
    };

    // Hàm đăng xuất
    const logout = () => {
        setUser(null);
    };

    return (
        <Context.Provider value={{ user, login, logout }}>
            {children}
        </Context.Provider>
    );
}