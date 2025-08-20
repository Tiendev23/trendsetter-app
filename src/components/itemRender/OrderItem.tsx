import React from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { formatCurrency, getGenderLabel } from '@/utils/formatForm';
import { CartItem } from '@/types';

type Props = {
    item: CartItem;
    navToProdDetails: () => void;
}

export default function OrderItem({
    item, navToProdDetails
}: Props) {
    const isDiscounted = (item.basePrice != item.finalPrice);
    return (
        <TouchableOpacity
            style={styles.contentContainer}
            onPress={navToProdDetails}
        >
            <View style={styles.image}>
                <Image
                    source={{ uri: item.imageUrl }}
                    style={styles.image}
                />
            </View>
            <View style={styles.infoWrapper}>
                <Text
                    numberOfLines={2}
                    ellipsizeMode='tail'
                    style={styles.itemName}
                >
                    {item.name}
                </Text>
                <Text>
                    Size {item.size.size} - Màu {item.color}
                </Text>
                <View style={styles.priceWrapper}>
                    <View style={[styles.priceWrapper, { columnGap: 4 }]}>
                        <Text style={[styles.price, styles.finalPrice]}>
                            {formatCurrency(item.finalPrice)}
                        </Text>
                        {
                            (isDiscounted) &&
                            <Text style={[styles.price, styles.basePrice]}>
                                {formatCurrency(item.basePrice)}
                            </Text>
                        }
                    </View>
                    <Text>x{item.quantity}</Text>
                </View>
            </View>
        </TouchableOpacity >
    );
}

const styles = StyleSheet.create({
    contentContainer: {
        flexDirection: 'row',
        gap: 16,
        paddingHorizontal: 8,
    },
    priceWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    image: {
        width: 100,
        aspectRatio: 1,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoWrapper: {
        gap: 6,
        flexShrink: 1,
        flexGrow: 1,
    },
    itemName: {
        fontFamily: 'Raleway',
        fontWeight: 'medium',
        fontSize: 16,
        color: '#707B81',
        lineHeight: 20,
        marginBottom: 'auto',
    },
    price: {
        fontFamily: 'Raleway',
        fontWeight: '600',
    },
    finalPrice: {
        fontSize: 16,
        color: '#006340',
    },
    basePrice: {
        fontSize: 12,
        color: '#707B81',
        textAlignVertical: "bottom",
        textDecorationLine: "line-through",
    }
});

