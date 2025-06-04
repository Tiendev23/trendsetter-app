import React from 'react';
import { View, Text, StyleSheet, Image, Button, TouchableOpacity } from 'react-native';

const WinterBanner = ({
    title = "Get Winter Discount",
    discount = "20% Off",
    subtitle = "For Children",
    backgroundColor = "#6B5BFF",
    buttonText = "Shop Now",
}) => {
    return (
        <View style={[styles.container, { backgroundColor }]}>
            <View style={styles.bannerContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.smallText}>{title}</Text>
                    <Text style={styles.bigText}>{discount}</Text>
                    <Text style={styles.smallText}>{subtitle}</Text>
                </View>
            </View>


            <TouchableOpacity style={styles.button} >
                <Text style={styles.buttonText}>{buttonText}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    bannerContainer: {
        marginLeft: 10,
    },
    textContainer: {
        alignItems: 'center',
    },
    smallText: {
        color: '#fff',
        fontSize: 18,
        marginBottom: 4,

    },
    bigText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    button: {
        backgroundColor: '#fff',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
    },
    buttonText: {
        color: '#6B5BFF',
        fontWeight: 'bold',
        fontSize: 20
    },
});

export default WinterBanner;
