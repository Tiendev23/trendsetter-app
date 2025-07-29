import { Dimensions, Image, StyleSheet, Text, Pressable, View } from 'react-native'
import React, { useState } from 'react'
import { ProductsItem } from '../../navigation/NavigationTypes'
import { IMAGE_NOT_FOUND, Product } from '../../types/Products/products';
import { getGender } from './ProductItems';
import { Ionicons } from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = Math.round(width * 0.43); // hoặc 0.48
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 4 / 3.3);

const ProductItemsbyRating: React.FC<ProductsItem> = ({ navigation, items }) => {
    const [likedIds, setLikedIds] = useState<string[]>([]);

    const toggleLike = (productId: string) => {
        setLikedIds(prev =>
            prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
    };

    const renderItem = ({ item }: { item: Product }) => {
        const isUnavailable = item.active === false;
        const gender = getGender(item.gender)
        const ProductName = `${item.name}${gender ? `-${gender}` : ``}`;
        const firstImage = item.variants.images?.[1] || IMAGE_NOT_FOUND;
        const liked = likedIds.includes(item._id);

        return (
            <Pressable
                style={[styles.card, isUnavailable && styles.unavailableCard]}
                onPress={() => {
                    navigation.navigate('ProductDetail', {
                        productId: item._id,
                        variantId: item.variants._id
                    });
                }}
            >
                <Image
                    source={{ uri: firstImage || IMAGE_NOT_FOUND }}
                    style={styles.image}
                />
                {isUnavailable && (
                    <View style={styles.unavailableOverlay}>
                        <Text style={styles.unavailableText}>Tạm hết hàng</Text>
                    </View>
                )}

                {/* Nút trái tim đổi màu khi bấm */}
                <Pressable
                    style={({ pressed }) => [
                        styles.heartIcon,
                        pressed && styles.heartIconPressed,
                    ]}
                    onPress={e => {
                        e.stopPropagation(); // tránh kích hoạt onPress cha
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
                    <Text numberOfLines={3} style={styles.name}>{ProductName}</Text>
                    <View style={styles.priceContainer}>
                        <View style={styles.shipTag}>
                            <Ionicons name="rocket-outline" size={14} color="#000" />
                            <Text style={styles.shipText}>Xpress Ship</Text>
                        </View>
                    </View>
                </View>
            </Pressable>

        )
    }

    return (
        <View style={styles.product}>
            <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
                initialNumToRender={4}
                maxToRenderPerBatch={5}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

export default ProductItemsbyRating

const styles = StyleSheet.create({
    card: {
        width: ITEM_WIDTH,//179-240
        height: ITEM_HEIGHT,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        marginRight: 12,
        overflow: 'hidden',
        position: 'relative',  // đổi thành relative để position tuyệt đối con bên trong chuẩn
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
        position: 'relative',
        height: 70,
        justifyContent: 'space-between',
    },
    name: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
    },
    price: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#006340',
        marginVertical: 4,
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
    priceContainer: {
        position: 'absolute',
        bottom: 0,
        right: 10,
    },
    product: {
        marginTop: 10,
    }
});
