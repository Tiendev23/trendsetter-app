import { ShippingAddress } from "./models/address";

export type User = {
    _id: string;
    username: string;
    fullName: string;
    email: string;
    password?: string;
    gender?: "male" | "female" | "other";
    birthday?: string | Date;
    avatar?: string;
    role?: "customer" | "admin";
    favorites?: string[];
    addresses?: ShippingAddress[];
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
};
