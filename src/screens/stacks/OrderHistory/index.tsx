import { StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import { OrdHistNav } from '@/types/navigation';
import { ScreenHeader } from '@/components';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchUserOrders } from '@/redux/features/order/ordersSlice';
import { useRequireAuth } from '@/contexts/AuthContext';
import OrderHistoryContent from './OrderHistoryContent';
import { showErrorToast } from '@/utils/toast';

export default function OrderHistory({ navigation }: { navigation: OrdHistNav }) {
    const dispatch = useAppDispatch();
    const { status, error } = useAppSelector(state => state.orders);
    const userId = useRequireAuth()._id;

    useEffect(() => {
        dispatch(fetchUserOrders(userId));
    }, []);

    useEffect(() => {
        if (status === 'failed' && error) {
            showErrorToast({
                title: `Lỗi ${error.code}`,
                message: error.message
            });
            dispatch(fetchUserOrders(userId));
        }
    }, [status]);

    return (
        <View style={styles.container}>
            <ScreenHeader
                title='Đơn Hàng'
            />

            <OrderHistoryContent
                navigation={navigation}
                userId={userId}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})