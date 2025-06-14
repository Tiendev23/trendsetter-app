import React, { useContext } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { AuthContext } from '../contexts/AuthContext';


export default function ToCartButton({ navigation }) {

    const { user } = useContext(AuthContext)
    return (
        <TouchableOpacity
            style={{
                padding: 10,
            }}
        // onPress={navigation.navigate('Cart')}
        >
            <Feather name="shopping-cart" size={24} color="black" />
            <View style={styles.dot} />
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