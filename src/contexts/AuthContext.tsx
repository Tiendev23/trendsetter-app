import React, { createContext, useState, ReactNode } from 'react';

// Kiểu dữ liệu cho từng Brand
type Brand = {
    id: number;
    name: string;
};

// Kiểu dữ liệu cho sản phẩm
type Product = {
    id: string;
    name: string;
    price: number;
    image: any; // bạn có thể dùng `ImageSourcePropType` nếu dùng với React Native
};

// Kiểu cho context
type AppContextType = {
    selectedCategory: number;
    setSelectedCategory: (value: number) => void;
    listbrand: Brand[];
    DataPr: Product[];
};

// Giá trị mặc định (dummy)
const defaultValue: AppContextType = {
    selectedCategory: 1,
    setSelectedCategory: () => { },
    listbrand: [],
    DataPr: [],
};

// Tạo Context có kiểu dữ liệu rõ ràng
const AppContext = createContext<AppContextType>(defaultValue);

// Props cho AppProvider
type AppProviderProps = {
    children: ReactNode;
};

const AppProvider = ({ children }: AppProviderProps) => {
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
            name: 'Watch arigatoasaki',
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
            value={{
                listbrand,
                selectedCategory,
                setSelectedCategory,
                DataPr,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export { AppProvider, AppContext };
