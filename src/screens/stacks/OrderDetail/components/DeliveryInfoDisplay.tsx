import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';

type Props = {
    recipientName: string;
    recipientPhone: string;
    shippingAddress: string;
};

export default function DeliveryInfoDisplay({
    recipientName, recipientPhone, shippingAddress
}: Props) {
    return (
        <View style={[styles.addrContainer, styles.contentWrapper]}>
            <View style={styles.iconWrapper}>
                <Image source={require('@/../assets/icons/address_icon.png')} style={styles.icon} />
            </View>
            <View style={styles.addrWrapper}>
                <View style={styles.addrContainer}>
                    <Text style={styles.name}>
                        {recipientName}
                    </Text>
                    <Text style={styles.phone}>
                        {recipientPhone}
                    </Text>
                </View>
                <View>
                    <Text style={styles.address}>
                        {shippingAddress}
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    contentWrapper: {
        paddingTop: 4,
        paddingHorizontal: 12,
    },
    addrContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    addrWrapper: {
        flexShrink: 1,
        rowGap: 6,
    },
    iconWrapper: {
        height: '100%',
        alignItems: 'flex-start'
    },
    icon: {
        height: 40,
        aspectRatio: 1,
    },
    name: {
        fontWeight: "700",
        letterSpacing: 0.5
    },
    phone: {
        color: "#707B81",
        letterSpacing: 0.5
    },
    address: {
        fontSize: 15,
        lineHeight: 20,
        letterSpacing: 0.2
    },
});