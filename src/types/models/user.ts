import { Gender, ObjectId } from "../common";
import { ShippingAddress } from "./address";

type Role = "customer" | "admin";

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
    addresses: ShippingAddress[];
    createdAt: string; // "2025-07-18T08:57:33.439Z";
    updatedAt: string; // "2025-07-18T08:57:33.439Z";
    __v?: number;
}
