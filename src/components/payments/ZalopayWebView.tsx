import { ActivityIndicator, ScrollView, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import WebView, { WebViewNavigation } from 'react-native-webview';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { createOrder, refresh as refreshOrder } from '../../redux/features/order/orderSlice';
import { refresh as refreshZalopay } from '../../redux/features/payment/zalopaySlice';
import { AuthContext } from '../../contexts/AuthContext';
import { CreateOrderReq } from '../../types/models';
import { CheckoutNav } from '../../types/navigation';
import { CartContext } from '../../contexts/CartContext';
import * as Linking from 'expo-linking';
import { showSuccessToast } from '../../utils/toast';

type Props = {
    navigation: CheckoutNav;
    orderData: CreateOrderReq;
    setPaymentStatus: React.Dispatch<React.SetStateAction<boolean>>;
    setOrderStatus: React.Dispatch<React.SetStateAction<"loading" | "succeeded" | "failed">>
}

export default function ZalopayWebView({ navigation, orderData, setPaymentStatus, setOrderStatus }: Props) {
    const [hasHandled, setHandled] = useState<boolean>(false);
    const [isPaid, setPaid] = useState<boolean>(false);
    const { user } = useContext(AuthContext);
    const cart = useContext(CartContext);
    const dispatch = useAppDispatch();
    const { status, data, error } = useAppSelector(state => state.order);

    const { data: zalopayData, status: zalopayStatus, error: zalopayErr } = useAppSelector(state => state.zalopayMethod);
    const [checkoutUrl, setCheckoutUrl] = useState('');

    useEffect(() => {
        if (zalopayStatus === 'succeeded') {
            setCheckoutUrl(zalopayData.order_url);
        }
        if (zalopayStatus === 'failed') {
            showSuccessToast('Không thể tạo đơn hàng Zalopay', zalopayErr?.message || 'Vui lòng thử lại sau');
            setTimeout(() => {
                dispatch(refreshZalopay());
            }, 3000);
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

    const handleNavigationChange = (navState: WebViewNavigation) => {
        const { url } = navState;
        console.log('url', url);
        if (hasHandled) return;
        console.log('you here 1');
        if (url.includes('result?')) {
            // const query = new URL(url).searchParams;
            // console.log('query', query);
            // const code = query.get('code');
            // console.log('code', code);
            if (!url.includes('returncode=1')) {
                console.log('you here 2.1');
                setPaid(false);
                createOrderWithStatus(false);
            } else {
                console.log('you here 2.2');
                setPaid(true);
                createOrderWithStatus(true);
            }
            cart.clearAllItems();
            setHandled(true);
        }
        console.log('you here 3');
    };

    useEffect(() => {
        if (status === 'succeeded') {
            console.log('ZalopayWebView > data', data);
            setOrderStatus(status);
            if (isPaid) {
                setTimeout(() => {
                    setPaymentStatus(isPaid);
                    dispatch(refreshZalopay());
                }, 3000);
            } else {
                setTimeout(() => {
                    setPaymentStatus(isPaid);
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
            setPaymentStatus(isPaid);
            console.log('ZalopayWebView > error', error);
            dispatch(refreshZalopay());
            dispatch(refreshOrder());
        }
    }, [status]);

    /** Thao tác deeplink
     *  useEffect(() => {
     *      const checkURL = async () => {
     *          const initialURL = await Linking.getInitialURL();
     *          if (initialURL) {
     *              console.log("Deep link được mở với:", initialURL);
     *              const path = Linking.parse(initialURL).path;
     *              console.log("Đường dẫn deep link:", path);
     *          }
     *      };
     *      checkURL();
     *  }, []);
     *  
     *  useEffect(() => {
     *      const handleDeepLink = (event: { url: string }) => {
     *          console.log('Deel link received:', event.url);
     *      };
     *      const subscription = Linking.addEventListener('url', handleDeepLink);
     *      return () => { subscription.remove(); }
     *  }, []);
     */

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
                            // javaScriptEnabled={true}
                            // domStorageEnabled={true}
                            scalesPageToFit={true}
                            setSupportMultipleWindows={false}
                            onNavigationStateChange={handleNavigationChange}
                            startInLoadingState
                            renderLoading={() => <ActivityIndicator size={'large'} color={'#006340'} />}
                        />
                    </ScrollView>
            }
        </View >
    )
}