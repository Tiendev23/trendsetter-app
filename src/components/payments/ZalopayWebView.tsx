import { ActivityIndicator, Alert, Linking, ScrollView, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import WebView from 'react-native-webview';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { createOrder, refresh as refreshOrder } from '../../redux/features/order/orderSlice';
import { refresh as refreshZalopay } from '../../redux/features/payment/zalopaySlice';
import { AuthContext } from '../../contexts/AuthContext';
import { CreateOrderReq } from '../../types';
import { CheckoutNav } from '../../navigation/NavigationTypes';
import { CartContext } from '../../contexts/CartContext';

type Props = {
    navigation: CheckoutNav;
    orderData: CreateOrderReq;
    setPaymentStatus: React.Dispatch<React.SetStateAction<boolean>>;
    setOrderStatus: React.Dispatch<React.SetStateAction<"loading" | "succeeded" | "failed">>
}

export default function ZalopayWebView({ navigation, orderData, setPaymentStatus, setOrderStatus }: Props) {
    const [isPaid, setPaid] = useState<boolean>(false);
    const [hasHandled, setHasHandled] = useState(false);
    const { user } = useContext(AuthContext);
    const cart = useContext(CartContext);
    const dispatch = useAppDispatch();
    const { status, data, error } = useAppSelector(state => state.order);

    const { data: zalopayData, status: zalopayStatus } = useAppSelector(state => state.zalopayMethod);
    const [checkoutUrl, setCheckoutUrl] = useState('');

    useEffect(() => {
        if (zalopayStatus === 'succeeded') {
            setCheckoutUrl(zalopayData.order_url);
            Linking.openURL(zalopayData.order_url);
        }
    }, [zalopayStatus]);


    useEffect(() => {
        if (status === 'succeeded') {
            console.log('ZalopayWebView > data', data);
            setOrderStatus(status);
            if (isPaid) {
                setTimeout(() => {
                    setPaymentStatus(true);
                    dispatch(refreshOrder());
                }, 3000);
            } else {
                setTimeout(() => {
                    setPaymentStatus(false);
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Tabs' }],
                    });
                    dispatch(refreshZalopay());
                }, 3000);
            };
        }
        if (status === 'failed') {
            setOrderStatus(status);
            setPaymentStatus(true);
            console.log('PayosWebView > error', error);
            dispatch(refreshOrder());
        }
    }, [status]);

    const createOrderWithStatus = (isSuccess: boolean) => {
        dispatch(createOrder({
            user: user._id,
            items: orderData.items,
            totalPrice: orderData.amount,
            shippingAddress: orderData.buyerAddress,
            status: isSuccess ? 'pending' : 'cancelled'
        }));
    };

    const handleNavigationChange = (navState) => {
        const { url, navigationType } = navState;
        if (isPaid) return;
        if (url.includes('payments/succeeded?')) {
            if (url.includes('status=1')) {
                cart.clearCart();
                setPaid(true);
                createOrderWithStatus(true);
            } else {
                cart.clearCart();
                setPaid(true);
                createOrderWithStatus(false);
            }
        }
    };

    return (
        <View style={{
            width: '100%',
            height: '100%',
        }}>
            {
                !checkoutUrl ?
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <ActivityIndicator size="large" color="#006340" />
                    </View>
                    :
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1 }}
                        style={{ flex: 1 }}
                    >
                        <WebView
                            source={{ uri: checkoutUrl }}
                            style={{ flex: 1 }}
                            javaScriptEnabled={true}
                            domStorageEnabled={true}
                            scalesPageToFit={true}
                            onNavigationStateChange={handleNavigationChange}
                        />
                    </ScrollView>
            }
        </View >
    )
}