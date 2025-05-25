import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const WinterBanner = () => {
    return (
        <View>
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={styles.smallText}>Get Winter Discount</Text>
                    <Text style={styles.bigText}>20% Off</Text>
                    <Text style={styles.smallText}>For Children</Text>
                </View>
            </View >

            <View style={styles.dotsContainer}>
                <View style={[styles.dot, styles.inactiveDot]} />
                <View style={[styles.dot, styles.activeDot]} />
                <View style={[styles.dot, styles.inactiveDot]} />
                <View style={[styles.dot, styles.inactiveDot]} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#6B5BFF',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10
    },
    textContainer: {
        flex: 1,
    },
    smallText: {
        color: '#fff',
        fontSize: 14,
        marginBottom: 4,
    },
    bigText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    dotsContainer: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'center',
        alignItems:'center'
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: '#6B5BFF',
    },
    inactiveDot: {
        backgroundColor: '#C0C0C0',
    },
});

export default WinterBanner;
