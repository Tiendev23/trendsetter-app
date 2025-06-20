import { ActivityIndicator, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { CheckoutNav } from '../../navigation/NavigationTypes';
import CustomDirectionButton from '../../components/buttons/ChevronButton';
import { CartContext } from '../../contexts/CartContext';
import { formatCurrency } from '../../utils/formatForm';
import CustomButton from '../../components/buttons/CustomButton';
import InfoContainer from '../../components/InfoContainer';
import { AuthContext } from '../../contexts/AuthContext';
import OrderDetailsItem from '../../components/listItems/OrderDetail';
import PayOSWebView from '../../components/payments/PayOSWebView';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { createPayOSPayment, refresh } from '../../redux/features/payment/payOSSlice';
import { BlurView } from 'expo-blur';
import OrderNotification from '../../components/OrderNotification';
import { CreateRequestReq, Payment } from '../../types';
import PaymentMethod from '../../components/listItems/PaymentMethod';
import { getAllPaymentMethods, refresh as paymentsRefresh } from '../../redux/features/payment/paymentsSlice';
import Skeleton from '../../components/loaders/Skeleton';

export default function Checkout({ navigation }: { navigation: CheckoutNav }) {
    const { user } = useContext(AuthContext);
    const cart = useContext(CartContext);
    const dispatch = useAppDispatch();
    const { status: paymentsStatus, data: paymentsData, error: paymentsError } = useAppSelector(state => state.payments);
    const { status, data, error } = useAppSelector(state => state.payOSMethod);

    const [paymentMethods, setPaymentMethods] = useState([{
        _id: '6854804db5eb5385e4c3d777',
        logo: 'https://res.cloudinary.com/trendsetter/image/upload/v1750373123/payos_method_dfxheh.png',
        name: 'Thanh toán qua MB Bank (PayOS)'
    },
    {
        _id: '6854804db5eb5385e4c3d778',
        logo: 'https://res.cloudinary.com/trendsetter/image/upload/v1750373123/payos_method_dfxheh.png',
        name: 'Thanh toán qua MB Bank 2 (PayOS)'
    }]);

    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState('0938428870');
    const [address, setAddress] = useState('Tòa nhà QTSC9 (toà T), đường Tô Ký, phường Tân Chánh Hiệp, quận 12, TP HCM');
    const [selectedMethod, setSelectedMethod] = useState<Payment>(paymentMethods[0]);

    const [paymentUrl, setPaymentUrl] = useState('');
    const [isPaymentSucceeded, setPaymentStatus] = useState(false);
    const [orderStatus, setOrderStatus] = useState<'loading' | 'succeeded' | 'failed'>('loading');
    const [orderData, setOrderData] = useState<CreateRequestReq | null>(null);
    const subtotal = cart.getSubtotal() + 20000;

    const handlePayment = () => {
        const data: CreateRequestReq = {
            buyerName: user.fullName,
            buyerEmail: user.email,
            buyerPhone: phone,
            buyerAddress: address,
            items: cart.items,
            amount: subtotal
        };
        setOrderData(data);
    }

    useEffect(() => {
        dispatch(getAllPaymentMethods())
    }, []);

    useEffect(() => {
        if (paymentsStatus === 'succeeded') {
            setPaymentMethods(paymentsData);
            setSelectedMethod(paymentsData[0]);
        }
        if (paymentsStatus === 'failed') {
            console.log('Checkout >>> payments', paymentsError);
            dispatch(paymentsRefresh())
        }
    }, [paymentsStatus])


    useEffect(() => {
        if (orderData != null) {
            dispatch(createPayOSPayment(orderData));
        }
    }, [orderData]);

    useEffect(() => {
        if (status === 'succeeded') {
            console.log('data', data);
            setPaymentUrl(data);
        }
        if (status === 'failed') {
            setTimeout(() => {
                dispatch(refresh());
            }, 5000);
        }
    }, [status])

    return (
        <View style={styles.container}>
            {/* header */}
            <View>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerTitle}>
                        Thanh Toán
                    </Text>
                </View>
                <View style={styles.headerActions}>
                    <CustomDirectionButton
                        direction="back"
                        onPress={() => navigation.goBack()}
                    />
                </View>
            </View>

            <ScrollView style={styles.scrollContainer}>
                {/* Thông tin liên hệ */}
                <View style={[styles.contentContainer, { paddingBottom: 0 }]}>
                    <Text style={styles.contentLabel}>Địa chi Email</Text>
                    <View>
                        <InfoContainer
                            type='mail'
                            value={email}
                            onChangeText={setEmail}
                        />
                        <InfoContainer
                            type='call'
                            value={phone}
                            onChangeText={setPhone}
                        />
                    </View>
                </View>

                {/* Địa chỉ */}
                <View style={styles.contentContainer}>
                    <Text style={styles.contentLabel}>Địa chỉ</Text>
                    <Text
                        numberOfLines={2}
                        ellipsizeMode='tail'
                    >
                        {address}
                    </Text>
                </View>

                <View style={styles.contentContainer}>
                    <Text style={styles.contentLabel}>Danh sách sản phẩm</Text>
                    <View>
                        <FlatList
                            data={cart.items}
                            // extraData={cartItems}
                            renderItem={({ item }) => <OrderDetailsItem item={item} />}
                            scrollEnabled={false} // Tắt cuộn riêng của FlatList
                            nestedScrollEnabled={true} // Cho phép cuộn bên trong ScrollView
                            contentContainerStyle={{ gap: 16 }}
                        />
                    </View>
                </View>

                {/* Phương thức thanh toán */}
                <View style={styles.contentContainer}>
                    <Text style={styles.contentLabel}>Phương thức thanh toán</Text>
                    <View >
                        {
                            paymentsStatus !== 'succeeded' ?
                                <Skeleton width={'100%'} height={50} /> :
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate('MethodSelection', {
                                            paymentMethods,
                                            method: selectedMethod,
                                            setMethod: setSelectedMethod
                                        });
                                    }}
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <PaymentMethod
                                        method={selectedMethod}
                                        isHideRadio
                                        disabled
                                    />
                                    <CustomDirectionButton
                                        direction='forward'
                                        size={18}
                                        color={'#707B81'}
                                        disabled
                                    />
                                </TouchableOpacity>
                        }
                    </View>
                </View>
            </ScrollView >

            {/* Bảng giá */}
            <View style={styles.pricingPanel} >
                <View style={{ gap: 10 }}>
                    <View style={styles.priceWrapper}>
                        <Text style={[styles.label, styles.gray]}>Tạm tính</Text>
                        <Text style={styles.label}>{formatCurrency(cart.getSubtotal())}</Text>
                    </View>
                    <View style={styles.priceWrapper}>
                        <Text style={[styles.label, styles.gray]}>Phí giao hàng</Text>
                        <Text style={styles.label}>{formatCurrency(cart.getSubtotal())}</Text>
                    </View>
                </View>
                <View style={styles.dashedLine} />
                <View style={styles.priceWrapper}>
                    <Text style={styles.label}>Tổng cộng</Text>
                    <Text style={[styles.label, styles.green]}>{formatCurrency(subtotal)}</Text>
                </View>
                <CustomButton
                    title='Thanh Toán'
                    onLongPress={handlePayment}
                />
            </View>
            {
                status !== 'idle' &&
                <BlurView intensity={8} style={styles.blurBackground}>
                    {
                        !isPaymentSucceeded ? (
                            !paymentUrl ?
                                <ActivityIndicator color={'green'} size={'large'} />
                                :
                                <PayOSWebView
                                    checkoutUrl={paymentUrl}
                                    orderData={orderData}
                                    navigation={navigation}
                                    setPaymentStatus={setPaymentStatus}
                                    setOrderStatus={setOrderStatus}
                                    refresh={() => dispatch(refresh())}
                                />
                        ) : (
                            orderStatus === 'loading' ?
                                <ActivityIndicator color={'green'} size={'large'} />
                                :
                                <OrderNotification
                                    status={orderStatus}
                                    onPress={() => {
                                        dispatch(refresh());
                                        navigation.reset({
                                            routes: [{ name: 'Tabs' }],
                                        });
                                    }}
                                />
                        )
                    }
                </BlurView>
            }
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F9'
    },
    headerContainer: {
        backgroundColor: '#FFF',
        paddingVertical: 22,
        paddingHorizontal: 18,
    },
    headerTitle: {
        fontWeight: '600',
        fontStyle: 'italic',
        fontSize: 20,
        color: '#006340',
        textAlign: 'center',
    },
    headerActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
        height: '100%',
        paddingHorizontal: 18,
    },

    pricingPanel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        gap: 16,
        paddingBottom: 30
    },
    priceWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    label: {
        fontWeight: '500',
        fontSize: 16,
    },
    gray: {
        color: '#707B81'
    },
    green: {
        color: '#006340'
    },
    dashedLine: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#707B81',
        borderStyle: 'dashed',
    },

    scrollContainer: {
        flexDirection: 'column',
        padding: 18,
        flex: 1,
    },
    contentContainer: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 16,
        marginBottom: 18,
        gap: 12,
    },
    contentLabel: {
        fontWeight: '500',
        fontSize: 16,
    },

    blurBackground: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: 'rgba(26,37,48,0.2)'
    },

    successPaymentContainer: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        width: '85%',
        paddingVertical: 40,
        paddingHorizontal: 45,
        gap: 24,
        borderRadius: 20,
    },
    successPaymentText: {
        fontSize: 20,
        lineHeight: 28,
        color: '#2B2B2B',
        fontWeight: '500'
    },
})