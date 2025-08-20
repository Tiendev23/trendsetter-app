import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { formatCurrency } from '@/utils/formatForm';
import CustomButton from '@/components/button/CustomButton';
import { CartItem } from '@/types';

type Props = {
    invisible: boolean;
    checkedItems: CartItem[];
    onBuying: () => void;
};

export default function PricingPanel({ invisible, checkedItems, onBuying }: Props) {
    if (invisible) return null;

    const subtotal = checkedItems.reduce((subtotal, item) =>
        subtotal + (item.finalPrice * item.quantity), 0);

    return (
        <View style={styles.pricingPanel}>
            <View style={styles.priceWrapper}>
                <Text style={styles.label}>Tổng cộng</Text>
                <Text style={[styles.label, styles.price]}>
                    {formatCurrency(subtotal)}
                </Text>
            </View>

            <CustomButton
                title='Mua Hàng'
                onPress={onBuying}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    pricingPanel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        gap: 20,
        paddingBottom: 30
    },

    priceWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    label: {
        fontWeight: '500',
        fontSize: 16,
    },
    price: {
        color: '#006340'
    },
});