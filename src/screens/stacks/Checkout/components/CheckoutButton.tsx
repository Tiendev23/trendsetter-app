import { Animated, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { showInfoToast } from '@/utils/toast';

type Props = {
    handleCheckout: () => void;
}

export default function CheckoutButton({ handleCheckout }: Props) {
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
            handleCheckout();
        }, delay);
    };

    const handlePressOut = () => {
        if (longPressTimeout.current) {
            if (!triggered.current) {
                showInfoToast({
                    title: "Nhấn và giữ nút để đặt hàng"
                })
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
            style={styles.button}
            disabled={triggered.current}
        >
            <View style={styles.content}>
                <Animated.View style={[styles.overlay, { width: overlayWidth }]} />
                <Text style={styles.label}>Đặt hàng</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: "100%",
        height: 50,
        backgroundColor: '#006340',
        borderRadius: 15,
        overflow: 'hidden',
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
        backgroundColor: "rgba(0, 99, 64, 0.3)",
    },
    label: {
        fontWeight: '700',
        fontSize: 16,
        textAlign: 'center',
        color: '#FFFFFF',
        letterSpacing: 0.25,
    },
});
