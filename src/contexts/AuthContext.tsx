import { createContext, useState, ReactNode, useContext } from "react";
import { User } from "../types/models";
import { showErrorToast } from "@/utils/toast";
import * as Storage from "@/services/asyncStorage.service";
import { useAppDispatch } from "@/redux/hooks";
import { setSelectedAddress } from "@/redux/features/address/addressesSlice";

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
    const dispatch = useAppDispatch();
    const [user, setUser] = useState<User | null>(
        null
        // { "__v": 28, "_id": "686f6fc68e86e6e10dfc27b7", "addresses": [{ "__v": 0, "_id": "6890515745e7109087f1edc8", "fullName": "Trịnh Quốc Tiến", "isDefault": true, "phone": "0938428870", "province": "Thành phố Hồ Chí Minh", "street": "262 Đề Thám", "user": "686f6fc68e86e6e10dfc27b7", "ward": "Phường Sài Gòn" }], "avatar": "https://res.cloudinary.com/trendsetter/image/upload/v1752313240/avatars/1752313235559-zjy5zdu4.jpg", "birthday": "1995-07-09T00:00:00.000Z", "createdAt": "2025-07-10T07:07:57.557Z", "email": "tientq.dev.it@gmail.com", "favorites": ["686e65c09d70cd16504feeab", "68710372d1feb9e62d8e1b51"], "fullName": "Thái Luân", "gender": "male", "role": "customer", "updatedAt": "2025-07-31T15:19:00.818Z", "username": "TienTrinh" }
    );
    const [email, setEmail] = useState<string>('')

    const login = async (userData: User) => {
        setUser(userData);
        dispatch(setSelectedAddress(
            userData.addresses.find(addr => addr.isDefault) || userData.addresses[0]
        ));
    };

    // Hàm đăng xuất
    const logout = async () => {
        setUser(null);
        await Storage.removeItem("@token");
        await Storage.removeItem("@cart");
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
