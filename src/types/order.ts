import { CartItem } from "./cartItem";
import { User } from "./user";

export type Order = {
    _id: string;
    user: User;
    items: CartItem[];
    totalPrice: number;
    status: string;
    shippingAddress: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
};

export type OrderBody = {
    user: string;
    items: CartItem[];
    totalPrice: number;
    shippingAddress: string;
    status?: string;
};
