import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ActivityIndicator, Dimensions, RefreshControl, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { formatCurrency } from '../../utils/formatForm';
import ChevronButton from '../../components/button/ChevronButton';
import ToCartButton from '../../components/button/ToCartButton';
import { getAllProducts } from '../../redux/features/product/productsSlice';
import { FavoriteContext } from '@/contexts/FavoriteContext';

const { width } = Dimensions.get("window");
import { Brand } from '../../types';
import { IMAGE_NOT_FOUND } from '@/types/Products/products';
import { ProductVariant } from '../../types/Products/productVariant';
import { Props } from './Account/Profile';
import { AuthContext } from '@/contexts/AuthContext';
import { addFavorite, removeFavorite, optimisticAddFavorite, optimisticRemoveFavorite } from '@/redux/features/product/favoriteSlice';

const getGender = (gender?: string) => {
    if (gender === 'male') return 'Nam';
    if (gender === 'female') return 'Nữ';
    return '';
};

const ProductlistScreen: React.FC<Props> = ({ navigation, route }) => {
    const { brandId, title, BannerId }: { brandId?: Brand; title?: string, BannerId: string } = route.params;
    const dispatch = useDispatch<AppDispatch>();
    const { items, loading, error } = useSelector((state: RootState) => state.products);
    const { favorites } = useSelector((state: RootState) => state.favorites);

    const { isLiked, toggleLike: toggleLikeGuest } = useContext(FavoriteContext)!;
    const { user } = useContext(AuthContext)!;
    const [refreshing, setRefreshing] = useState(false);


    const onRefresh = () => {
        setRefreshing(true);
        dispatch(getAllProducts()).finally(() => setRefreshing(false));
    };

    //  Cập nhật logic handleToggleLike
    const handleToggleLike = (variant: ProductVariant) => { // Nhận vào cả object variant
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

    const dataToRender: ProductVariant[] = brandId?._id
        ? items.filter((product) => product.product?.brand?._id === brandId._id)
        : BannerId && BannerId.length > 0
            ? items.filter((product) => BannerId.includes(product.product?._id))
            : items;

    if (brandId?._id && dataToRender.length === 0) {
        return (
            <View style={styles.center}>
                <Text>Không có sản phẩm nào thuộc thương hiệu được chọn</Text>
            </View>
        );
    }

    const renderProduct = ({ item }: { item: ProductVariant }) => {
        const isUnavailable = item.active === false;
        const gender = getGender(item.product?.gender);
        const ProductName = `${item.product?.name || 'Sản phẩm'}${gender ? `-${gender}` : ''} ${item.color}`;

        const liked = user?._id
            ? favorites.some((f) => f._id === item._id)
            : isLiked(item._id);

        return (
            <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('ProductDetail', {
                    productId: item.product._id,
                    variantId: item._id,
                })}
            >
                <Image
                    source={{ uri: item.images?.[0] || IMAGE_NOT_FOUND }}
                    style={styles.image}
                    resizeMode="cover"
                />
                {isUnavailable && (
                    <View style={styles.unavailableOverlay}>
                        <Text style={styles.unavailableText}>Tạm hết hàng</Text>
                    </View>
                )}

                {user?._id && (
                    <Pressable
                        style={({ pressed }) => [
                            styles.heartIcon,
                            pressed && styles.heartIconPressed,
                        ]}
                        onPress={(e) => {
                            e.stopPropagation();
                            handleToggleLike(item);
                        }}
                    >
                        <Ionicons
                            name={liked ? 'heart' : 'heart-outline'}
                            size={24}
                            color={liked ? '#ff0000' : '#006340'}
                        />
                    </Pressable>
                )}
                <View style={styles.infoContainer}>
                    <Text numberOfLines={2} style={styles.name}>
                        {ProductName}
                    </Text>
                    <View style={styles.priceContainer}>
                        <Text style={styles.price}>{formatCurrency(item.finalPrice)}</Text>
                        <View style={styles.shipTag}>
                            <Ionicons name="rocket-outline" size={14} color="#000" />
                            <Text style={styles.shipText}>Xpress Ship</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.headerContainer} />
                <View style={styles.headerActions}>
                    <ChevronButton direction="back" onPress={() => navigation.goBack()} />
                    <Text style={styles.headerTitle}>{brandId?.name || title}</Text>
                    <ToCartButton onPress={() => navigation.navigate("Cart")} />
                </View>
            </View>

            {loading === 'loading' && refreshing ? (
                <View style={styles.center}>
                    <ActivityIndicator size="large" color="#006340" />
                    <Text>Đang tải sản phẩm...</Text>
                </View>
            ) : loading === 'failed' ? (
                <View style={styles.center}>
                    <Text style={{ color: 'red' }}>Lỗi: {error}</Text>
                </View>
            ) : (
                !refreshing && (
                    <FlatList
                        data={dataToRender}
                        extraData={favorites}
                        keyExtractor={(item) => item._id}
                        numColumns={2}
                        columnWrapperStyle={styles.row}
                        renderItem={renderProduct}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.listContent}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                                colors={['#006340']}
                                title="Đang làm mới sản phẩm..."
                                tintColor="#006340"
                                titleColor="#006340"
                            />
                        }
                    />
                )
            )}
        </View>
    );
};

export default ProductlistScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        backgroundColor: '#FFF',
        paddingVertical: 22,
        paddingHorizontal: 18,
    },
    headerTitle: {
        fontWeight: '600',
        fontSize: 20,
        color: '#006340',
        textAlign: 'center',
    },
    headerActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
        height: '100%',
        paddingHorizontal: 18,
    },
    listContent: {
        paddingHorizontal: 12,
        paddingBottom: 20,
    },
    row: {
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    card: {
        width: (width - 36) / 2,
        backgroundColor: '#f9f9f9',
        borderRadius: 17,
        overflow: 'hidden',
        marginTop: 8,
        borderWidth: 0.1,

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
        padding: 5,
        borderRadius: 20,
    },
    heartIconPressed: {
        backgroundColor: '#00634020',
    },
    infoContainer: {
        padding: 8,
    },
    name: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
    },
    priceContainer: {
        marginTop: 6,
        alignItems: 'flex-end'

    },
    price: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#006340',
    },
    shipTag: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#006340',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 5,
        marginTop: 8,
    },
    shipText: {
        marginLeft: 4,
        fontSize: 12,
        color: '#006340',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});