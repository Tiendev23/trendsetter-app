import { ObjectId } from "../common";
import { CartItem } from "./cartItem";

export type Provider = "cod" | "payos" | "zalopay";

export interface BaseMethodProps {
    provider: Provider;
    name: string;
    desc: string;
}

export interface PaymentMethod extends BaseMethodProps {
    logo: any;
}

export interface BaseTransactionProps {
    amount: number;
    shippingFee: number;
    shippingAddress: string;
    recipientName: string;
    recipientPhone: string;
}
export interface TransactionRequest extends BaseTransactionProps {
    userId: ObjectId;
    items: CartItem[];
    redirecturl?: string;
}

export type ProviderData = {
    checkoutUrl: string;
    providerTrxId: string;
};

export type TransStatus = "pending" | "completed" | "cancelled" | "refunded";

export interface % {
    _id: ObjectId;
    order: ObjectId;
    user: ObjectId;
    amount: number;
    paymentMethod: string;
    providerTransactionId: string;
    providerPayLink?: string;
    status: TransStatus;
}
