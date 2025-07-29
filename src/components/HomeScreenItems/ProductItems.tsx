import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    Text,
    Pressable,
    View,
} from 'react-native';
import { formatCurrency } from '../../utils/formatForm';
import { ProductsItem } from '../../types/navigation';
import { IMAGE_NOT_FOUND, Product } from '@/types/Products/products';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = Math.round(width * 0.43);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 4) / 3);

export const getGender = (gender?: string) => {
    if (gender === 'male') return 'Nam';
    if (gender === 'female') return 'Nữ';
    return '';
};

const ProductItem: React.FC<ProductsItem> = ({ navigation, items }) => {
    // Tạo state lưu các productId đã like
    const [likedIds, setLikedIds] = useState<string[]>([]);

    const toggleLike = (productId: string) => {
        setLikedIds((prev) =>
            prev.includes(productId)
                ? prev.filter((id) => id !== productId)
                : [...prev, productId]
        );
    };

    const renderProduct = ({ item }: { item: Product }) => {
        const isUnavailable = item.active === false;
        const gender = getGender(item.gender);
        const ProductName = `${item.name}${gender ? `-${gender}` : ``}`;
        const liked = likedIds.includes(item._id);

        return (
            <Pressable
                style={[styles.card, isUnavailable && styles.unavailableCard]}
                onPress={() => {
                    navigation.navigate('ProductDetail', {
                        productId: item._id,
                        variantId: item.variants[0]._id,
                    });
                }}
            >
                <Image
                    source={{ uri: item.variants?.[0]?.images?.[1] || IMAGE_NOT_FOUND }}
                    style={styles.image}
                />
                {isUnavailable && (
                    <View style={styles.unavailableOverlay}>
                        <Text style={styles.unavailableText}>Tạm hết hàng</Text>
                    </View>
                )}

                {/* Nút trái tim */}
                <Pressable
                    style={({ pressed }) => [
                        styles.heartIcon,
                        pressed && styles.heartIconPressed,
                    ]}
                    onPress={(e) => {
                        e.stopPropagation(); // tránh bấm nút trái tim gây onPress ở card cha
                        toggleLike(item._id);
                    }}
                >
                    <Ionicons
                        name={liked ? 'heart' : 'heart-outline'}
                        size={24}
                        color={liked ? '#ff0000' : '#006340'}
                    />
                </Pressable>

                <View style={styles.infoContainer}>
                    <Text numberOfLines={2} style={styles.name}>
                        {ProductName}
                    </Text>
                </View>

                <View style={styles.priceAndShip}>
                    <Text style={styles.price}>{formatCurrency(item.variants?.[0].finalPrice)}</Text>
                    <View style={styles.shipTag}>
                        <Ionicons name="rocket-outline" size={14} color="#000" />
                        <Text style={styles.shipText}>Xpress Ship</Text>
                    </View>
                </View>
            </Pressable>
        );
    };

    return (
        <View style={styles.product}>
            <FlatList
                data={items}
                renderItem={renderProduct}
                keyExtractor={(item) => item._id}
                initialNumToRender={4}
                maxToRenderPerBatch={5}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

export default ProductItem;

const styles = StyleSheet.create({
    card: {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        marginRight: 12,
        overflow: 'hidden',
        position: 'relative',
    },
    unavailableCard: {
        opacity: 0.6,
    },
    unavailableOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: 140,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    unavailableText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 18,
    },
    image: {
        width: '100%',
        height: 140,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    heartIcon: {
        position: 'absolute',
        top: 7,
        right: 10,
        padding: 3,
        borderRadius: 12,
    },
    heartIconPressed: {
        backgroundColor: '#00634020',
    },
    infoContainer: {
        padding: 8,
        flexDirection: 'column',
    },
    name: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
        marginBottom: 6,
    },
    priceAndShip: {
        position: 'absolute',
        right: 10,
        bottom: 10,
        alignItems: 'flex-end',
    },
    price: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#006340',
        marginBottom: 4,
    },
    shipTag: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#006340',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 5,
    },
    shipText: {
        marginLeft: 4,
        fontSize: 12,
        color: '#006340',
    },
    product: {
        marginTop: 10,
    },
});
