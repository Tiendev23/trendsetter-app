import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ActivityIndicator, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { formatCurrency } from '../../utils/formatForm'
import ToCartButton from '../../components/ToCartButton';
const { width } = Dimensions.get('window');
import { getAllProducts, getProductById } from '../../redux/features/product/productsSlice';
import CustomDirectionButton from '../../components/buttons/ChevronButton';

const ProductlistScreen = ({ navigation, route, }) => {
    const { title, _id } = route.params;
    const dispatch = useDispatch<AppDispatch>();
    const { items, loading, error, productByIdStatus, productId } = useSelector((state: RootState) => state.products);
    const dataToRender = _id ? [productId] : items;

    useEffect(() => {
        if (_id) {
            dispatch(getProductById(_id));
            console.log('Gọi API getProductById với id:', _id);
        } else {
            dispatch(getAllProducts());
            console.log(' Gọi API getAllProducts');

        }
    }, [dispatch, _id]);

    if (loading === 'loading') {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#006340" />
                <Text>Đang tải sản phẩm...</Text>
            </View>
        );
    }

    if (loading === 'failed') {
        return (
            <View style={styles.center}>
                <Text style={{ color: 'red' }}>Lỗi: {error}</Text>
            </View>
        );
    }

    const renderProduct = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('ProductDetail', { item })}
        >
            <Image source={{ uri: item.image }} style={styles.image} />
            <TouchableOpacity style={styles.heartIcon}>
                <Ionicons name="heart-outline" size={20} color="white" />
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
    );

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerTitle}>{title}</Text>
                </View>
                <View style={styles.headerActions}>

                    <CustomDirectionButton
                        direction="back"
                        onPress={() => navigation.goBack()}
                    />

                    <ToCartButton navigation={navigation} />
                </View>
            </View>
            <View style={styles.product}>
                <FlatList
                    data={dataToRender}
                    renderItem={renderProduct}
                    keyExtractor={(item) => item._id}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    );
};

export default ProductlistScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerContainer: {
        paddingVertical: 22,
        paddingHorizontal: 18,
    },
    headerTitle: {
        fontWeight: '600',
        fontStyle: 'italic',
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
    product: {
        marginTop: 10,
        paddingHorizontal: 12,
    },
    row: {
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    card: {
        width: (width - 36) / 2, // (padding 12 * 2) + spacing 12
        height: 260,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        overflow: 'hidden',
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
        backgroundColor: '#E0E0E0',
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
    },
    price: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#006340',
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
