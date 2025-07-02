import { CreateOrderReq } from ".";

export type ZalopayCreateReq = CreateOrderReq & {
    urlCalbackSuccess: string;
};

export type ZalopayCreateRes = {
    return_code: number; // 1;
    return_message: string; // "Giao dịch thành công";
    sub_return_code: number; // 1;
    sub_return_message: string; // "Giao dịch thành công";
    zp_trans_token: string; // "ACxMV2xQXSqEorPiirT0aBOg";
    order_url: string; // "https://qcgateway.zalopay.vn/openinapp?order=eyJ6cHRyYW5zdG9rZW4iOiJBQ3hNVjJ4UVhTcUVvclBpaXJUMGFCT2ciLCJhcHBpZCI6MjU1M30=";
    cashier_order_url?: string; // "https://onelink.zalopay.vn/pay-order?order=eyJ6cHRyYW5zdG9rZW4iOiJBQ3hNVjJ4UVhTcUVvclBpaXJUMGFCT2ciLCJhcHBpZCI6MjU1M30=";
    order_token: string; // "ACxMV2xQXSqEorPiirT0aBOg";
    qr_code?: string; // "00020101021226530010vn.zalopay01061800050203001031813606640882706060738620010A00000072701320006970454011899ZP25177O015933060208QRIBFTTA5204739953037045405500005802VN630489EA";
};

// {
//     "code": -401,
//     "message": "Dữ liệu yêu cầu không hợp lệ"
// }
