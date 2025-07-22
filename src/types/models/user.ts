import { Gender, ObjectId } from "../common";

type Role = "customer" | "admin";

export type ShippingAddress = {
    fullName: string;
    phone: string;
    streetDetails: string;
    ward: string;
    district: string;
    city: string;
    isDefault: boolean;
    _id: ObjectId;
};

export type User = {
    _id: ObjectId;
    username: string; // "sang";
    fullName: string; // "sang";
    email: string; // "sang@gmail.com";
    password?: string; // "$2b$10$/PBtiNqDLaGrJ.H0Pc2Y..LMLMV.kXYV1ltm43oJO1pvQT2Me3TVC";
    gender: Gender; // "unisex";
    birthday: string | null;
    role: Role; // "customer";
    avatar: string; // "https://res.cloudinary.com/trendsetter/image/upload/v1752307340/tl_kao2lo.webp";
    favorites: ObjectId[];
    shippingAddresses: ShippingAddress[];
    createdAt: string; // "2025-07-18T08:57:33.439Z";
    updatedAt: string; // "2025-07-18T08:57:33.439Z";
    __v?: number;
};
