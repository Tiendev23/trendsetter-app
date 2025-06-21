import React, { useEffect } from "react";
import { View, StyleSheet, DimensionValue } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Reanimated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat } from "react-native-reanimated";

export default function Skeleton({ width, height }: {
    width: DimensionValue | undefined,
    height: DimensionValue | undefined
}) {
    const translateX = useSharedValue(-150);

    useEffect(() => {
        translateX.value = withRepeat(
            withTiming(100, { duration: 2000 }),
            -1, // Lặp vô hạn
            true // Đảo ngược để tạo hiệu ứng quét
        );
    }, []);

    // Áp dụng hiệu ứng quét ngang
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    return (
        <View style={[styles.skeleton, { width: width, height: height }]}>
            <Reanimated.View style={[styles.overlay, animatedStyle]}>
                <LinearGradient
                    colors={["#DDDDDD", "#F9F9F9", "#DDDDDD"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradient}

                />
            </Reanimated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    skeleton: {
        borderRadius: 10,
        backgroundColor: "#DDDDDD",
        overflow: "hidden",
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
    },
    gradient: {
        flex: 1,
        width: "150%",
    },
});
