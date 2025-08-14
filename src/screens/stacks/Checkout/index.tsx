import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BaseTransactionProps, CheckoutNav, CheckoutRoute, ProviderData } from '@/types';
import { useRequireAuth } from '@/contexts/AuthContext';
import { Provider } from '@/types';
import ScreenHeader from '@/components/ScreenHeader';
import CheckoutContent from './CheckoutContent';
import { OrderStatusModal, PaymentHandler } from './components';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { createTransaction, resetTransactionState, setTransStatus } from '@/redux/features/payment/transactionSlice';
import { showErrorToast } from '@/utils/toast';
import { useCartContext } from '@/contexts/CartContext';
import { getItem, removeItem } from '@/services/asyncStorage.service';
import { setSelectedAddress } from '@/redux/features/address/addressesSlice';
import { KEY } from '@/constants';
import { fetchUserOrders } from '@/redux/features/order/ordersSlice';

type Props = {
    navigation: CheckoutNav;
    route: CheckoutRoute;
}

export default function Checkout({ navigation, route }: Props) {
    const { items, transactionData } = route.params;
    const user = useRequireAuth();
    const { removeManyItem } = useCartContext();
    const dispatch = useAppDispatch();
    const { data, status, error, transStatus } = useAppSelector(state => state.transaction);
    const [provider, setProvider] = useState<Provider>("cod");
    const [providerData, setProviderData] = useState<ProviderData | null>(null);

    useEffect(() => {
        if (transactionData) {
            setProviderData(transactionData);
        }
    }, []);

    function handleCheckout(data: BaseTransactionProps, provider: Provider) {
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
        if (status === "succeeded" && data?.data) {
            if (provider === "cod") {
                dispatch(setTransStatus("completed"))
            } else {
                setProviderData(data.data);
            }
            removeManyItem(items.map((i) => (i.size._id)));
            dispatch(resetTransactionState());
        }
        if (status === "failed" && error) {
            showErrorToast({
                title: `Lỗi ${error.code}`,
                message: error.message
            });
            dispatch(resetTransactionState());
        }
    }, [status])

    function handleContinueShopping() {
        getItem(KEY.ADDR).then((storedAddr) => {
            if (storedAddr) {
                dispatch(setSelectedAddress(storedAddr));
                removeItem(KEY.ADDR);
            }
        });
        dispatch(setTransStatus("pending"));
        dispatch(fetchUserOrders(user._id));
        navigation.reset({
            routes: [{ name: "Tabs" }]
        });
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
                status={transStatus}
            />

            <PaymentHandler
                providerData={providerData}
                provider={provider}
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