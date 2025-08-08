import { ReactNode, useEffect, useRef } from 'react';
import { Animated, View, StyleSheet } from 'react-native';

type Props = {
    children: ReactNode,
    trigger: boolean;
}

export default function ShakeView({ children, trigger }: Props) {
    const shakeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (trigger) {
            Animated.sequence([
                Animated.timing(shakeAnim, { toValue: 1, duration: 50, useNativeDriver: true }),
                Animated.timing(shakeAnim, { toValue: -1, duration: 50, useNativeDriver: true }),
                Animated.timing(shakeAnim, { toValue: 1, duration: 50, useNativeDriver: true }),
                Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
            ]).start();
        }
    }, [trigger]);

    return (
        <Animated.View style={{
            transform: [{
                translateX: shakeAnim.interpolate({
                    inputRange: [-1, 1], outputRange: [-8, 8]
                })
            }]
        }}>
            {children}
        </Animated.View>
    );
}

// Dùng:
// <ShakeView trigger={hasError}>
//   <YourInput />
// </ShakeView>