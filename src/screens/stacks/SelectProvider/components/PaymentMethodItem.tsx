import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { PaymentMethod } from '@/types';

type BaseProps = {
    method: PaymentMethod;
};

const PaymentMethodDisplay = ({ method }: BaseProps) => (
    <View style={[styles.contentWrapper, styles.methodWrapper]}>
        <View style={styles.logoWrapper}>
            <Image source={method.logo} style={styles.logo} />
        </View>
        <Text style={styles.methodName}>
            {method.name}
        </Text>
    </View>
)

type ItemProps = BaseProps & {
    isSelected: boolean;
    handleMethodSelected: () => void;
}

export default function PaymentMethodItem({
    method, isSelected, handleMethodSelected
}: ItemProps) {

    return (
        <TouchableOpacity
            style={[styles.container, isSelected && styles.selected]}
            onPress={handleMethodSelected}
        >
            <PaymentMethodDisplay method={method} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#FFFFFF",
        padding: 10,
        borderRadius: 8,
    },
    contentWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        flexGrow: 1,
        flexShrink: 1,
    },
    selected: {
        borderWidth: 1,
        borderColor: "#006340",
        backgroundColor: "rgba(0, 99, 64, 0.2)",
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
        fontSize: 16,
        fontWeight: "500",
        letterSpacing: 0.2,
    }
});