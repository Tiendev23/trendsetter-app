import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { BlurView } from 'expo-blur';

/**
 *  Component màn hình loading với kích thước của (View) cha
 *  @example
 *  <View style={StyleSheet.absoluteFill}>
 *      <OnLoading />
 *  </View>
 */
export default function OnLoading() {
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
        backgroundColor: 'white',
        zIndex: 10
    },
    blurBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});