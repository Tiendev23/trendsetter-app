import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { formatCurrency } from '@/utils/formatForm';
import { LongPressButton } from '@/components';
import { showInfoToast } from '@/utils/toast';

type Props = {
    subtotal: number;
    discountAmount: number;
    shippingFee: number;
    handleCheckout: () => void;
};

export default function PricingPanel({
    subtotal, shippingFee, discountAmount, handleCheckout
}: Props) {

    return (
        <View style={styles.pricingPanel} >
            <View style={{ gap: 10 }}>
                <View style={styles.rowWrapper}>
                    <Text style={[styles.label, styles.gray]}>Tiền hàng (Tạm tính)</Text>
                    <Text style={styles.label}>{formatCurrency(subtotal)}</Text>
                </View>
                <View style={styles.rowWrapper}>
                    <Text style={[styles.label, styles.gray]}>Giảm giá</Text>
                    <Text style={[styles.label, styles.green]}>{formatCurrency(discountAmount)}</Text>
                </View>
                <View style={styles.rowWrapper}>
                    <Text style={[styles.label, styles.gray]}>Phí giao hàng</Text>
                    <Text style={styles.label}>{formatCurrency(shippingFee)}</Text>
                </View>
            </View>
            <View style={styles.dashedLine} />
            <View style={styles.rowWrapper}>
                <Text style={styles.label}>Tổng cộng</Text>
                <Text style={[styles.label, styles.green]}>
                    {formatCurrency(subtotal + shippingFee)}
                </Text>
            </View>

            <LongPressButton
                label='Đặt hàng'
                onPressIn={handleCheckout}
                onCancelPress={() => {
                    showInfoToast({
                        title: "Nhấn và giữ nút để đặt hàng"
                    })
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    pricingPanel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        gap: 16,
        paddingBottom: 30
    },
    rowWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    label: {
        fontWeight: '500',
        fontSize: 16,
    },
    gray: {
        color: '#707B81'
    },
    green: {
        color: '#006340',
        fontWeight: "600"
    },
    dashedLine: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#707B81',
        borderStyle: 'dashed',
    },
});