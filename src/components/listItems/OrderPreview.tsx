import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Order, OrderItem, User } from '../../types';
import { formatCurrency, formatDate, formatOrderStatus } from '../../utils/formatForm';
import CustomDirectionButton from '../buttons/ChevronButton';
import CustomButton from '../buttons/CustomButton';
import { OrderNav } from '../../navigation/NavigationTypes';


type Props = {
    order: Order
    navigation: OrderNav;
};

export default function OrderPreview({ order, navigation }: Props) {
    const items = order.items as OrderItem[];
    const subtotal = items.reduce((subtotal, obj) => subtotal + (obj.price * obj.quantity), 0);
    const { label, color } = formatOrderStatus(order.status);
    const cancelable = order.status !== 'delivered' && order.status !== 'cancelled';
    const reviewable = order.status === 'delivered' && true;
    const buyable = !cancelable;
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.contentContainer}
                onPress={() => { }}
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
                            source={{ uri: items[0].product.image }}
                            style={{ flex: 1, backgroundColor: 'gray' }}
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
                        <CustomDirectionButton
                            size={16} color={'#006340'}
                            direction='forward' disabled />
                    </View>
                    <View>
                        <Text>
                            Tổng tiền:  <Text style={styles.itemPrice}>
                                {formatCurrency(subtotal)}
                            </Text>
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
            <View style={styles.separatorLine} />
            <View style={{ flexDirection: 'row-reverse', gap: 16 }}>
                {
                    buyable &&
                    <View style={{ flex: 1 / 3.25 }}>
                        <CustomButton
                            title='Mua lại'
                            onPress={() => { }}
                        />
                    </View>
                }
                {
                    reviewable && // Kiểm tra sản phẩm đã đánh giá chưa
                    <View style={{ flex: 1 / 3.25 }}>
                        <CustomButton
                            title='Đánh giá'
                            outlineStyle
                            onPress={() => { }}
                        />
                    </View>
                }
                {
                    cancelable && // Kiểm tra sản phẩm đã đánh giá chưa
                    <View style={{ flex: 1 / 3.25 }}>
                        <CustomButton
                            title='Huỷ đơn'
                            outlineStyle
                            onPress={() => { }}
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