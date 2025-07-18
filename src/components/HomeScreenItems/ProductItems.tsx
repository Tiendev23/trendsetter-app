import { Ionicons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { ActivityIndicator, Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
// import { getAllProducts } from '../redux/slices/productSlice';
import { getAllProducts } from '../../redux/features/product/productsSlice';
import { AppDispatch, RootState } from '../../redux/store';
import { formatCurrency } from '../../utils/formatForm';
import { ProductsItem } from '../../navigation/NavigationTypes';
import { IMAGE_NOT_FOUND } from '../../types/models';


const { width, height } = Dimensions.get('window');

const ProductItem: React.FC<ProductsItem> = ({ navigation, items }) => {


    const renderProduct = ({ item }) => {

        return (
            <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('ProductDetail', {
                    productId: item._id,
                    // variantId: item.variants[0]._id
                })}
            >
                <Image
                    source={{ uri: item.image || IMAGE_NOT_FOUND }}
                    style={styles.image}
                />
                <TouchableOpacity style={styles.heartIcon}>
                    <Ionicons name="heart-outline" size={24} color="#006340" />
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
                initialNumToRender={4}
                maxToRenderPerBatch={8}
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
        height: 240,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        marginRight: 12,
        overflow: 'hidden',
        position: 'static',
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
        top: 7,
        right: 10,
        padding: 3,

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
        marginTop: 10
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
