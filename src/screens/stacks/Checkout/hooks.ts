import {
    PayOSResponse,
    Provider,
    ProviderData,
    ZaloPayResponse,
} from "@/types";

export const getCheckoutUrl = (
    provider: Provider,
    data: ZaloPayResponse | PayOSResponse
) => {
    switch (provider) {
        case "zalopay":
            return (data as ZaloPayResponse).order_url;

        case "payos":
            return (data as PayOSResponse).checkoutUrl;

        default:
            throw new Error(
                `Phương thức thanh toán ${provider} chưa được xử lý`
            );
    }
};

export const getOrderId = (
    provider: Provider,
    data: ZaloPayResponse | PayOSResponse
) => {
    switch (provider) {
        case "zalopay":
            return (data as ZaloPayResponse).transId;

        case "payos":
            return (data as PayOSResponse).orderCode;

        default:
            throw new Error(
                `Phương thức thanh toán ${provider} chưa được xử lý`
            );
    }
};

export function getProviderData(
    provider: Provider,
    data: ZaloPayResponse | PayOSResponse
): ProviderData {
    switch (provider) {
        case "zalopay":
            return {
                checkoutUrl: (data as ZaloPayResponse).order_url,
                transId: (data as ZaloPayResponse).transId,
            };

        case "payos":
            return {
                checkoutUrl: (data as PayOSResponse).checkoutUrl,
                transId: (data as PayOSResponse).orderCode.toString(),
            };

        default:
            throw new Error(
                `Phương thức thanh toán ${provider} chưa được xử lý`
            );
    }
}
