import React, { useContext, useEffect, useState } from 'react';
import { Text, StyleSheet, View, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, { SharedValue, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { CartItem as Cart, IMAGE_NOT_FOUND, Product } from '../../types';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchProductById } from '../../redux/features/product/productSlice';
import { formatCurrency } from '../../utils/formatForm';
import Skeleton from '../loaders/Skeleton';
import { CartContext } from '../../contexts/CartContext';


export default function OrderDetailsItem({ item }: { item: Cart }) {
    const { setStatus } = useContext(CartContext)
    const dispatch = useAppDispatch();
    const { data, status, error } = useAppSelector(state => state.product);
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        dispatch(fetchProductById(item.product));
    }, [dispatch, item.product]);

    useEffect(() => {
        if (status[item.product] === "succeeded" && data[item.product]) {
            setProduct(data[item.product]);
            setStatus('succeeded');
        }
        if (status[item.product] === 'failed') {
            console.log('Lỗi fetchProductById:', error[item.product]);
        }
    }, [status, data, item.product]);

    // Sử dụng selector để lấy đúng sản phẩm từ Redux store
    // const product = useAppSelector((state) => selectById(state, item.product));
    // const status = useAppSelector((state) => state.product.status[item.product]);
    // const error = useAppSelector((state) => state.product.error[item.product]);

    // useEffect(() => {
    //     if (!product) dispatch(fetchProductById(item.product));
    // }, [dispatch, item.product, product]);

    return (
        <View>
            {
                status[item.product] === 'succeeded' ?
                    // product ?
                    <View style={styles.contentContainer}>
                        <View style={styles.image}>
                            <Image
                                source={{ uri: product?.image || IMAGE_NOT_FOUND }}
                                style={styles.image}
                            />
                        </View>
                        <View style={styles.infoWrapper}>
                            <Text
                                numberOfLines={2}
                                ellipsizeMode='tail'
                                style={styles.itemName}
                            >
                                {product?.name || 'Tên sản phẩm'}
                            </Text>
                            <Text>
                                Size {item.size} - Màu {item.color}
                            </Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.itemPrice}>
                                    {formatCurrency(item.price)}
                                </Text>
                                <Text>x{item.quantity}</Text>
                            </View>
                        </View>
                    </View>
                    :
                    <View style={styles.contentContainer}>
                        <View style={styles.image}>
                            <Skeleton width={'100%'} height={"100%"} />
                        </View>
                        <View style={styles.infoWrapper}>
                            <Skeleton width={200} height={20} />
                            <Skeleton width={150} height={20} />
                            <Skeleton width={100} height={20} />
                        </View>
                    </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    leftButton: {
        backgroundColor: '#006340',
        marginLeft: 18
    },
    rightButton: {
        backgroundColor: '#C21E0C',
        marginRight: 18
    },
    sideActionWrapper: {
        width: 65,
        borderRadius: 8,
    },
    contentContainer: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        gap: 18,
        alignItems: 'center',
        borderRadius: 8,
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
        flexShrink: 1
    },
    itemName: {
        fontFamily: 'Raleway',
        fontWeight: 'medium',
        fontSize: 16,
        color: '#1A2530',
    },
    itemPrice: {
        fontFamily: 'Raleway',
        fontWeight: '600',
        fontSize: 16,
        color: '#006340',
    }
});

