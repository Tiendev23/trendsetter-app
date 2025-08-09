import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { BlurView } from 'expo-blur';

type Props = {};

export default function OnLoading(props: Props) {
    return (
        <View style={styles.container}>
            <BlurView intensity={10} style={styles.blurBackground}>
                <ActivityIndicator size="large" color="#006340" />
            </BlurView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        overflow: 'hidden',
        backgroundColor: 'white'
    },
    blurBackground: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});