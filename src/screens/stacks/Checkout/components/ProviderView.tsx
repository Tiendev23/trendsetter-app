import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { PaymentMethod } from '@/types';
import ChevronButton from '@/components/button/ChevronButton';
import { Ionicons } from '@expo/vector-icons';

type BaseProps = {
    method: PaymentMethod;
};

const PaymentMethodItem = ({ method }: BaseProps) => (
    <View style={[styles.methodWrapper, styles.row]}>
        <View style={styles.logoWrapper}>
            <Image source={method.logo} style={styles.logo} />
        </View>
        <Text style={styles.methodName}>
            {method.name}
        </Text>
    </View>
)

type ViewProps = BaseProps & {
    openMethodSelection: () => void;
}

export default function ProviderView({ method, openMethodSelection }: ViewProps) {
    return (
        <TouchableOpacity
            onPress={openMethodSelection}
        >
            <View style={[styles.labelWrapper, styles.row]}>
                <Text style={styles.contentLabel}>Phương thức thanh toán</Text>
                <View style={styles.row}>
                    <Text style={styles.moreText}>Xem tất cả</Text>
                    <Ionicons
                        name='chevron-forward'
                        size={16}
                        color={"#707B81"}
                    />
                </View>
            </View>
            <PaymentMethodItem method={method} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    labelWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    methodWrapper: {
        gap: 20,
        paddingVertical: 4,
        paddingHorizontal: 12,
    },
    logoWrapper: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    logo: {
        flex: 1,
        resizeMode: 'contain',
        width: "100%",
        height: "100%",
    },
    methodName: {
        flexShrink: 1,
    },
    contentLabel: {
        fontWeight: '500',
        fontSize: 16,
        color: "#000"
    },
    moreText: {
        fontSize: 12,
        color: "#707B81"
    },
});