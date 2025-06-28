import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type Props = {
    title: string;
    outlineStyle?: boolean;
    onPress?: () => void;
    onLongPress?: () => void;
};

export default function CustomButton({ title, outlineStyle, onPress, onLongPress }: Props) {
    return (
        <TouchableOpacity
            style={[styles.btn, { backgroundColor: outlineStyle ? 'white' : '#006340' }]}
            onPress={onPress}
            onLongPress={onLongPress}
        >
            <Text
                style={[styles.text, { color: outlineStyle ? '#006340' : 'white' }]}
            >
                {title}
            </Text>
        </TouchableOpacity >
    );
}

const styles = StyleSheet.create({
    btn: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 15,
        width: '100%',
        alignItems: 'center',
        alignSelf: 'center',
        borderColor: '#006340',
        borderWidth: 2,
    },
    text: {
        fontWeight: '700',
        fontSize: 16,
        textAlign: 'center'
    },
});
