import { Dimensions, Image, StyleSheet, Text, Pressable, View } from 'react-native';
import React, { useContext } from 'react'; 
import { FlatList } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';

import { ProductsItem } from '@/types';
import { IMAGE_NOT_FOUND, Product } from '../../types/Products/products';
import { getGender } from './ProductItems';
import { AppDispatch, RootState } from '@/redux/store';
import { AuthContext } from '@/contexts/AuthContext';
import { FavoriteContext } from '@/contexts/FavoriteContext';

import {
    addFavorite,
    removeFavorite,
    optimisticAddFavorite,
    optimisticRemoveFavorite
} from '@/redux/features/product/favoriteSlice';
import { ProductVariant } from '@/types/Products/productVariant';


const { width } = Dimensions.get('window');
const ITEM_WIDTH = Math.round(width * 0.43);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 4 / 3.3);

const ProductItemsbyRating: React.FC<ProductsItem> = ({ navigation, items }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useContext(AuthContext)!;
    const { isLiked, toggleLike: toggleLikeGuest } = useContext(FavoriteContext)!;
    const { favorites } = useSelector((state: RootState) => state.favorite);

    const handleToggleLike = (variant: ProductVariant) => {
        if (!variant) return; 

        if (user?._id) {
            const { _id: variantId } = variant;
            const isAlreadyLiked = favorites.some((f) => f._id === variantId);

            if (isAlreadyLiked) {
                dispatch(optimisticRemoveFavorite({ variantId }));
                dispatch(removeFavorite({ _id: user._id, variantId }));
            } else {
                dispatch(optimisticAddFavorite(variant));
                dispatch(addFavorite({ _id: user._id, variantId }));
            }
        } else {
            toggleLikeGuest(variant._id);
        }
    };


    const renderItem = ({ item }: { item: Product }) => {
       
        const firstVariant = item.variants?.[0];
        if (!firstVariant) {
            return null;
        }

        const isUnavailable = firstVariant.active === false;
        const gender = getGender(item.gender);
        const ProductName = `${item.name}${gender ? `-${gender}` : ``} - ${firstVariant.color}`;
        const firstImage = firstVariant.images?.[0] || IMAGE_NOT_FOUND;

        const liked = user?._id
            ? favorites.some((f) => f._id === firstVariant._id)
            : isLiked(firstVariant._id);

        return (
            <Pressable
                style={[styles.card, isUnavailable && styles.unavailableCard]}
                onPress={() => {
                    navigation.navigate('ProductDetail', {
                        productId: item._id,
                        variantId: firstVariant._id 
                    });
                }}
            >
                <Image
                    source={{ uri: firstImage }}
                    style={styles.image}
                />
                {isUnavailable && (
                    <View style={styles.unavailableOverlay}>
                        <Text style={styles.unavailableText}>Tạm hết hàng</Text>
                    </View>
                )}

                <Pressable
                    style={({ pressed }) => [
                        styles.heartIcon,
                        pressed && styles.heartIconPressed,
                    ]}
                    onPress={e => {
                        e.stopPropagation();
                        handleToggleLike(firstVariant);
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
        );
    }

    return (
        <View style={styles.product}>
            <FlatList
                // Lọc ra các sản phẩm có ít nhất một variant
                data={items.filter(p => p.variants && p.variants.length > 0).slice(0, 5)}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
                initialNumToRender={4}
                maxToRenderPerBatch={5}
                horizontal
                showsHorizontalScrollIndicator={false}
                extraData={favorites}
            />
        </View>
    );
};

export default ProductItemsbyRating;

const styles = StyleSheet.create({
    card: {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        backgroundColor: '#f9f9f9',
        borderRadius: 20,
        marginRight: 12,
        overflow: 'hidden',
        position: 'relative',
        borderWidth: 0.1,

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