import { CartItem } from "../models/cartItem";

export * from "./payos";
export * from "./zalopay";

export enum PaymentProvider {
    PAYOS = "payos",
    ZALOPAY = "zalopay",
}

export type Payment = {
    _id?: string;
    logo: string;
    name: string;
};

export type CreateOrderReq = {
    amount: number; // 56000000
    buyerName: string; // "Nguyen Van A"
    buyerEmail: string; // "buyer-email@gmail.com"
    buyerPhone: string; // "090xxxxxxx"
    buyerAddress: string; // "số nhà, đường, phường, tỉnh hoặc thành phố"
    items: CartItem[];
};
