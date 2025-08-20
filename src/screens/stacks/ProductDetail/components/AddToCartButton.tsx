import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ColorValue } from 'react-native';

type Props = {
    onPress: () => void;
    disableTrigger: boolean;
};

export default function AddToCartButton({ onPress, disableTrigger }: Props) {
    const btnStyle = disableTrigger ? BUTTON_THEMES['disabled'] : BUTTON_THEMES['active'];

    return (
        <TouchableOpacity
            style={[styles.container, btnStyle.container]}
            onPress={onPress}
            disabled={disableTrigger}
        >
            <Text
                style={[styles.label, btnStyle.label]}
            >
                Thêm vào giỏ hàng
            </Text>
        </TouchableOpacity >
    );
}
const BUTTON_THEMES = {
    'disabled': {
        container: {
            backgroundColor: '#E0E0E0', // màu xám nhạt
            opacity: 0.6, // làm mờ để thể hiện không tương tác
        },
        label: { color: '#A0A0A0' }
    },
    'active': {
        container: {
            backgroundColor: '#006340'
        },
        label: { color: '#FFFFFF' }
    }
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 15,
        width: '100%',
        alignItems: 'center',
        alignSelf: 'center',
    },
    label: {
        fontWeight: '700',
        fontSize: 16,
        textAlign: 'center'
    },
});
