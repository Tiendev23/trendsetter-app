import { createPayosOrder } from "../redux/features/payment/payosSlice";
import { createZalopayOrder } from "../redux/features/payment/zalopaySlice";
import { AppDispatch } from "../redux/store";
import {
    CreateOrderReq,
    PaymentProvider,
    PayosCreateRes,
    ZalopayCreateRes,
} from "../types";

export const getProviderFromMethod = (methodName: string): PaymentProvider => {
    const lower = methodName.toLowerCase();
    if (lower.includes("payos")) return PaymentProvider.PAYOS;
    if (lower.includes("zalo")) return PaymentProvider.ZALOPAY;
    return PaymentProvider.PAYOS;
};

export const checkoutByProvider = (
    provider: PaymentProvider,
    data: CreateOrderReq,
    dispatch: AppDispatch
) => {
    switch (provider) {
        case PaymentProvider.PAYOS:
            return dispatch(createPayosOrder(data));
        case PaymentProvider.ZALOPAY:
            return dispatch(createZalopayOrder(data));
        default:
            throw new Error("Phương thức thanh toán chưa được hỗ trợ");
    }
};

export const handlePaymentResult = (
    provider: PaymentProvider,
    data: PayosCreateRes | ZalopayCreateRes,
    setCheckoutUrl: (url: string) => void
) => {
    switch (provider) {
        case PaymentProvider.PAYOS:
            // Linking.openURL(data.order_url);
            setCheckoutUrl((data as PayosCreateRes).data.checkoutUrl);
            break;
        case PaymentProvider.ZALOPAY:
            setCheckoutUrl((data as ZalopayCreateRes).order_url);
            break;
        default:
            break;
    }
};
