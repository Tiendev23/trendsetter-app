import React from 'react';
import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';

type Props = {
    title: string;
    theme?: keyof typeof BUTTON_THEMES;
    onPress: () => void;
};

export default function ActionButton({ title, theme = "grn-filled", onPress }: Props) {
    const themeStyle = BUTTON_THEMES[theme];
    return (
        <TouchableOpacity
            style={[styles.buttonWrapper, themeStyle.button]}
            onPress={onPress}
        >
            <Text style={[styles.label, themeStyle.label]}>
                {title}
            </Text>
        </TouchableOpacity >
    );
}

type ThemeName = "grn-outline" | "grn-filled" | "red-outline" | "red-filled";
type ButtonThemeType = {
    [key in ThemeName]: {
        button: StyleProp<ViewStyle>,
        label: StyleProp<TextStyle>
    }
}
const BUTTON_THEMES: ButtonThemeType = {
    "grn-filled": {
        button: {
            backgroundColor: '#006340',
            borderColor: '#006340'
        },
        label: { color: '#FFFFFF' }
    },
    "grn-outline": {
        button: {
            backgroundColor: '#FFFFFF',
            borderColor: '#006340'
        },
        label: { color: '#006340' }
    },
    "red-outline": {
        button: {
            backgroundColor: '#FFFFFF',
            borderColor: '#C21E0C'
        },
        label: { color: '#C21E0C' }
    },
    "red-filled": {
        button: {
            backgroundColor: '#C21E0C',
            borderColor: '#C21E0C'
        },
        label: { color: '#FFFFFF' }
    },
}

const styles = StyleSheet.create({
    buttonWrapper: {
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 5,
        borderColor: '#006340',
        borderWidth: 2,
    },
    label: {
        fontWeight: '600',
        fontSize: 16,
        textAlign: 'center',
    },
});
