import { Gender, ObjectId } from "../common";

type Role = "customer" | "admin";

export interface ShippingAddress {
    fullName: string;
    phone: string;
    street: string;
    ward: string;
    province: string;
    isDefault: boolean;
    _id: ObjectId;
}

export interface User {
    _id: ObjectId;
    username: string; // "sang";
    fullName: string; // "sang";
    email: string; // "sang@gmail.com";
    gender: Gender; // "unisex";
    birthday: string | null;
    role: Role; // "customer";
    avatar: string; // "https://res.cloudinary.com/trendsetter/image/upload/v1752307340/tl_kao2lo.webp";
    favorites: ObjectId[];
    shippingAddresses: ShippingAddress[];
    createdAt: string; // "2025-07-18T08:57:33.439Z";
    updatedAt: string; // "2025-07-18T08:57:33.439Z";
    __v?: number;
}
