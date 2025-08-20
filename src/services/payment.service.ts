import rawData from "@/data/paymentMethod.json";
import { BaseMethodProps, PaymentMethod, Provider } from "@/types";

const logoMap: Record<Provider, any> = {
    cod: require("@/../assets/icons/cash.png"),
    payos: require("@/../assets/icons/payos.png"),
    zalopay: require("@/../assets/icons/zalopay.png"),
};

const getLogoSource = (provider: Provider) => logoMap[provider];

const methods = (rawData as BaseMethodProps[]).map((m) => ({
    ...m,
    logo: getLogoSource(m.provider),
}));

export function getAllMethods(): PaymentMethod[] {
    return methods;
}

export function getMethod(provider: Provider): PaymentMethod {
    const method = methods.find((m) => m.provider === provider);
    if (!method) throw new Error("Phương thức thanh toán không được hỗ trợ");
    return method;
}
