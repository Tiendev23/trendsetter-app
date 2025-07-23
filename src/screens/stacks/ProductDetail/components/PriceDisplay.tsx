import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import CustomButton from '@/components/buttons/CustomButton';
import { formatCurrency } from '@/utils/formatForm';
import { ObjectId, VariantSize } from '@/types';
import { showSuccessToast } from '@/utils/toast';

type Props = {
    variant: {
        id: ObjectId;
        price: number;
    };
    selectedSize: VariantSize | null;
    onSelectSize: {
        setSelectedSize: (size: VariantSize | null) => void;
        setPaddingBottom: (height: number) => void;
    };
    onAddToCart: (
        variantId: ObjectId,
        sizeId: ObjectId,
        quantity: number
    ) => void;

};

export default function PriceDisplay({ variant, selectedSize, onSelectSize, onAddToCart, }: Props) {
    if (!selectedSize) return null;
    const { setSelectedSize, setPaddingBottom } = onSelectSize;
    const [quantity, setQuantity] = useState<number>(1);
    const subtotal = variant.price * quantity;

    return (
        <View
            style={[styles.subtotalPopup, styles.shadow]}
            onLayout={(event) => {
                const { height } = event.nativeEvent.layout;
                setPaddingBottom(height);
            }}
        >
            <View style={{
                flexDirection: 'row'
            }}>
                <View style={styles.subtotalTextContainer}>
                    <Text style={styles.subtotalTitle}>
                        Kho: {selectedSize.stock}
                    </Text>
                    <View>
                        <Text style={styles.subtotalTitle}>Giá</Text>
                        <Text style={styles.subtotalPrice}>{formatCurrency(subtotal)}</Text>
                    </View>
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
                    onAddToCart(variant.id, selectedSize._id, quantity);
                    setSelectedSize(null);
                    showSuccessToast({
                        title: "Đã thêm vào giỏ hàng"
                    })
                }}
            />
        </View>
    );
};

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
        alignItems: 'center',
        gap: 12,
    },
    shadow: {
        // shadow cho Android
        elevation: 3,
        // shadow cho IOS
        shadowColor: '#000', // Màu bóng
        shadowOffset: { width: 0, height: 5 }, // Độ lệch của bóng
        shadowOpacity: 0.3, // Độ trong suốt của bóng
        shadowRadius: 3, // Độ rộng của bóng
    },
    subtotalTextContainer: {
        flex: 1,
        gap: 4,
    },
    subtotalTitle: {
        fontSize: 16,
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
        height: '80%',
        overflow: 'hidden',
        alignSelf: 'center',
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