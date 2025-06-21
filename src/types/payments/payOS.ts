import { CartItem } from "../cartItem";


export type CreateRequestReq = {
    // orderCode?: number; // 123
    amount: number; // 56000000
    // description?: string; // "VQRIO123"
    buyerName: string; // "Nguyen Van A"
    buyerEmail: string; // "buyer-email@gmail.com"
    buyerPhone: string; // "090xxxxxxx"
    buyerAddress: string; // "số nhà, đường, phường, tỉnh hoặc thành phố"
    items: CartItem[];
    // cancelUrl?: string; // "https://your-cancel-url.com"
    // returnUrl?: string; // "https://your-success-url.com"
    // expiredAt?: number; // 1696559798
    // signature?: string; // "string"
};

export type CreateRequestRes = {
    code?: string; // "00"
    desc?: string; // "Success - Thành công"
    data?: {
        bin: string; // "970422" (Bank Identification Number) là mã định danh ngân hàng
        accountNumber: string; // "113366668888"
        accountName: string; // "QUY VAC XIN PHONG CHONG COVID"
        amount: number; // 3000
        description: string; // "VQRIO12546 Thanh toan iphone"
        orderCode: number; // 1254
        curency: string; // "VND"
        paymentLinkId: string; // "a7a9454060cd48909864b3747289ff38"
        status: string; // "PENDING"
        checkoutUrl: string; // "https://pay.payos.vn/web/a7a9454060cd48909864b3747289ff38"
        qrCode: string; // "00020101021238570010A00000072701270006970422011371045208946240208QRIBFTTA5303704540430005802VN62180814TT1BQG8F khanh6304D4F6"
    };
    signature?: string; // "8d8640d802576397a1ce45ebda7f835055768ac7ad2e0bfb77f9b8f12cca4c7f"
};
