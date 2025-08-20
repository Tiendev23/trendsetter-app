import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { OrderPreview, OrderItem } from '@/types/models';
import { OrdHistNav } from '@/types/navigation';
import OrderPrwItem from './OrderPrwItem';
import { useRefresh } from '@/hooks/useRefresh';
import { fetchUserOrders } from '@/redux/features/order/ordersSlice';
import { ObjectId } from '@/types';
import { showErrorToast, showInfoToast } from '@/utils/toast';
import ConfirmCancelModal from './ConfirmCancelModal';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { cancelOrder, refreshOrderState } from '@/redux/features/order/orderSlice';

type Props = {
    orders: OrderPreview[];
    navigation: OrdHistNav;
    userId: ObjectId;
};

export default function OrderScene({ orders, navigation, userId }: Props) {
    const dispatch = useAppDispatch();
    const { refreshing, onRefresh } = useRefresh(() => fetchUserOrders(userId));
    const { status, error } = useAppSelector(state => state.order);
    const [modalVisible, setModalVisible] = useState(false);
    const [orderId, setOrderId] = useState<ObjectId | null>(null);

    useEffect(() => {
        if (status === 'failed' && error) {
            showErrorToast({
                title: `Lõi ${error.code}`,
                message: error.message
            })
            dispatch(refreshOrderState());
        }
    }, [status])

    function handleRepurchase(ordItems: OrderItem[]) {
        const items = ordItems.filter(item => item.active);
        if (items.length === 0) {
            showInfoToast({
                title: "Thông báo",
                message: "Sản phẩm đã ngừng kinh doanh"
            });
            return;
        }
        navigation.navigate("Checkout", { items })
    };

    function handleRepay(order: OrderPreview) {
        const items = order.items.filter(item => item.active);
        if (items.length === 0) {
            showInfoToast({
                title: "Thông báo",
                message: "Sản phẩm đã ngừng kinh doanh"
            });
            return;
        }
        const { providerTransactionId, providerPayLink } = order.transaction;
        if (!providerPayLink) {
            showInfoToast({
                title: "Thông báo",
                message: "Đã quá hạn thanh toán"
            });
            return;
        }
        navigation.navigate("Checkout", {
            items,
            transactionData: {
                checkoutUrl: providerPayLink,
                providerTrxId: providerTransactionId
            }
        })
    };

    function handleCancelOrder() {
        if (!orderId) return;
        dispatch(cancelOrder(orderId));
        setModalVisible(false);
        setOrderId(null)
        dispatch(fetchUserOrders(userId));
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={orders}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                keyExtractor={item => item._id}
                renderItem={({ item }) => (
                    <OrderPrwItem
                        order={item}
                        onOrderPressed={() => navigation.navigate("OrderDetail", { orderId: item._id })}
                        onRvwBtnPressed={() => navigation.navigate("ReviewWriting", {
                            items: item.items.filter(item => !item.isReviewed)
                        })}
                        onRepurchasePressed={() => handleRepurchase(item.items)}
                        onRepayPressed={() => handleRepay(item)}
                        onCancelPressed={() => {
                            setModalVisible(true);
                            setOrderId(item._id);
                        }}
                    />
                )}
                contentContainerStyle={styles.contentContainer}
                style={styles.container}
            />

            <ConfirmCancelModal
                visible={modalVisible}
                onNegative={() => setModalVisible(false)}
                onPositive={handleCancelOrder}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        gap: 10,
        paddingTop: 10,
        paddingBottom: 25,
    },
});