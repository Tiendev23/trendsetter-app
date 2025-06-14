import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useContext, useEffect } from 'react';
import { DataContext } from '../contexts/DataContext';
import { useDispatch, useSelector } from 'react-redux';
// import { getAllProducts } from '../redux/slices/productSlice';
import { RootState, AppDispatch } from '../redux/store';
import { getAllProducts } from '../redux/features/product/productSlice';
import { TabsNav } from '../navigation/NavigationTypes';
import { formatCurrency } from '../utils/formatForm';

const ProductItem = ({ navigation }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { items, loading, error } = useSelector((state: RootState) => state.products);

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    if (loading === 'loading') {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#006340" />
                <Text>Đang tải sản phẩm...</Text>
            </View>
        );
    }

    if (loading === 'failed') {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'red' }}>Lỗi: {error}</Text>
            </View>
        );
    }
    const { DataPr } = useContext(DataContext);
    const renderProduct = ({ item }) => {

        return (
            <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('ProductDetail', { item })}
            >
                <Image source={{ uri: item.image }} style={styles.image} />
                <TouchableOpacity style={styles.heartIcon}>
                    <Ionicons name="heart-outline" size={24} color="white" />
                </TouchableOpacity>

                <View style={styles.infoContainer}>
                    <Text numberOfLines={1} style={styles.name}>{item.name}</Text>
                    <View style={styles.priceContainer}>
                        <Text style={styles.price}>{formatCurrency(item.price)}</Text>
                        <View style={styles.shipTag}>
                            <Ionicons name="rocket-outline" size={14} color="#000" />
                            <Text style={styles.shipText}>Xpress Ship</Text>
                        </View>
                    </View>

                </View>
            </TouchableOpacity>

        )
    }

    return (
        <View style={styles.product}>
            <FlatList
                data={items}
                renderItem={renderProduct}
                keyExtractor={(item) => item._id}

                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

export default ProductItem;

const styles = StyleSheet.create({
    card: {
        width: 160,
        height: 215,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        marginRight: 12,
        overflow: 'hidden',
        position: 'relative',
        boxSizing: 'border-box',

    },
    image: {
        width: '100%',
        height: 140,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    heartIcon: {
        position: 'absolute',
        top: 8,
        right: 8,
        padding: 5,
        borderRadius: 20,
        borderWidth: 1,
        backgroundColor: "#E0E0E0"
    },
    infoContainer: {
        padding: 8,
    },
    name: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
        width: 100,

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
        alignSelf: 'flex-start',
    },
    shipText: {
        marginLeft: 4,
        fontSize: 12,
        color: '#006340'

    },
    priceContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    product: {
        marginTop: 10,
    }
});
