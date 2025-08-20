import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { PaymentMethod, Transaction } from '@/types';
import { formatCurrency } from '@/utils/formatForm';

type Props = {
    shippingFee: number;
    discountAmount: number;
    transaction: Transaction;
};

export default function PaymentDetails({ shippingFee, discountAmount, transaction }: Props) {
    const { amount } = transaction;

    const shipF = shippingFee ? formatCurrency(shippingFee) : "Miễn phí";
    return (
        <View style={styles.pricingPanel} >
            <View style={{ gap: 10 }}>
                <View style={styles.rowWrapper}>
                    <Text style={styles.label}>Tiền hàng</Text>
                    <Text style={styles.label}>{formatCurrency(amount - shippingFee)}</Text>
                </View>
                <View style={styles.rowWrapper}>
                    <Text style={styles.label}>Giảm giá</Text>
                    <Text style={[styles.label, styles.green]}>{formatCurrency(discountAmount)}</Text>
                </View>
                <View style={styles.rowWrapper}>
                    <Text style={styles.label}>Phí giao hàng</Text>
                    <Text style={styles.label}>{shipF}</Text>
                </View>
            </View>
            <View style={styles.dashedLine} />
            <View style={styles.rowWrapper}>
                <Text style={[styles.label, styles.bold]}>Tổng cộng</Text>
                <Text style={[styles.label, styles.bold, styles.green]}>
                    {formatCurrency(amount)}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    pricingPanel: {
        gap: 16,
        paddingVertical: 4,
        paddingHorizontal: 12,
    },
    rowWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    label: {
        fontSize: 16,
        color: '#393f42'
    },
    bold: {
        fontWeight: '500',
        color: "#000"
    },
    green: {
        color: '#006340',
        fontWeight: "600"
    },
    dashedLine: {
        width: '100%',
        height: 1,
        backgroundColor: '#A0A0A0',
    },
});