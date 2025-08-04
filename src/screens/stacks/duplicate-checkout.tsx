import { ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { CheckoutNav } from '../../types/navigation';
import ChevronButton from '../../components/buttons/ChevronButton';
import { CartContext } from '../../contexts/CartContext';
import { formatCurrency } from '../../utils/formatForm';
import CustomButton from '../../components/buttons/CustomButton';
import InfoContainer from '../../components/InfoContainer';
import { AuthContext } from '../../contexts/AuthContext';
import OrderDetailsItem from '../../components/listItems/OrderDetail';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { CreateOrderReq } from '../../types/models';
import PaymentMethod from '../../components/listItems/PaymentMethod';
import { fetchAllMethods, refresh as paymentsRefresh, setSelectedMethod } from '../../redux/features/payment/paymentsSlice';
import Skeleton from '../../components/loaders/Skeleton';
import ScreenHeader from '../../components/ScreenHeader';
import { checkoutByProvider, getProviderFromMethod } from '../../services/payment/CheckoutHandler';
import PaymentController from '../../components/payments/PaymentController';
import OrderNotification from '../../components/payments/OrderNotification';
import { BlurView } from 'expo-blur';
import { refresh } from '../../redux/features/order/orderSlice';

export default function Checkout({ navigation }: { navigation: CheckoutNav }) {
    const { user } = useContext(AuthContext);
    const cart = useContext(CartContext);

    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState('0938428870');
    const [address, setAddress] = useState('Tòa nhà QTSC9 (toà T), đường Tô Ký, phường Tân Chánh Hiệp, quận 12, TP HCM');

    const dispatch = useAppDispatch();
    const { status, data, error } = useAppSelector(state => state.payments);
    const selectedMethod = useAppSelector(state => state.payments.selectedMethod);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const subtotal = cart.getSubtotal() + 20000;

    const [orderData, setOrderData] = useState<CreateOrderReq | null>(null);
    const [isPaymentSucceeded, setPaymentStatus] = useState(false);
    const [orderStatus, setOrderStatus] = useState<'loading' | 'succeeded' | 'failed'>('loading');

    useEffect(() => {
        dispatch(fetchAllMethods())
    }, []);
    useEffect(() => {
        if (status === 'succeeded') {
            setPaymentMethods(data);
            dispatch(setSelectedMethod(data[0]))
        }
        if (status === 'failed') {
            console.log('Checkout >>> payments', error);
            dispatch(paymentsRefresh())
        }
    }, [status]);

    const handleCheckout = () => {
        const data: CreateOrderReq = {
            buyerName: user.fullName,
            buyerEmail: user.email,
            buyerPhone: phone,
            buyerAddress: address,
            items: cart.items,
            amount: subtotal
        };
        setOrderData(data);
        const provider = getProviderFromMethod(selectedMethod.name);
        checkoutByProvider(provider, data, dispatch);
    }

    return (
        <View style={styles.container}>
            <ScreenHeader
                title='Thanh toán'
            />

            <ScrollView>
                <View style={styles.scrollContainer}>
                    {/* Thông tin liên hệ */}
                    <View style={styles.contentContainer}>
                        <Text style={styles.contentLabel}>Thông tin liên hệ</Text>
                        <View style={{ gap: 10 }}>
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
                    <View style={styles.contentContainer}>
                        <Text style={styles.contentLabel}>Địa chỉ</Text>
                        <Text
                            numberOfLines={2}
                            ellipsizeMode='tail'
                        >
                            {address}
                        </Text>
                    </View>
                    {/* Danh sách sản phẩm */}
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
                                status !== 'succeeded' ?
                                    <Skeleton width={'100%'} height={50} /> :
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate('MethodSelection', {
                                                paymentMethods,
                                                method: selectedMethod
                                            });
                                        }}
                                        style={styles.rowWrapper}
                                    >
                                        <PaymentMethod
                                            method={selectedMethod}
                                            isHideRadio
                                            disabled
                                        />
                                        <ChevronButton
                                            direction='forward'
                                            size={18}
                                            color={'#707B81'}
                                            disabled
                                        />
                                    </TouchableOpacity>
                            }
                        </View>
                    </View>
                </View>
            </ScrollView >

            {/* Bảng giá */}
            <View style={styles.pricingPanel} >
                <View style={{ gap: 10 }}>
                    <View style={styles.rowWrapper}>
                        <Text style={[styles.label, styles.gray]}>Tạm tính</Text>
                        <Text style={styles.label}>{formatCurrency(cart.getSubtotal())}</Text>
                    </View>
                    <View style={styles.rowWrapper}>
                        <Text style={[styles.label, styles.gray]}>Phí giao hàng</Text>
                        <Text style={styles.label}>{formatCurrency(20000)}</Text>
                    </View>
                </View>
                <View style={styles.dashedLine} />
                <View style={styles.rowWrapper}>
                    <Text style={styles.label}>Tổng cộng</Text>
                    <Text style={[styles.label, styles.green]}>{formatCurrency(subtotal)}</Text>
                </View>
                <CustomButton
                    title='Thanh Toán'
                    onLongPress={handleCheckout}
                />
            </View>
            {
                orderData &&
                <BlurView intensity={8} style={styles.blurBackground}>
                    {
                        !isPaymentSucceeded ?
                            <PaymentController
                                provider={getProviderFromMethod(selectedMethod.name)}
                                navigation={navigation}
                                orderData={orderData}
                                setOrderStatus={setOrderStatus}
                                setPaymentStatus={setPaymentStatus}
                            />
                            : (
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
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F9'
    },
    pricingPanel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        gap: 16,
        paddingBottom: 30
    },
    rowWrapper: {
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
        padding: 18,
        gap: 18,
        flex: 1,
    },
    contentContainer: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 16,
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