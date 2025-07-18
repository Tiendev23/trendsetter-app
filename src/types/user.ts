// Định nghĩa kiểu dữ liệu cho User
import { Addresses } from "./shippingAddresses";
export type User = {
    _id: string;
    fullName: string;
    username: string;
    email: string;
    favorites?: string[];
    password?: string;
    role?: string;
    createdAt?: string;
    updatedAt?: string;
    ShippingAddress: Addresses[];
    __v?: number;
};
