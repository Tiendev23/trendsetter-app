import { CreateOrderReq, Payment, PaymentProvider } from "../../types";
import PayosWebView from "./PayosWebView";
import { Text } from "react-native";
import { CheckoutNav } from "../../navigation/NavigationTypes";
import ZalopayWebView from "./ZalopayWebView";
import ZalopayApp from "./ZalopayApp";

type Props = {
    provider: PaymentProvider;
    navigation: CheckoutNav;
    orderData: CreateOrderReq;
    setPaymentStatus: React.Dispatch<React.SetStateAction<boolean>>;
    setOrderStatus: React.Dispatch<React.SetStateAction<"loading" | "succeeded" | "failed">>;
};

export default function PaymentController(props: Props) {
    const { provider, ...rest } = props;

    switch (provider) {
        case PaymentProvider.PAYOS:
            return <PayosWebView {...rest} />;
        case PaymentProvider.ZALOPAY:
            return <ZalopayWebView {...rest} />;
        default:
            return <Text>Phương thức chưa được hỗ trợ!</Text>;
    }
}