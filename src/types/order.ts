import { CartItem } from "./cartItem";
import { Product } from "./product";
import { User } from "./user";

export type OrderItem = {
    product: Product;
    name: string;
    quantity: number;
    price: number;
    size: string;
    color: string;
    _id: string;
};

export type Order = {
    _id: string;
    user: User | string;
    items: Array<OrderItem | CartItem>;
    totalPrice: number;
    status?: "pending" | "confirmed" | "shipping" | "delivered" | "cancelled";
    shippingAddress: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
};

export type OrderBody = {
    user: string;
    items: CartItem[];
    totalPrice: number;
    shippingAddress: string;
    status?: string;
};
