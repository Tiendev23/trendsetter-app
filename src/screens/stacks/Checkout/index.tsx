import { StyleSheet, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { BaseTransactionProps, CheckoutNav, CheckoutRoute, PayOSResponse, Status, ZaloPayResponse } from '@/types';
import { useRequireAuth } from '@/contexts/AuthContext';
import { Provider } from '@/types';
import ScreenHeader from '@/components/ScreenHeader';
import CheckoutContent from './CheckoutContent';
import { OrderStatusModal, PaymentHandler } from './components';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { createTransaction, resetTransactionState } from '@/redux/features/payment/transactionSlice';
import { showErrorToast } from '@/utils/toast';
import { useCartContext } from '@/contexts/CartContext';
import { getItem, removeItem } from '@/services/asyncStorage.service';
import { setSelectedAddress } from '@/redux/features/address/addressesSlice';

type Props = {
    navigation: CheckoutNav;
    route: CheckoutRoute;
}

export default function Checkout({ navigation, route }: Props) {
    const items = route.params.items;
    const user = useRequireAuth();
    const { clearCartUI } = useCartContext();
    const dispatch = useAppDispatch();
    const { data, status, error } = useAppSelector(state => state.transaction);
    const trxStatus = useRef<Status>("idle");
    const [provider, setProvider] = useState<Provider>("cod");
    const [dataResponse, setDataResponse] = useState<ZaloPayResponse | PayOSResponse | null>(null);

    function handleCheckout(data: BaseTransactionProps, provider: Provider) {
        trxStatus.current = "loading";
        const { amount, recipientName, recipientPhone, shippingAddress, shippingFee } = data;
        setProvider(provider);
        dispatch(createTransaction({
            provider,
            body: {
                amount, shippingFee, items, recipientName, recipientPhone, shippingAddress,
                userId: user._id,
                redirecturl: "trendsetter://checkout"
            }
        }))
    };

    useEffect(() => {
        if (status === "succeeded" && data) {
            trxStatus.current = status;
            switch (provider) {
                case "zalopay":
                    setDataResponse((data.data as ZaloPayResponse));
                    break;
                case "payos":
                    setDataResponse((data.data as PayOSResponse));
                    break;
                case "cod":
                    clearCartUI(items.map(item => item.size._id));
                    break;
            }
            dispatch(resetTransactionState());
        }
        if (status === "failed" && error) {
            trxStatus.current = status;
            console.error(error);

            showErrorToast({
                title: `Lỗi ${error.code}`,
                message: error.message
            });
            dispatch(resetTransactionState());
        }
    }, [status])

    function handleContinueShopping() {
        navigation.reset({
            routes: [{ name: "Tabs" }]
        });
        getItem("@Address").then((storedAddr) => {
            if (storedAddr) {
                dispatch(setSelectedAddress(storedAddr));
                removeItem("@Address");
            }
        });
    };

    function OnCancelTransaction() {
        setTimeout(() => {
            navigation.reset({
                routes: [{ name: 'Tabs' }],
            });
            dispatch(resetTransactionState());
        }, 3000);
    };



    return (
        <View style={styles.container}>
            <ScreenHeader
                title='Thanh toán'
            />

            <CheckoutContent
                navigation={navigation}
                items={items}
                user={user}
                handleCheckout={
                    (data: BaseTransactionProps, provider: Provider) => handleCheckout(data, provider)
                }
            />

            <OrderStatusModal
                handleContinueShopping={handleContinueShopping}
                status={trxStatus.current}
            />

            <PaymentHandler
                dataResponse={dataResponse}
                handleClearCart={() =>
                    clearCartUI(items.map(item => item.size._id))
                }
                provider={provider}
                OnCancelTransaction={OnCancelTransaction}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F9'
    },

    container2: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: 'gray'
    }
})