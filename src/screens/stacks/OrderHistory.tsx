import { StyleSheet, useWindowDimensions, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { OrderNav } from '../../types/navigation';
import ScreenHeader from '../../components/ScreenHeader';
import { TabBar, TabView } from 'react-native-tab-view';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import OrderScene from '../../components/OrderScene';
import { fetchOrdersByUser, refreshOrdersState } from '../../redux/features/order/ordersSlice';
import { Order } from '../../types/models';
import { AuthContext, useRequireAuth } from '../../contexts/AuthContext';
import { showErrorToast } from '@/utils/toast';
import { OnLoading } from '@/components';

const routes = [
    { key: 'all', title: 'Tất cả' },
    { key: 'pending', title: 'Đang xử lý' },
    { key: 'confirmed', title: 'Đã xác nhận' },
    { key: 'shipping', title: 'Đang giao' },
    { key: 'delivered', title: 'Đã giao' },
    { key: 'cancelled', title: 'Đã huỷ' },
];

export default function OrderHistory({ navigation }: { navigation: OrderNav }) {
    const layout = useWindowDimensions();
    const userId = useRequireAuth()._id;
    const [index, setIndex] = useState(0);
    const dispatch = useAppDispatch();
    const { status, error } = useAppSelector(state => state.orders);
    const orders = useAppSelector(state => state.orders.data?.data);

    useEffect(() => {
        dispatch(fetchOrdersByUser(userId));
    }, [])

    if (status === 'loading' || status === 'failed' || !orders) {
        if (error) {
            showErrorToast({
                title: `Lỗi ${error.code}`,
                message: error.message
            });
            dispatch(fetchOrdersByUser(userId));
        }
        return (<OnLoading />)
    };

    const filterOrdersByRouteKey = (key: string, data: Order[]): Order[] => {
        if (key === 'all') return data;
        return data.filter(order => order.status === key);
    };

    return (
        <View style={styles.container}>
            {/* header */}
            <ScreenHeader
                title='Đơn Hàng'
            />

            <View style={{ flex: 1 }}>
                <TabView
                    navigationState={{ index, routes }}
                    onIndexChange={setIndex}
                    renderScene={({ route }) => {
                        const filteredOrders = filterOrdersByRouteKey(route.key, orders);
                        return <OrderScene data={filteredOrders} navigation={navigation} />;
                    }}
                    initialLayout={{ width: layout.width }}
                    renderTabBar={props => (
                        <TabBar
                            {...props}
                            scrollEnabled
                            activeColor="#006340"
                            inactiveColor="gray"
                            indicatorStyle={{
                                backgroundColor: '#006340',
                                height: 2,
                                width: '0.15%'
                            }}
                            indicatorContainerStyle={{ backgroundColor: 'white', }}
                            tabStyle={{ width: 'auto' }}
                            style={{ backgroundColor: 'white' }}
                        />
                    )}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

})