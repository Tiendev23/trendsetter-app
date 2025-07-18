import { Button, Image, StyleProp, StyleSheet, Text, TextInput, TouchableOpacity, View, ViewStyle } from 'react-native';
import React from 'react';

import { IMAGE_NOT_FOUND, Payment } from '../../types/models';
import RadioButton from '../buttons/RadioButton';

type Props = {
    method: Payment;
    selectedMethod?: Payment;
    setSelected?: (method: Payment) => void;
    isHideRadio?: boolean;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>,
};

export default function PaymentMethod({ method, selectedMethod, setSelected, isHideRadio, disabled, style }: Props) {
    return (
        method &&
        <TouchableOpacity
            style={[styles.container, style]}
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
        backgroundColor: 'gray',
        borderRadius: 12,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#E5E5E5'
    },
    logo: {
        flex: 1,
        resizeMode: 'contain',
    },
    methodName: {
        flexShrink: 1,
    }
});