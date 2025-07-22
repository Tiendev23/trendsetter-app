import React, { useContext } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCartContext } from '../contexts/CartContext';


export default function ToCartButton({ navigation }: { navigation: any }) {
    const { items } = useCartContext();
    return (
        <TouchableOpacity
            style={{
                padding: 10,
            }}
            onPress={() => navigation.navigate('Cart')}
        >
            <Ionicons name="cart-outline" size={33} color="black" />
            {items.length > 0 && <View style={styles.dot} />}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    dot: {
        width: 10,
        aspectRatio: 1,
        borderRadius: 10,
        backgroundColor: 'red',
        position: 'absolute',
        right: '30%',
        top: '20%'
    }
});