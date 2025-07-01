import { ActivityIndicator, Alert, Linking, ScrollView, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
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

export default function ZalopayApp({ navigation, orderData, setPaymentStatus, setOrderStatus }: Props) {
    const [urlResult, setUrlResult] = useState('');
    const { user } = useContext(AuthContext);
    const cart = useContext(CartContext);
    const dispatch = useAppDispatch();
    const { status, data, error } = useAppSelector(state => state.order);
    const { data: zalopayData, status: zalopayStatus } = useAppSelector(state => state.zalopayMethod);

    useEffect(() => {
        if (zalopayStatus === 'succeeded') {
            const orderUrl = zalopayData.order_url;
            console.log("ZALO ORDER_URL:", zalopayData.order_url);
            Linking.openURL(orderUrl);
        }
    }, [zalopayStatus]);

    const createOrderWithStatus = (isSuccess: boolean) => {
        dispatch(createOrder({
            user: user._id,
            items: orderData.items,
            totalPrice: orderData.amount,
            shippingAddress: orderData.buyerAddress,
            status: isSuccess ? 'pending' : 'cancelled'
        }));
    };

    useEffect(() => {
        const handleRedirect = ({ url }) => {
            setUrlResult(url);
            if (url.includes('status=1')) {
                cart.clearCart();
                createOrderWithStatus(true);
            } else {
                cart.clearCart();
                createOrderWithStatus(false);
            }
        };
        const sub = Linking.addEventListener('url', handleRedirect);
        Linking.getInitialURL().then((url) => {
            if (url) handleRedirect({ url });
        });
        return () => sub.remove();
    }, []);

    useEffect(() => {
        if (status === 'succeeded') {
            console.log('ZalopayApp >> data', data);
            setOrderStatus(status);
            if (urlResult.includes('status=1')) {
                setTimeout(() => {
                    setPaymentStatus(true);
                    dispatch(refreshOrder());
                }, 5000);
            } else {
                setTimeout(() => {
                    setPaymentStatus(false);
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Tabs' }],
                    });
                    dispatch(refreshZalopay());
                }, 5000);
            };
        }
        if (status === 'failed') {
            setOrderStatus(status);
            setPaymentStatus(true);
            console.log('PayosWebView >>> error', error);
            dispatch(refreshOrder());
        }
    }, [status]);



    return (
        <View style={{
            width: '100%',
            height: '100%',
        }}>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <ActivityIndicator size="large" color="#006340" />
            </View>
        </View >
    )
}