import { Animated, TouchableOpacity, Text, View, StyleSheet, Platform } from 'react-native';
import React, { useRef } from 'react';

type Props = {
    label: string;
    onPressIn: () => void;
    onCancelPress: () => void;
    theme?: keyof typeof BUTTON_THEMES;
}

export default function LongPressButton({
    label,
    onPressIn,
    onCancelPress,
    theme = "green-filled"
}: Props) {
    const themeStyles = BUTTON_THEMES[theme];
    const animation = useRef(new Animated.Value(0)).current;
    const longPressTimeout = useRef<NodeJS.Timeout | null>(null);
    const delay = 800; // thời gian cần giữ để kích hoạt
    const triggered = useRef<boolean>(false);

    const startAnimation = () => {
        animation.setValue(0);
        Animated.timing(animation, {
            toValue: 1,
            duration: delay,
            useNativeDriver: false,
        }).start();
    };

    const cancelAnimation = () => {
        animation.stopAnimation();
        animation.setValue(0);
    };

    const handlePressIn = () => {
        startAnimation();
        longPressTimeout.current = setTimeout(() => {
            triggered.current = true;
            onPressIn();
        }, delay);
    };

    const handlePressOut = () => {
        if (longPressTimeout.current) {
            if (!triggered.current) {
                onCancelPress();
            }
            clearTimeout(longPressTimeout.current);
            longPressTimeout.current = null;
            cancelAnimation();
            triggered.current = false;
        }
    };

    const overlayWidth = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
    });

    return (
        <TouchableOpacity
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={[styles.button, themeStyles.container]}
            disabled={triggered.current}
        >
            <View style={styles.content}>
                <Animated.View style={[
                    styles.overlay,
                    { width: overlayWidth, backgroundColor: themeStyles.overlay }
                ]} />
                <Text style={[styles.label, themeStyles.label]}>{label}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: "100%",
        height: 50,
        borderRadius: 15,
        overflow: 'hidden',
    },
    label: {
        fontWeight: '700',
        fontSize: 16,
        textAlign: 'center',
        letterSpacing: 0.25,
    },
    greenFilled: {
        borderWidth: 2,
        borderColor: "#006340",
        backgroundColor: '#006340',
    },
    greenFilledLabel: {
        color: '#FFFFFF',
    },
    greenOutline: {
        borderWidth: 2,
        borderColor: "#006340",
        backgroundColor: '#FFFFFF',
    },
    greenOutlineLabel: {
        color: '#006340',
    },
    redFilled: {
        borderWidth: 2,
        borderColor: "#C21E0C",
        backgroundColor: '#C21E0C',
    },
    redFilledLabel: {
        color: '#FFFFFF',
    },
    redOutline: {
        borderWidth: 2,
        borderColor: "#C21E0C",
        backgroundColor: '#FFFFFF',
    },
    redOutlineLabel: {
        color: '#C21E0C',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
    },
});


const isIOS = Platform.OS === 'ios';
const BUTTON_THEMES = {
    "green-filled": {
        container: styles.greenFilled,
        label: styles.greenFilledLabel,
        overlay: isIOS
            ? "rgba(51, 204, 51, 0.4)"
            : "rgba(0, 99, 64, 0.3)",
    },
    "green-outline": {
        container: styles.greenOutline,
        label: styles.greenOutlineLabel,
        overlay: "rgba(0, 99, 64, 0.3)",
    },
    "red-filled": {
        container: styles.redFilled,
        label: styles.redFilledLabel,
        overlay: isIOS
            ? "rgba(204, 153, 0, 0.4)"
            : "rgba(194, 30, 12, 0.3)",
    },
    "red-outline": {
        container: styles.redOutline,
        label: styles.redOutlineLabel,
        overlay: "rgba(194, 30, 12, 0.3)",
    },
};