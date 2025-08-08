import { ObjectId } from "../common";
import { CartItem } from "./cartItem";
import { Product } from "./product";
import { User } from "./user";

export type OrderItem = {
    _id: ObjectId;
    order: ObjectId;
    campaign: ObjectId;
    variant: ObjectId;
    size: string;
    name: string;
    color: string;
    basePrice: number;
    finalPrice: number;
    imageUrl: string;
    quantity: number;
    __v?: number;
};

type OrderStatus =
    | "pending"
    | "confirmed"
    | "shipping"
    | "delivered"
    | "cancelled";

export type Order = {
    _id: ObjectId;
    user: User | ObjectId;
    items: OrderItem[] | CartItem[];
    totalPrice: number;
    status?: OrderStatus;
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
