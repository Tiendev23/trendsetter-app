import rawData from "@/data/paymentMethod.json";
import { BaseMethodProps, PaymentMethod, Provider } from "@/types";

const methods = rawData as BaseMethodProps[];

const logoMap: Record<Provider, any> = {
    cod: require("@/../assets/icons/cash.png"),
    payos: require("@/../assets/icons/payos.png"),
    zalopay: require("@/../assets/icons/zalopay.png"),
};

const getLogoSource = (provider: Provider) => logoMap[provider];

export function getAllMethods(): PaymentMethod[] {
    return methods.map((m) => ({ ...m, logo: getLogoSource(m.provider) }));
}
