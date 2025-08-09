import { ObjectId } from "../common";
import { CartItem } from "./cartItem";
import { Transaction } from "./payment";
import { User } from "./user";

export type OrderItem = {
    _id: ObjectId; // "6895f034ab81889c80ec2d0e";
    order: ObjectId; // "6895f034ab81889c80ec2d08";
    campaign: ObjectId | null;
    variant: ObjectId; // "68710372d1feb9e62d8e1b51";
    size: ObjectId; // "68710486d1feb9e62d8e1b56";
    name: string; // "Sandal Biti's Hunter Nữ Màu Kem";
    color: string; // "Kem";
    basePrice: number;
    finalPrice: number;
    imageUrl: string; // "https://product.hstatic.net/1000230642/product/hew000901kem__3__fcfde8496d1c43af87cb9a4cd6c80dd4_master.jpg";
    quantity: number;
    __v: number;
};

type UserLite = Pick<User, "_id" | "username" | "fullName" | "email">;

type TransLite = Pick<
    Transaction,
    "_id" | "amount" | "paymentMethod" | "providerTransactionId" | "status"
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
}

export type OrderBody = {
    user: ObjectId;
    items: CartItem[];
    totalPrice: number;
    shippingAddress: string;
    status?: string;
};
