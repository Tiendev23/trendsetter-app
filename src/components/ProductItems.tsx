import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useContext } from 'react';
import { DataContext } from '../contexts/DataContext';

const ProductItem = () => {

    const { DataPr } = useContext(DataContext);
    const renderProduct = ({ item }) => {

        return (
            <TouchableOpacity style={styles.card}>
                <Image source={item.image} style={styles.image} />
                <TouchableOpacity style={styles.heartIcon}>
                    <Ionicons name="heart-outline" size={24} color="white" />
                </TouchableOpacity>

                <View style={styles.infoContainer}>
                    <Text style={styles.name}>{item.name}</Text>
                    <View style={styles.priceContainer}>
                        <Text style={styles.price}>${item.price}</Text>
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
                data={DataPr}
                renderItem={renderProduct}
                keyExtractor={(item) => item.id}
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
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        marginRight: 12,
        overflow: 'hidden',
        position: 'relative',
        boxSizing: 'border-box',
        height: 200,
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
    },
    price: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#7C4DFF',
        marginVertical: 4,
    },
    shipTag: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#999',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 5,
        alignSelf: 'flex-start',
    },
    shipText: {
        marginLeft: 4,
        fontSize: 12,
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    product: {
        marginTop: 10,
    }
});
