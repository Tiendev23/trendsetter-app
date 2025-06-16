import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBrand } from '../redux/features/product/productsSlice';
import { RootState, AppDispatch } from '../redux/store';
import { DataContext } from '../contexts/DataContext';

const Menubar = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { brands, brandLoading, error } = useSelector((state: RootState) => state.products);
    const { selectedCategory, setSelectedCategory } = useContext(DataContext);

    // Gọi API khi component mount
    useEffect(() => {
        dispatch(getBrand());
    }, [dispatch]);

    // Loading state
    if (brandLoading === 'loading') {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#006340" />
                <Text>Đang tải sản phẩm...</Text>
            </View>
        );
    }

    // Error state
    if (brandLoading === 'failed') {
        return (
            <View style={styles.centered}>
                <Text style={{ color: 'red' }}>Lỗi: {error}</Text>
            </View>
        );
    }


    const renderItem = ({ item }) => {
        const isSelected = item._id === selectedCategory;

        return (
            <TouchableOpacity
                activeOpacity={0.8}
                style={[styles.menuItem, isSelected && styles.selectedItem]}
                onPress={() => setSelectedCategory(item._id)}
            >
                <Text style={[styles.menuText, isSelected && styles.selectedText]}>
                    {item.name}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={brands}
                horizontal
                keyExtractor={(item) => item._id}
                renderItem={renderItem}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
            />
        </View>
    );
};

export default Menubar;

const styles = StyleSheet.create({
    container: {
        height: 55,
        marginBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuItem: {
        paddingVertical: 10,
        paddingHorizontal: 22,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#c1c1c1',
    },
    selectedItem: {
        backgroundColor: 'rgba(186, 195, 185, 0.2)',
        borderColor: 'rgba(133, 223, 6, 0.7)',
    },
    menuText: {
        fontSize: 18,
        color: '#555',
        fontWeight: '600',
        textShadowColor: 'rgba(0,0,0,0.1)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    },
    selectedText: {
        color: '#006340',
        textShadowColor: 'rgba(0,0,0,0.4)',
        textShadowOffset: { width: 1, height: 2 },
        textShadowRadius: 1,
    },
});
