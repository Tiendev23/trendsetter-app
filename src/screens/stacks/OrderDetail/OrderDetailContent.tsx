import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { CartItem, OrdDetailNav, Order } from '@/types';
import { CustomButton, OnLoading } from '@/components';
import { getMethod } from '@/services/payment.service';
import { OrderItemList } from '../Checkout/components';
import { DeliveryInfo, OrderStatus, PaymentDetails, ProviderView } from './components';
import { showInfoToast } from '@/utils/toast';

type Props = {
    navigation: OrdDetailNav;
    order?: Order;
    onRefresh: () => Promise<void>;
    refreshing: boolean;
    refreshState: () => void;
};

const A_DAY = 1000 * 60 * 60 * 24;
export default function OrderDetailContent({ navigation, order: data, onRefresh, refreshing, refreshState }: Props) {
    const [order, setOrder] = useState<Order | null>(null);

    useEffect(() => {
        if (data) {
            setOrder(data);
            refreshState();
        }
    }, [data])

    if (!order) {
        return (
            <View style={styles.container}>
                <OnLoading />
            </View>
        )
    }

    const discountAmount = order.items.reduce((sum, item) => sum + (item.basePrice - item.finalPrice), 0);
    const method = getMethod(order.transaction.paymentMethod);
    const isExpired = Date.now() > new Date(order.updatedAt).getTime() + (A_DAY * 30);
    const isReviewable = order.status === 'delivered' && !isExpired && !order.allReviewed;

    function handleItemPressed(item: CartItem) {
        navigation.navigate("ProductDetail", {
            productId: item.product,
            variantId: item.variant,
        }, { merge: true });
    };

    const handleRepurchase = () => {
        const items = order.items.filter(item => item.active);
        if (items.length === 0) {
            showInfoToast({
                title: "Thông báo",
                message: "Sản phẩm đã ngừng kinh doanh"
            });
            return;
        }
        navigation.navigate("Checkout", { items })
    };

    return (
        <View style={styles.container}>
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <View style={styles.contentContainer}>
                    <View style={styles.contentWrapper}>
                        <OrderStatus {...order} />
                    </View>

                    <View style={[styles.contentWrapper, styles.contentContainer]}>
                        <Text style={styles.contentLabel}>Thông tin nhận hàng</Text>
                        <DeliveryInfo {...order} />
                    </View>

                    <View style={[styles.contentWrapper, styles.contentContainer]}>
                        <Text style={styles.contentLabel}>Danh sách sản phẩm</Text>
                        <OrderItemList
                            items={order.items}
                            handleItemClick={handleItemPressed}
                        />
                    </View>

                    <View style={[styles.contentWrapper, styles.contentContainer]}>
                        <Text style={styles.contentLabel}>Phương thức thanh toán</Text>
                        <ProviderView method={method} />
                    </View>

                    <View style={[styles.contentWrapper, styles.contentContainer]}>
                        <Text style={styles.contentLabel}>Thông tin thanh toán</Text>
                        <PaymentDetails
                            {...order}
                            discountAmount={discountAmount}
                        />
                    </View>
                </View>
            </ScrollView>

            <View style={styles.buttonContainer}>
                {
                    (isReviewable) &&
                    <View style={styles.buttonWrapper}>
                        <CustomButton
                            title='Đánh giá'
                            outline
                            onPress={() => navigation.navigate("ReviewWriting", {
                                items: order.items.filter(item => !item.isReviewed)
                            })}
                        />
                    </View>
                }
                <View style={styles.buttonWrapper}>
                    <CustomButton
                        title='Mua lại'
                        onPress={handleRepurchase}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        paddingVertical: 16,
        paddingHorizontal: 12,
        gap: 12,
    },
    contentWrapper: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        overflow: 'hidden'
    },
    contentLabel: {
        fontWeight: '500',
        fontSize: 16,
        lineHeight: 20,
        color: "#000",
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 12,
        paddingHorizontal: 12,
        marginBottom: 20,
    },
    buttonWrapper: {
        flex: 1
    }
})