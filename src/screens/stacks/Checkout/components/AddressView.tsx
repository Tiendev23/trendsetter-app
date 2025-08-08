import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { AddressSelection } from '@/types';
import { getAddressDetail } from '@/utils/formatForm';
import CustomButton from '@/components/buttons/CustomButton';

type Props = {
    address: AddressSelection | null;
    openAddressSelector: () => void;
    navToAddAddress: () => void;
};

export default function AddressView({
    address, openAddressSelector, navToAddAddress
}: Props) {

    if (!address) return (
        <CustomButton
            title='THÊM ĐỊA CHỈ'
            outline
            onPress={navToAddAddress}
        />
    )

    const addressDetail = getAddressDetail(address);
    return (
        <TouchableOpacity
            style={[styles.contentWrapper]}
            onPress={openAddressSelector}
        >
            <View style={styles.iconWrapper}>
                <Image source={require('@/../assets/icons/address_icon.png')} style={styles.icon} />
            </View>
            <View style={styles.col}>
                <View style={styles.contentWrapper}>
                    <Text style={styles.name}>
                        {address.fullName}
                    </Text>
                    <Text style={styles.phone}>
                        {address.phone}
                    </Text>
                </View>
                <View>
                    <Text style={styles.address}>
                        {addressDetail}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    contentWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    col: {
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