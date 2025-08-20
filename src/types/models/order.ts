import { ObjectId } from "../common";
import { CartItem } from "./cartItem";
import { Transaction } from "./payment";
import { User } from "./user";

export interface OrderItem extends CartItem {
    _id: ObjectId; // "6895f034ab81889c80ec2d0e";
    order: ObjectId; // "6895f034ab81889c80ec2d08";
    isReviewed: boolean;
}

export type OrderStatus =
    | "pending"
    | "confirmed"
    | "shipping"
    | "delivered"
    | "cancelled";

export interface OrderPreview {
    _id: ObjectId; // "6895f034ab81889c80ec2d08";
    transaction: Transaction;
    status: OrderStatus; // "delivered";
    items: OrderItem[];
    createdAt: string; // "2025-08-06T12:40:20.236Z";
    updatedAt: string; // "2025-08-08T12:40:20.236Z";
    allReviewed: boolean;
}

export type PickupMethod = "delivery" | "in-store";
export interface Order extends OrderPreview {
    pickupMethod: PickupMethod;
    shippingAddress: string;
    recipientName: string;
    recipientPhone: string;
    shippingFee: number;
    __v: number;
}
