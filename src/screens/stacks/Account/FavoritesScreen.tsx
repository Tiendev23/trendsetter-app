import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ActivityIndicator, Dimensions, RefreshControl, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../redux/store';
import { formatCurrency } from '../../../utils/formatForm';
import ChevronButton from '../../../components/buttons/ChevronButton';
import ToCartButton from '../../../components/ToCartButton';

const { width } = Dimensions.get("window");
import { IMAGE_NOT_FOUND } from '@/types/Products/products';
import { ProductVariant } from '../../../types/Products/productVariant';
import { Props } from './../Account/Profile'; 
import { AuthContext } from '@/contexts/AuthContext';
import { addFavorite, removeFavorite, getFavorites } from '@/redux/features/product/favoriteSlice';

const getGender = (gender?: string) => {
    if (gender === 'male') return 'Nam';
    if (gender === 'female') return 'Nữ';
    return '';
};

const FavoritesScreen: React.FC<Props> = ({ navigation }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useContext(AuthContext)!;

   
    const { favorites, status } = useSelector((state: RootState) => state.favorites);

    const [refreshing, setRefreshing] = useState(false);
    const [likingId, setLikingId] = useState<string | null>(null);

    // Fetch dữ liệu khi màn hình được focus 
    useFocusEffect(
        useCallback(() => {
            if (user?._id) {
                dispatch(getFavorites({ _id: user._id }));
            }
        }, [dispatch, user?._id])
    );

    // kéo để làm mới" 
    const onRefresh = useCallback(() => {
        if (user?._id) {
            setRefreshing(true);
            dispatch(getFavorites({ _id: user._id })).finally(() => setRefreshing(false));
        }
    }, [dispatch, user?._id]);

    //   xử lý bỏ thích
    const handleToggleLike = async (variant: ProductVariant) => {
        if (!user?._id || likingId) return;

        const { _id: variantId } = variant;
        setLikingId(variantId);

        try {
            // Màn hình này chỉ có sản phẩm đã thích, nên mặc định là hành động xóa
            await dispatch(removeFavorite({ _id: user._id, variantId })).unwrap();
            // Sau khi xóa thành công, fetch lại danh sách mới
            await dispatch(getFavorites({ _id: user._id }));
        } catch (err) {
            console.error("Failed to remove favorite:", err);
        } finally {
            setLikingId(null);
        }
    };


    const renderProduct = ({ item }: { item: ProductVariant }) => {
        // Kiểm tra xem item có tồn tại không
        if (!item || !item.product) {
            return null; // Không render gì nếu item không hợp lệ
        }

        const isUnavailable = item.active === false;
        const gender = getGender(item.product?.gender);
        const ProductName = `${item.product?.name || 'Sản phẩm'}${gender ? `-${gender}` : ''} ${item.color}`;
        const isLiking = likingId === item._id;

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

                <Pressable
                    style={({ pressed }) => [
                        styles.heartIcon,
                        pressed && styles.heartIconPressed,
                    ]}
                    onPress={(e) => {
                        e.stopPropagation();
                        handleToggleLike(item);
                    }}
                    disabled={isLiking}
                >
                    {isLiking ? (
                         <ActivityIndicator size="small" color="#006340" />
                    ) : (
                        <Ionicons
                            name={'heart'} 
                            size={24}
                            color={'#ff0000'} 
                        />
                    )}
                </Pressable>
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

    //  Render Giao Diện 

    const renderContent = () => {
        if (status === 'loading' && !refreshing) {
            return (
                <View style={styles.center}>
                    <ActivityIndicator size="large" color="#006340" />
                    <Text>Đang tải danh sách yêu thích...</Text>
                </View>
            );
        }

        if (status === 'failed') {
            return (
                 <View style={styles.center}>
                    <Text style={{color: 'red'}}>Lỗi khi tải dữ liệu.</Text>
                    <TouchableOpacity onPress={onRefresh}><Text style={{color: '#006340'}}>Thử lại</Text></TouchableOpacity>
                </View>
            );
        }

        if (favorites.length === 0) {
            return (
                <View style={styles.center}>
                    <Ionicons name="heart-dislike-outline" size={60} color="#ccc" />
                    <Text style={styles.emptyText}>Chưa có sản phẩm yêu thích</Text>
                    <Text style={styles.emptySubText}>Hãy lướt và tìm sản phẩm bạn thích nhé!</Text>
                </View>
            );
        }

        return (
            <FlatList
                data={favorites} 
                extraData={{ favorites, likingId }}
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
                    />
                }
            />
        );
    }

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.headerContainer} />
                <View style={styles.headerActions}>
                    <ChevronButton direction="back" onPress={() => navigation.goBack()} />
                    <Text style={styles.headerTitle}>Sản phẩm yêu thích</Text>
                    <ToCartButton navigation={navigation} />
                </View>
            </View>
            {renderContent()}
        </View>
    );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff', 
    },
    headerContainer: {
        backgroundColor: '#FFF',
        paddingVertical: 22,
        paddingHorizontal: 18,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
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
        paddingTop: 10,
    },
    row: {
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    card: {
        width: (width - 36) / 2,
        backgroundColor: '#f9f9f9',
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#f0f0f0',
    },
    image: {
        width: '100%',
        height: 140,
    },
    heartIcon: {
        position: 'absolute',
        top: 7,
        right: 10,
        padding: 5,
        borderRadius: 20,
        backgroundColor: '#FFFFFF', 
        elevation: 2, //  shadow cho Android
        shadowColor: '#000', //  shadow cho iOS
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
    },
    heartIconPressed: {
        backgroundColor: '#e0e0e0',
    },
    infoContainer: {
        padding: 8,
    },
    name: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
        height: 34, 
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
        paddingHorizontal: 20,
    },
    unavailableOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    unavailableText: {
        color: '#a8a8a8',
        fontWeight: 'bold',
        fontSize: 16,
        backgroundColor: '#eee',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5
    },
    emptyText: {
        marginTop: 15,
        fontSize: 18,
        fontWeight: '600',
        color: '#555',
    },
    emptySubText: {
        marginTop: 5,
        fontSize: 14,
        color: '#888',
        textAlign: 'center',
    }
});