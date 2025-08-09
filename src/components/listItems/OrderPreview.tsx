import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Order, OrderItem, User } from '../../types/models';
import { formatCurrency, formatDate, formatOrderStatus } from '../../utils/formatForm';
import ChevronButton from '../buttons/ChevronButton';
import CustomButton from '../buttons/CustomButton';
import { OrderNav } from '../../types/navigation';
import { showInfoToast } from '@/utils/toast';


type Props = {
    order: Order
    navigation: OrderNav;
};

export default function OrderPreview({ order, navigation }: Props) {
    const { transaction, items, status } = order
    const { label, color } = formatOrderStatus(status);
    const cancelable = status !== 'delivered' && status !== 'cancelled';
    const reviewable = status === 'delivered' && true;
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.contentContainer}
                onPress={() => {
                    showInfoToast({
                        title: "Thông báo",
                        message: "Tính năng đang được phát triển"
                    })
                }}
            >
                <View style={styles.rowWrapper}>
                    <Text>
                        {formatDate(order.createdAt)}
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
                            items.length > 1 &&
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
                        <ChevronButton
                            size={16} color={'#006340'}
                            direction='forward' disabled />
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
            <View style={styles.separatorLine} />
            <View style={{ flexDirection: 'row-reverse', gap: 16 }}>
                {
                    !cancelable &&
                    <View style={{ flex: 1 / 3.25 }}>
                        <CustomButton
                            title='Mua lại'
                            onPress={() => {
                                showInfoToast({
                                    title: "Thông báo",
                                    message: "Tính năng đang được phát triển"
                                })
                            }}
                        />
                    </View>
                }
                {
                    reviewable && // Kiểm tra sản phẩm đã đánh giá chưa
                    <View style={{ flex: 1 / 3.25 }}>
                        <CustomButton
                            title='Đánh giá'
                            outline
                            onPress={() => {
                                showInfoToast({
                                    title: "Thông báo",
                                    message: "Tính năng đang được phát triển"
                                })
                            }}
                        />
                    </View>
                }
                {
                    cancelable && // Kiểm tra sản phẩm đã đánh giá chưa
                    <View style={{ flex: 1 / 3.25 }}>
                        <CustomButton
                            title='Huỷ đơn'
                            outline
                            onPress={() => {
                                showInfoToast({
                                    title: "Thông báo",
                                    message: "Tính năng đang được phát triển"
                                })
                            }}
                        />
                    </View>
                }
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        gap: 16,
        backgroundColor: '#FFFFFF'
    },
    contentContainer: {
        gap: 10
    },
    separatorLine: {
        height: 1,
        width: '100%',
        backgroundColor: '#D0D3D5',
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
        width: 80,
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
        paddingTop: 6,
        gap: 6
    },
    itemName: {
        fontSize: 16,
        fontWeight: '500'
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