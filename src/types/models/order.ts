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

export type OrderDetail = {
    _id: ObjectId;
    order: ObjectId;
    campaign: ObjectId;
    productVariant: ObjectId;
    productName: string;
    productQuantity: number;
    productSize: string;
    productColor: string;
    productBasePrice: number;
    productFinalPrice: number;
    productImageUrl: string;
    __v?: number;
};
