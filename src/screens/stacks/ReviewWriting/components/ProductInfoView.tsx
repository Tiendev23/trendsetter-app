import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { OrderItem } from '@/types';

type Props = {
    item: OrderItem
};

export default function ProductInfoView({ item }: Props) {
    return (
        <View style={styles.productInfo}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <View style={{ flex: 1 }}>
                <Text
                    style={styles.name}
                    numberOfLines={1}
                    ellipsizeMode='tail'
                >
                    {item.name}
                </Text>
                <Text style={styles.meta}>Màu: {item.color} — Size: {item.size.size}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    productInfo: {
        flexDirection: 'row',
        gap: 12,
    },
    image: {
        height: 'auto',
        aspectRatio: 1,
        borderRadius: 8,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    meta: {
        color: '#666',
        marginTop: 4,
    },
});