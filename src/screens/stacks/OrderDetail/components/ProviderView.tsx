import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { PaymentMethod } from '@/types';

type Props = {
    method: PaymentMethod;
};

export default function ProviderView({ method }: Props) {
    return (
        <View style={[styles.container, styles.methodWrapper]}>
            <View style={styles.logoWrapper}>
                <Image source={method.logo} style={styles.logo} />
            </View>
            <Text style={styles.methodName}>
                {method.name}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
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
    }
});