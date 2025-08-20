import { Dimensions, Pressable, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { OrdHistNav } from '@/types/navigation';
import { TabBar, TabView } from 'react-native-tab-view';
import { useAppSelector } from '@/redux/hooks';
import { OrderPreview } from '@/types/models';
import { OnLoading } from '@/components';
import { OrderScene, SearchBar } from './components';
import { ObjectId } from '@/types';
import CustomInput from '@/components/CustomInput';
import { Ionicons } from '@expo/vector-icons';
import { toNumber } from 'lodash';

const routes = [
    { key: 'all', title: 'Tất cả' },
    { key: 'pending', title: 'Đang xử lý' },
    { key: 'confirmed', title: 'Đã xác nhận' },
    { key: 'shipping', title: 'Đang giao' },
    { key: 'delivered', title: 'Đã giao' },
    { key: 'cancelled', title: 'Đã huỷ' },
];

type Props = {
    navigation: OrdHistNav;
    userId: ObjectId;
    visibleSearchBar: boolean;
}

const { width } = Dimensions.get('window');
export default function OrderHistoryContent({ navigation, userId, visibleSearchBar }: Props) {
    const [index, setIndex] = useState(0);
    const orders = useAppSelector(state => state.orders.data?.data);
    const [filterValue, setFilterValue] = useState("");

    if (!orders) {
        return (
            <View style={styles.container}>
                <View style={StyleSheet.absoluteFill}>
                    <OnLoading />
                </View>
            </View>
        )
    };

    const filterOrdersByRouteKey = (key: string, data: OrderPreview[]): OrderPreview[] => {
        const orders = data.filter(order => (
            order.transaction.providerTransactionId === filterValue
            || order.transaction.amount.toString().match(filterValue)
            || order.items.some(item => item.name.toLowerCase().match(filterValue.toLowerCase()))
        ));
        return (key === 'all')
            ? orders
            : orders.filter(order => (order.status === key));
    };

    return (
        <View style={styles.container}>
            <SearchBar
                visible={visibleSearchBar}
                filterValue={filterValue}
                setFilterValue={setFilterValue}
            />
            <TabView
                navigationState={{ index, routes }}
                onIndexChange={setIndex}
                renderScene={({ route }) => {
                    const filteredOrders = filterOrdersByRouteKey(route.key, orders);
                    return (
                        <OrderScene
                            orders={filteredOrders}
                            navigation={navigation}
                            userId={userId}
                        />
                    );
                }}
                initialLayout={{ width }}
                renderTabBar={props => (
                    <TabBar
                        {...props}
                        scrollEnabled
                        activeColor="#006340"
                        inactiveColor="gray"
                        indicatorStyle={styles.indicator}
                        indicatorContainerStyle={styles.tabContainer}
                        tabStyle={styles.tab}
                        style={styles.tabContainer}
                    />
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabContainer: {
        backgroundColor: "#FFFFFF"
    },
    indicator: {
        backgroundColor: '#006340',
        height: 2,
        width: '0.15%'
    },
    tab: {
        width: 'auto',
    },
})