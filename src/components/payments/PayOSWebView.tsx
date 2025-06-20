import { ScrollView, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import WebView from 'react-native-webview';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { createOrder, refresh } from '../../redux/features/order/orderSlice';
import { AuthContext } from '../../contexts/AuthContext';
import { CreateRequestReq } from '../../types';
import { CheckoutNav } from '../../navigation/NavigationTypes';
import { CartContext } from '../../contexts/CartContext';

type Props = {
    checkoutUrl: string;
    navigation: CheckoutNav;
    orderData: CreateRequestReq;
    setPaymentStatus: React.Dispatch<React.SetStateAction<boolean>>;
    setOrderStatus: React.Dispatch<React.SetStateAction<"loading" | "succeeded" | "failed">>
    refresh: () => void;
}

export default function PayOSWebView({ checkoutUrl, navigation, orderData, setPaymentStatus, setOrderStatus, refresh: refreshPayOS }: Props) {
    const [urlResult, setUrlResult] = useState('');
    const { user } = useContext(AuthContext);
    const cart = useContext(CartContext);
    const dispatch = useAppDispatch();
    const { status, data, error } = useAppSelector(state => state.order);


    useEffect(() => {
        if (status === 'succeeded') {
            setOrderStatus(status);
            if (urlResult.includes('/success')) {
                setTimeout(() => {
                    setPaymentStatus(true);
                    dispatch(refresh());
                }, 5000);
            };
            if (urlResult.includes('/cancel')) {
                setTimeout(() => {
                    setPaymentStatus(false);
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Tabs' }],
                    });
                    refreshPayOS();
                }, 5000);
            };
        }
        if (status === 'failed') {
            setOrderStatus(status);
            setPaymentStatus(true);
            console.log('PayOSWebView >>> error', error);
            dispatch(refresh());
        }
    }, [status])

    const createOrderWithStatus = (isSuccess: boolean) => {
        dispatch(createOrder({
            user: user._id,
            items: orderData.items,
            totalPrice: orderData.amount,
            shippingAddress: orderData.buyerAddress,
            status: isSuccess ? 'pending' : 'cancelled'
        }));
    }

    const handleNavigationChange = (navState) => {
        const { url, navigationType } = navState;
        setUrlResult(url);
        if (url.includes('/success')) {
            cart.clearCart();
            createOrderWithStatus(true);
        } else if (url.includes('/cancel')) {
            cart.clearCart();
            createOrderWithStatus(false);
        }
    };

    return (
        <View style={{
            width: '100%',
            height: '100%',
        }}>
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
        </View >
    )
}