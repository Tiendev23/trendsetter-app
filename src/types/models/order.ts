import { ObjectId } from "../common";
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
    _id: ObjectId;
};

export type Order = {
    _id: ObjectId;
    user: User | ObjectId;
    items: OrderItem[] | CartItem[];
    totalPrice: number;
    status?: "pending" | "confirmed" | "shipping" | "delivered" | "cancelled";
    shippingAddress: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
};

export type OrderBody = {
    user: ObjectId;
    items: CartItem[];
    totalPrice: number;
    shippingAddress: string;
    status?: string;
};
