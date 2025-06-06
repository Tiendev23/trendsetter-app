import React, { createContext, useState, ReactNode } from 'react';

// Định nghĩa kiểu cho User
type User = {
    __v: number;
    _id: string;
    createdAt: string;
    email: string;
    favorites: Array<Product>;
    fullName: string;
    password: string;
    role: string;
    updatedAt: string;
    username: string;
};
// Định nghĩa kiểu cho Brand
type Brand = {
    id: number;
    name: string;
};

// Định nghĩa kiểu cho Product
type Product = {
    id: string;
    name: string;
    price: number;
    image: any; // Nếu React Native thì dùng ImageSourcePropType thay thế
};

// Định nghĩa kiểu cho Context
type AppContextType = {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User>>;
    listbrand: Brand[];
    selectedCategory: number;
    setSelectedCategory: React.Dispatch<React.SetStateAction<number>>;
    DataPr: Product[];
};

// Giá trị mặc định cho Context (để TS không báo lỗi)
const defaultValue: AppContextType = {
    user: null,
    setUser: () => { },
    listbrand: [],
    selectedCategory: 1,
    setSelectedCategory: () => { }, // hàm rỗng tạm thời
    DataPr: [],
};

// Tạo Context với giá trị mặc định
const AppContext = createContext<AppContextType>(defaultValue);

type AppProviderProps = {
    children: ReactNode;
};

const AppProvider = ({ children }: AppProviderProps) => {
    const [user, setUser] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState<number>(1);

    const listbrand: Brand[] = [
        { id: 1, name: 'Apple' },
        { id: 2, name: 'Samsung' },
        { id: 3, name: 'Xiaomi' },
        { id: 4, name: 'Huawei' },
        { id: 5, name: 'Oppo' },
        { id: 6, name: 'Vivo' },
        { id: 7, name: 'Google' },
    ];

    const DataPr: Product[] = [
        {
            id: '1',
            name: 'Watch',
            price: 40,
            image: require('../../assets/banner-quang-cao-giay-1.webp'),
        },
        {
            id: '2',
            name: 'Sneaker',
            price: 60,
            image: require('../../assets/banner-quang-cao-giay-1.webp'),
        },
        {
            id: '3',
            name: 'Phone',
            price: 80,
            image: require('../../assets/banner-quang-cao-giay-1.webp'),
        },
        {
            id: '4',
            name: 'Phone',
            price: 80,
            image: require('../../assets/banner-quang-cao-giay-1.webp'),
        },
        {
            id: '5',
            name: 'Phone',
            price: 80,
            image: require('../../assets/banner-quang-cao-giay-1.webp'),
        },
        {
            id: '6',
            name: 'Phone',
            price: 80,
            image: require('../../assets/banner-quang-cao-giay-1.webp'),
        },
    ];

    return (
        <AppContext.Provider
            value={{ user, setUser, listbrand, selectedCategory, setSelectedCategory, DataPr }}
        >
            {children}
        </AppContext.Provider>
    );
};

export { AppProvider, AppContext };
