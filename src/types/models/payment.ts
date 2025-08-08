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

export interface ZaloPayResponse {
    return_code: number;
    return_message: string;
    sub_return_code: number;
    sub_return_message: string;
    zp_trans_token: string;
    order_url: string;
    cashier_order_url: string;
    order_token: string;
    qr_code: string;
    transId: string;
}

export interface ZaloPayErrorRes {
    return_code: number; // 2;
    return_message: string; // "Giao dịch thất bại";
    sub_return_code: number; // -68;
    sub_return_message: string; // "Mã giao dịch bị trùng";
    transId: string; // "250804935241";
}

export interface PayOSResponse {
    bin: string; // "970422";
    accountNumber: string; // "0330015113333";
    accountName: string; // "TRINH QUOC TIEN";
    amount: number; // 748000;
    description: string; // "CSXVJDO4J98 TRENDSETTER";
    orderCode: number; // 250804976982;
    currency: string; // "VND";
    paymentLinkId: string; // "64c28c17d1b54381a08b8a77a4ef2398";
    status: string; // "PENDING";
    expiredAt: number; // 1754241767;
    checkoutUrl: string; // "https://pay.payos.vn/web/64c28c17d1b54381a08b8a77a4ef2398";
    qrCode: string; // "00020101021238570010A00000072701270006970422011303300151133330208QRIBFTTA530370454067480005802VN62270823CSXVJDO4J98 TRENDSETTER63041968";
}

export type ProviderData = {
    checkoutUrl: string;
    transId: string;
};
