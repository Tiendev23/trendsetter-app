import { createContext, useState, ReactNode, useContext, useEffect } from "react";
import { User } from "../types/models";
import { showErrorToast } from "@/utils/toast";
import * as Storage from "@/services/asyncStorage.service";
import { useAppDispatch } from "@/redux/hooks";
import { setSelectedAddress } from "@/redux/features/address/addressesSlice";
import { KEY } from "@/constants";

// Định nghĩa kiểu cho Context
export type AuthContextType = {
    user: User | null;
    setUser: (user: User | null) => void;

    login: (userData: User) => void;

    logout: () => void;

    // ??? Làm vậy chi, lấy email thì trong user có rồi?
    // để khi forgotpass thành công thì input email sẽ được nhập luôn
    email: string;
    setEmail: (email: string) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const dispatch = useAppDispatch();
    const [user, setUser] = useState<User | null>(
        null
    );
    const [email, setEmail] = useState<string>('')

    // useEffect(() => {
    //     Storage.removeItem(KEY.TOKEN);
    //     const token = (
    //         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODZmNmZjNjhlODZlNmUxMGRmYzI3YjciLCJwdXJwb3NlIjoibG9naW4iLCJpYXQiOjE3NTUwMTU5MzgsImV4cCI6MTc1NTAyMzEzOH0.qxozzvaIJCtYkiSv0ritRzNmWXTLf-ZBovlXPIH1y3M"
    //     );
    //     Storage.saveItem(KEY.TOKEN, token)
    // }, []);

    const login = async (userData: User) => {
        setUser(userData);
        dispatch(setSelectedAddress(
            userData.addresses.find(addr => addr.isDefault) || userData.addresses[0]
        ));
    };

    // Hàm đăng xuất
    const logout = async () => {
        setUser(null);
        await Storage.removeItem(KEY.TOKEN);
        await Storage.removeItem(KEY.CART);
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
};

export function useRequireAuth(): User {
    const { user } = useAuthContext();
    if (!user) {
        // Ở đây sẽ không xảy ra vì Navigator đã guard rồi,
        // nhưng thêm bước này để TypeScript hiểu là non-null
        // Đọc tới đây thì đây là giải pháp tạm thời
        throw new Error('User not logged in');
    }
    return user;
}
