import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext, useState } from 'react';
import { formatCurrency } from '../../utils/formatForm';
import { FontAwesome5 } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import CustomButton from '../buttons/CustomButton';
import { CartContext } from '../../contexts/CartContext';
import { Product, useStateTuple } from '../../types';

type StateHooks = {
    selectedSize: useStateTuple<string | null>;
    quantity: useStateTuple<number>;
};

type Props = {
    product: Product;
    subtotal: number;
    state: StateHooks;
};

export default function PricePopup({ product, subtotal, state }: Props) {
    const [selectedSize, setSelectedSize] = state.selectedSize;
    const [quantity, setQuantity] = state.quantity;
    const { addToCart } = useContext(CartContext);

    return (
        <View style={styles.subtotalPopup}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
            }}>
                <View style={styles.subtotalTextContainer}>
                    <Text style={styles.subtotalTitle}>
                        Kho: {product.stock}
                    </Text>
                    <Text style={styles.subtotalTitle}>Price</Text>
                    <Text style={styles.subtotalPrice}>{formatCurrency(subtotal * quantity)}</Text>
                </View>
                <View style={[styles.quantityWrapper, styles.buttonOutline]}>
                    <TouchableOpacity style={styles.quantityWrapper}
                        disabled={quantity === 1}
                        onPress={() => { setQuantity(quantity - 1) }}
                    >
                        <FontAwesome5 name="minus" size={24} color="#006340" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.quantityWrapper}
                        onPress={() => { setQuantity(quantity + 1) }}
                    >
                        <FontAwesome5 name="plus" size={24} color="#006340" />
                    </TouchableOpacity>
                    <View style={styles.quantity}>
                        <TextInput
                            style={styles.quantityInput}
                            value={quantity.toString()}
                            keyboardType="numeric"
                            onChangeText={text => setQuantity(
                                Number.parseInt(text) || 1
                            )}
                        />
                    </View>
                </View>
            </View>

            <CustomButton
                title="Thêm vào giỏ hàng"
                onPress={() => {
                    console.log("Adding to cart:", product);

                    addToCart(product, selectedSize, "Xanh", quantity);
                    setSelectedSize(null)
                    setQuantity(1);
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    subtotalPopup: {
        position: 'absolute',
        bottom: 25,
        left: 10,
        right: 10,
        backgroundColor: '#FFFFFF',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 24,
        gap: 12,
        // shadow cho Android
        elevation: 5,
        // shadow cho IOS
        shadowColor: '#000', // Màu bóng
        shadowOffset: { width: 0, height: 5 }, // Độ lệch của bóng
        shadowOpacity: 0.3, // Độ trong suốt của bóng
        shadowRadius: 5, // Độ rộng của bóng
    },
    subtotalTextContainer: {
        flex: 1,
        gap: 4,
    },
    subtotalTitle: {
        fontSize: 18,
        color: '#707B81',
    },
    subtotalPrice: {
        fontSize: 24,
        fontWeight: '500',
    },
    quantityWrapper: {
        flex: 0.7,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '75%',
        overflow: 'hidden'
    },
    quantity: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    quantityInput: {
        color: '#006340',
        height: '100%',
        width: '20%',
        textAlign: 'center'
    },
    buttonOutline: {
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#006340'
    },
});