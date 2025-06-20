import React, { useContext } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { AuthContext } from '../contexts/AuthContext';
import { CartContext } from '../contexts/CartContext';


export default function ToCartButton({ navigation }) {
    const cart = useContext(CartContext);
    return (
        <TouchableOpacity
            style={{
                padding: 10,
            }}
            onPress={() => navigation.navigate('Cart')}
        >
            <Feather name="shopping-cart" size={24} color="black" />
            {cart.items.length > 0 && <View style={styles.dot} />}
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