import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { OrderPreview } from '@/types/models';
import { formatCurrency, formatOrderStatus, formatVietnameseDate } from '@/utils/formatForm';
import { showInfoToast } from '@/utils/toast';
import { Ionicons } from '@expo/vector-icons';
import ActionButton from './ActionButton';

type Props = {
    order: OrderPreview;
    onOrderPressed: () => void;
    onRvwBtnPressed: () => void;
    onRepurchasePressed: () => void;
    onRepayPressed: () => void;
    onCancelPressed: () => void;
};
const A_DAY = 1000 * 60 * 60 * 24;
export default function OrderPrwItem({
    order, onOrderPressed, onRvwBtnPressed, onRepurchasePressed, onRepayPressed, onCancelPressed,
}: Props) {
    const { transaction, items, status, allReviewed, createdAt, updatedAt } = order;
    const { label, color } = formatOrderStatus(status);
    const now = Date.now();
    const expiration = new Date(createdAt).getTime() + A_DAY;
    const isRepayable = transaction.paymentMethod !== "cod" && transaction.status === "pending";
    const isCancelable = ['pending', 'confirmed', 'shipping'].includes(order.status) && now <= expiration;
    const isRebuyable = status === 'delivered' || status === 'cancelled';
    const isExpired = now > new Date(updatedAt).getTime() + (A_DAY * 30);
    const isReviewable = status === 'delivered' && !isExpired && !allReviewed;

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.contentContainer}
                onPress={onOrderPressed}
            >
                <View style={styles.rowWrapper}>
                    <Text style={{ color: "#707B81" }}>
                        {formatVietnameseDate(order.createdAt, true)}
                    </Text>
                    <Text style={[styles.highlight, { color }]}>
                        <Text style={{ fontSize: 10 }}>●</Text> {label}
                    </Text>
                </View>

                <View style={[styles.rowWrapper, styles.itemWrapper]}>
                    <View style={styles.imageWrapper}>
                        <Image
                            source={{ uri: items[0].imageUrl }}
                            style={{ flex: 1 }}
                        />
                    </View>
                    <View style={styles.nameWrapper}>
                        <Text
                            numberOfLines={2}
                            ellipsizeMode='tail'
                            style={styles.itemName}
                        >
                            {items[0].name}
                        </Text>
                        {
                            (items.length > 1) &&
                            <Text style={styles.more}>
                                +{items.length - 1} sản phẩm khác
                            </Text>
                        }
                    </View>
                </View>

                <View style={styles.rowWrapper}>
                    <View style={styles.rowWrapper}>
                        <Text style={styles.highlight}>
                            Xem chi tiết
                        </Text>
                        <Ionicons
                            name='chevron-forward'
                            size={16}
                            color={"#006340"}
                            style={{ marginLeft: 6 }}
                        />
                    </View>
                    <View>
                        <Text>
                            Tổng tiền:  <Text style={styles.itemPrice}>
                                {formatCurrency(transaction.amount)}
                            </Text>
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
            {
                (isRepayable || isRebuyable || isReviewable || isCancelable) &&
                <View style={[styles.buttonContainer, styles.separatorLine]}>
                    {
                        isRepayable &&
                        <ActionButton
                            title='Thanh toán'
                            onPress={onRepayPressed}
                        />
                    }
                    {
                        isRebuyable &&
                        <ActionButton
                            title='Mua lại'
                            onPress={onRepurchasePressed}
                        />
                    }
                    {
                        isReviewable &&
                        <ActionButton
                            title='Đánh giá'
                            theme='grn-outline'
                            onPress={onRvwBtnPressed}
                        />
                    }
                    {
                        isCancelable &&
                        <ActionButton
                            title='Huỷ đơn'
                            theme='red-outline'
                            onPress={onCancelPressed}
                        />
                    }
                </View>
            }
            {
                isRepayable && (
                    <Text style={[styles.separatorLine, styles.warn]}>
                        Vui lòng thanh toán trước {formatVietnameseDate(new Date(expiration).toISOString(), true)}
                    </Text>
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 14,
        gap: 10,
        backgroundColor: '#FFFFFF'
    },
    contentContainer: {
        gap: 10,
        paddingHorizontal: 5,
    },
    separatorLine: {
        borderTopWidth: 1,
        borderColor: '#D0D3D5',
    },
    warn: {
        color: '#FF6600',
        fontWeight: '600',
        paddingTop: 10
    },
    buttonContainer: {
        flexDirection: 'row-reverse',
        paddingTop: 10,
        gap: 16,
    },
    rowWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    highlight: {
        fontWeight: '500',
        color: '#006340'
    },
    imageWrapper: {
        width: 70,
        aspectRatio: 1,
        borderRadius: 15,
        overflow: 'hidden'
    },
    itemWrapper: {
        gap: 18,
        alignItems: 'flex-start'
    },
    nameWrapper: {
        flex: 1,
        gap: 6
    },
    itemName: {
        fontWeight: '500',
        lineHeight: 22,
        color: '#1A2530',
        letterSpacing: 0.25
    },
    more: {
        fontWeight: '500',
        color: '#1A2530',
    },
    itemPrice: {
        fontFamily: 'Raleway',
        fontWeight: '600',
        fontSize: 16,
        color: '#006340',
    }

});