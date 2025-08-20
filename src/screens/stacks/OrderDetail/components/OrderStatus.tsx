import { LayoutChangeEvent, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { OrderStatus as OrdStatusType, Transaction } from '@/types';
import { formatOrderStatus, formatVietnameseDate, getTransStatusLabel } from '@/utils/formatForm';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { showSuccessToast } from '@/utils/toast';
import * as Clipboard from 'expo-clipboard'

type Props = {
    status: OrdStatusType;
    createdAt: string;
    updatedAt: string;
    transaction: Transaction;
};

export default function OrderStatus({
    status, createdAt, updatedAt, transaction
}: Props) {
    const { status: transStatus, providerTransactionId: transId, updatedAt: payAt } = transaction;
    const { color, label } = formatOrderStatus(status);
    const [isExpanded, setIsExpanded] = useState(false);

    const height = useSharedValue(0);
    const opacity = useSharedValue(0);

    const toggleExpand = () => {
        const expanding = !isExpanded;
        setIsExpanded(expanding);
        height.value = withTiming(expanding ? transStatus === 'completed' ? 69 : 46 : 0, { duration: 300 });
        opacity.value = withTiming(expanding ? 1 : 0, { duration: 300 });
    };

    const animatedStyle = useAnimatedStyle(() => ({
        height: height.value,
        opacity: opacity.value,
        overflow: 'hidden',
    }));

    const handleCopy = () => {
        Clipboard.setStringAsync(transId);
        showSuccessToast({ title: "Đã sao chép vào clipboard!" })
    };

    return (
        <View>
            <Pressable
                style={[styles.actionWrapper, { backgroundColor: color }]}
                onPress={toggleExpand}
            >
                <View style={styles.contentWrapper}>
                    <Text style={styles.status}>
                        Đơn hàng {label}
                    </Text>
                </View>
                <View style={styles.buttonWrapper}>
                    <Ionicons
                        name={isExpanded ? 'chevron-collapse' : 'chevron-expand'}
                        size={24}
                        color="#FFFFFF"
                    />
                </View>
            </Pressable>

            <View style={styles.rowContainer}>

                <Animated.View style={animatedStyle}>
                    <View style={styles.rowWrapper}>
                        <View style={styles.row}>
                            <Text>Mã đơn hàng</Text>
                            <Pressable
                                style={styles.row}
                                onPress={handleCopy}
                            >
                                <Text>#{transId} </Text>
                                <Ionicons
                                    name={'copy'}
                                    size={14}
                                    color="#bbb"
                                />
                            </Pressable>
                        </View>
                        <View style={styles.row}>
                            <Text>Thời gian đặt hàng</Text>
                            <Text>{formatVietnameseDate(createdAt, true)}</Text>
                        </View>
                        {
                            (transStatus === 'completed') &&
                            <View style={styles.row}>
                                <Text>Thời gian thanh toán</Text>
                                <Text>{formatVietnameseDate(payAt, true)}</Text>
                            </View>
                        }
                    </View>
                </Animated.View>
                <View style={styles.row}>
                    <Text>Trạng thái thanh toán</Text>
                    <Text>{getTransStatusLabel(transStatus)}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    status: {
        textAlign: 'center',
        fontWeight: 'bold',
        letterSpacing: 0.3,
        textTransform: 'uppercase',
        color: '#FFFFFF',
        fontSize: 16,
        lineHeight: 20
    },
    contentWrapper: {
        paddingHorizontal: 12,
        paddingVertical: 16,
        flex: 1
    },
    actionWrapper: {
        flexDirection: 'row',
        borderRadius: 8,
    },
    buttonWrapper: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rowContainer: {
        paddingVertical: 14,
        paddingHorizontal: 16,
    },
    rowWrapper: {
        gap: 6,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});