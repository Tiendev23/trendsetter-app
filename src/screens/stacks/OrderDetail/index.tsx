import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { ScreenHeader } from '@/components';
import { OrdDetailNav, OrdDetailRoute } from '@/types';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchOrderById, refreshOrderState } from '@/redux/features/order/orderSlice';
import { showErrorToast } from '@/utils/toast';
import OrderDetailContent from './OrderDetailContent';
import { useRefresh } from '@/hooks/useRefresh';

type Props = {
    navigation: OrdDetailNav;
    route: OrdDetailRoute
};

export default function OrderDetail({ navigation, route }: Props) {
    const orderId = route.params.orderId;
    const dispatch = useAppDispatch();
    const { status, error } = useAppSelector(state => state.order);
    const order = useAppSelector(state => state.order.data?.data);
    const { refreshing, onRefresh } = useRefresh(() => fetchOrderById(orderId));

    useEffect(() => {
        dispatch(fetchOrderById(orderId));
    }, []);

    useEffect(() => {
        if (status === 'failed' && error) {
            showErrorToast({
                title: `Lỗi ${error.code}`,
                message: error.message
            });
            dispatch(fetchOrderById(orderId));
        }
    }, [status]);
    
    const refreshState = () => {
        dispatch(refreshOrderState());
    }

    return (
        <View style={styles.container}>
            <ScreenHeader
                title='Đơn hàng'
            />

            <OrderDetailContent
                navigation={navigation}
                order={order}
                refreshing={refreshing}
                onRefresh={onRefresh}
                refreshState={refreshState}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});