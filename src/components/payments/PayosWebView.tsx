import { ActivityIndicator, ScrollView, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import WebView from 'react-native-webview';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { createOrder, refresh as refreshOrder } from '../../redux/features/order/orderSlice';
import { refresh as refreshPayos } from '../../redux/features/payment/payosSlice';
import { AuthContext } from '../../contexts/AuthContext';
import { CreateOrderReq } from '../../types/models';
import { CheckoutNav } from '../../navigation/NavigationTypes';
import { CartContext } from '../../contexts/CartContext';

type Props = {
    navigation: CheckoutNav;
    orderData: CreateOrderReq;
    setPaymentStatus: React.Dispatch<React.SetStateAction<boolean>>;
    setOrderStatus: React.Dispatch<React.SetStateAction<"loading" | "succeeded" | "failed">>
}

export default function PayosWebView({ navigation, orderData, setPaymentStatus, setOrderStatus }: Props) {
    const [isPaid, setPaid] = useState<boolean>(false);
    const [urlResult, setUrlResult] = useState('');
    const { user } = useContext(AuthContext);
    const cart = useContext(CartContext);
    const dispatch = useAppDispatch();
    const { status, data, error } = useAppSelector(state => state.order);

    const { data: payosData, status: payosStatus } = useAppSelector(state => state.payosMethod);
    const [checkoutUrl, setCheckoutUrl] = useState('');

    useEffect(() => {
        if (payosStatus === 'succeeded') setCheckoutUrl(payosData.data.checkoutUrl);
    }, [payosStatus]);

    useEffect(() => {
        if (status === 'succeeded') {
            console.log('PayosWebView >> data', data);
            setOrderStatus(status);
            if (urlResult.includes('/succeeded')) {
                setTimeout(() => {
                    setPaymentStatus(true);
                    dispatch(refreshOrder());
                }, 3000);
            };
            if (urlResult.includes('/cancelled')) {
                setTimeout(() => {
                    setPaymentStatus(false);
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Tabs' }],
                    });
                    dispatch(refreshPayos());
                }, 3000);
            };
        }
        if (status === 'failed') {
            setOrderStatus(status);
            setPaymentStatus(true);
            console.log('PayosWebView >>> error', error);
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
        setUrlResult(url);
        if (isPaid) return
        if (url.includes('/succeeded')) {
            cart.clearAllItems();
            setPaid(true);
            createOrderWithStatus(true);
        } else if (url.includes('/cancelled')) {
            cart.clearAllItems();
            setPaid(true);
            createOrderWithStatus(false);
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