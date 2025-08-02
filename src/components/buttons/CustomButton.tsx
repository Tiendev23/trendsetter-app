import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ColorValue } from 'react-native';

type Props = {
    title: string;
    outline?: boolean;
    theme?: "green" | "red";
    onPress?: () => void;
    onLongPress?: () => void;
};

export default function CustomButton({ title, outline = false, theme = "green", onPress, onLongPress }: Props) {
    const buttonStyle =
        (theme === "green") ?
            outline ? styles.greenWithOutline : styles.greenWithoutOutline
            :
            outline ? styles.redWithOutline : styles.redWithoutOutline;

    const textColor = outline ?
        (theme === "green") ? "#006340" : "#C21E0C" : "#FFFFFF"

    return (
        <TouchableOpacity
            style={[styles.btn, buttonStyle]}
            onPress={onPress}
            onLongPress={onLongPress}
        >
            <Text
                style={[styles.text, { color: textColor }]}
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
    greenWithoutOutline: {
        borderColor: '#006340',
        backgroundColor: '#006340'
    },
    greenWithOutline: {
        borderColor: '#006340',
        backgroundColor: '#FFFFFF'
    },
    redWithoutOutline: {
        borderColor: '#C21E0C',
        backgroundColor: '#C21E0C'
    },
    redWithOutline: {
        borderColor: '#C21E0C',
        backgroundColor: '#FFFFFF'
    },
});
