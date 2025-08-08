import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import CustomButton from '@/components/buttons/CustomButton';
import { formatCurrency, getGenderLabel } from '@/utils/formatForm';
import { CampaignLite, CartItem, Gender, ObjectId, VariantSize } from '@/types';

type Props = {
    product: {
        _id: ObjectId;
        campaign: CampaignLite | null;
        name: string;
        gender: Gender;
    };
    variant: {
        _id: ObjectId;
        color: string;
        basePrice: number;
        finalPrice: number;
        images: string[];
    };
    selectedSize: VariantSize | null;
    onAddToCart: (item: CartItem) => void;
};

export default function PriceDisplay({ product, variant, selectedSize, onAddToCart, }: Props) {
    if (!selectedSize) return null;
    const { _id: productId, campaign, name, gender } = product;
    const { _id: variantId, color, basePrice, finalPrice, images } = variant;
    const [quantity, setQuantity] = useState<number>(1);
    const subtotal = finalPrice * quantity;

    return (
        <View style={[styles.subtotalPopup, styles.shadow]}>
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
                    onAddToCart({
                        product: productId,
                        variant: variantId,
                        size: {
                            _id: selectedSize._id,
                            size: selectedSize.size,
                        },
                        campaign: campaign?._id || null,
                        name: `${name} ${getGenderLabel(gender)} Màu ${color}`,
                        color,
                        basePrice,
                        finalPrice,
                        imageUrl: images[0],
                        active: selectedSize.active,
                        quantity,
                    });
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