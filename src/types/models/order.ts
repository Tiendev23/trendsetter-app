import { ObjectId } from "../common";
import { CartItem } from "./cartItem";
import { Transaction } from "./payment";
import { User } from "./user";

export interface OrderItem extends CartItem {
    _id: ObjectId; // "6895f034ab81889c80ec2d0e";
    order: ObjectId; // "6895f034ab81889c80ec2d08";
    isReviewed: boolean;
}

type UserLite = Pick<User, "_id" | "username" | "fullName" | "email">;

type TransLite = Pick<
    Transaction,
    | "_id"
    | "amount"
    | "paymentMethod"
    | "providerTransactionId"
    | "status"
    | "providerPayLink"
>;

type PickupMethod = "delivery";

type OrderStatus =
    | "pending"
    | "confirmed"
    | "shipping"
    | "delivered"
    | "cancelled";

export interface Order {
    _id: ObjectId; // "6895f034ab81889c80ec2d08";
    user: UserLite;
    transaction: TransLite;
    pickupMethod: PickupMethod; // "delivery";
    shippingAddress: string; // "22 Hồng Hà, Phường Hồng Hà, Thành phố Hà Nội";
    recipientName: string; // "Thái Luân";
    recipientPhone: string; // "0938428870";
    shippingFee: number;
    status: OrderStatus; // "delivered";
    createdAt: string; // "2025-08-06T12:40:20.236Z";
    updatedAt: string; // "2025-08-08T12:40:20.236Z";
    __v: number;
    items: OrderItem[];
    allReviewed: boolean;
}

export type OrderBody = {
    user: ObjectId;
    items: CartItem[];
    totalPrice: number;
    shippingAddress: string;
    status?: string;
};
