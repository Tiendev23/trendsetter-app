import { Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React from 'react';

import { IMAGE_NOT_FOUND, Payment } from '../../types';
import RadioButton from '../buttons/RadioButton';

type Props = {
    method: Payment;
    selectedMethod?: Payment;
    setSelected?: React.Dispatch<React.SetStateAction<Payment>>;
    isHideRadio?: boolean;
    disabled?: boolean;
};

export default function PaymentMethod({ method, selectedMethod, setSelected, isHideRadio, disabled }: Props) {

    return (
        method &&
        <TouchableOpacity
            style={styles.container}
            onPress={() => setSelected?.(method)}
            disabled={disabled}
        >
            <View style={[styles.container, styles.methodWrapper]}>
                <View style={styles.logoWrapper}>
                    <Image source={{ uri: method.logo || IMAGE_NOT_FOUND }} style={styles.logo} />
                </View>
                <Text style={styles.methodName}>
                    {method.name}
                </Text>
            </View>
            {
                !isHideRadio &&
                <View>
                    <RadioButton isSelected={selectedMethod._id === method._id} />
                </View>
            }
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    methodWrapper: {
        gap: '12',
        paddingVertical: 4,
        paddingStart: 12,
    },
    logoWrapper: {
        width: 50,
        aspectRatio: 1,
        justifyContent: 'center',
    },
    logo: {
        flex: 1,
        resizeMode: 'contain'
    },
    methodName: {
        flexShrink: 1,
    }
});