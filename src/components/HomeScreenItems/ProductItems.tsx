import React, { useContext, useMemo } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  Pressable,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';

import { formatCurrency } from '../../utils/formatForm';
import { ProductsItem } from '../../navigation/NavigationTypes';
import { IMAGE_NOT_FOUND } from '@/types/Products/products';
import { ProductVariant } from '@/types/Products/productVariant';
import { AppDispatch, RootState } from '@/redux/store';
import { AuthContext } from '@/contexts/AuthContext';
import { FavoriteContext } from '@/contexts/FavoriteContext';

// CHANGED: Import thêm các actions "lạc quan"
import {
  addFavorite,
  removeFavorite,
  optimisticAddFavorite,
  optimisticRemoveFavorite
} from '@/redux/features/product/favoriteSlice';


// Constants
const { width } = Dimensions.get('window');
const ITEM_WIDTH = Math.round(width * 0.43);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 4) / 3);

// Hàm chuyển đổi giới tính sản phẩm
export const getGender = (gender?: string) => {
  if (gender === 'male') return 'Nam';
  if (gender === 'female') return 'Nữ';
  return '';
};

// Component chính
const ProductItem: React.FC<ProductsItem> = ({ navigation, items }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useContext(AuthContext)!;
  const { isLiked, toggleLike: toggleLikeGuest } = useContext(FavoriteContext)!;

  const { favorites } = useSelector((state: RootState) => state.favorite);

  const shuffle = useMemo(() => {
    if (!Array.isArray(items)) return [];
    return [...items].sort(() => Math.random() - 0.5);
  }, [items]);


  const handleToggleLike = (variant: ProductVariant) => { 
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

  const renderProduct = ({ item }: { item: ProductVariant }) => {
    const isUnavailable = item.active === false;
    const gender = getGender(item.product?.gender);
    const ProductName = `${item.product?.name}${gender ? `-${gender}` : ``}`;

    const liked = user?._id
      ? favorites.some((f) => f._id === item._id)
      : isLiked(item._id);


    return (
      <Pressable
        style={[styles.card, isUnavailable && styles.unavailableCard]}
        onPress={() =>
          navigation.navigate('ProductDetail', {
            productId: item.product._id,
            variantId: item._id,
          })
        }
      >
        <Image
          source={{ uri: item.images?.[0] || IMAGE_NOT_FOUND }}
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
          onPress={(e) => {
            e.stopPropagation(); // Ngăn sự kiện press lan ra card bên ngoài
            handleToggleLike(item);
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
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {item.basePrice > item.finalPrice && (
              <Text
                style={[
                  styles.price,
                  {
                    marginRight: 5,
                    textDecorationLine: 'line-through',
                    color: 'rgba(24, 99, 19, 0.5)',
                  },
                ]}
              >
                {formatCurrency(item.basePrice)}
              </Text>
            )}
            <Text style={styles.price}>{formatCurrency(item.finalPrice)}</Text>
          </View>

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
        data={shuffle.slice(0, 5)}
        renderItem={renderProduct}
        keyExtractor={(item) => item._id}
        initialNumToRender={8}
        maxToRenderPerBatch={16}
        horizontal
        showsHorizontalScrollIndicator={false}
        extraData={favorites}
      />
    </View>
  );
};

export default ProductItem;

// Styles
const styles = StyleSheet.create({
  card: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    backgroundColor: '#f9f9f9',
    borderRadius: 20,
    marginRight: 12,
    overflow: 'hidden',
    position: 'relative',
    borderWidth:0.1
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
    borderRadius: 20,
    backgroundColor: '#E0E0E0',

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
    marginLeft: 5,
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