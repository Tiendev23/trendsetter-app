// screens/FavoritesScreen.tsx

import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    Dimensions,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenHeader } from '@/components';
import { IMAGE_NOT_FOUND } from '@/types/Products/products';

const { width } = Dimensions.get('window');
const FAKE_FAVORITES_PRODUCTS = [
    {
        _id: "variant_001",
        images: ["https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=2564&auto=format&fit=crop"],
        finalPrice: 350000,
        color: "Đen",
        product: { _id: "prod_123", name: "Sandal Đế Cao Su", active: true },
        inventories: [{ stock: 10 }],
        active: true,
    },
    {
        _id: "variant_002",
        images: ["https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=2564&auto=format&fit=crop"],
        finalPrice: 175000,
        color: "Trắng",
        product: { _id: "prod_124", name: "Áo Thun Cotton Basic", active: true },
        inventories: [{ stock: 0 }],
        active: true,
    },
    {
        _id: "variant_003",
        images: ["https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=2564&auto=format&fit=crop"],
        finalPrice: 210000,
        color: "Xanh Navy",
        product: { _id: "prod_125", name: "Áo Thun In Họa Tiết", active: true },
        inventories: [{ stock: 3 }],
        active: true,
    },
    {
        _id: "variant_004",
        images: ["https://images.unsplash.com/photo-1558863695-8f6a39396263?q=80&w=2564&auto=format&fit=crop"],
        finalPrice: 420000,
        color: "Nâu",
        product: { _id: "prod_126", name: "Sandal Da Quai Chéo", active: true },
        inventories: [{ stock: 0 }],
        active: true,
    },
];

const FavoriteItemCard = ({ item, onRemove, navigation }) => {
    const handlePress = () => {
        navigation.navigate('ProductDetail', {
            productId: item.product._id,
            initialVariantId: item._id,
        });
    };

    const handleRemovePress = () => {
        Alert.alert(
            "Xác nhận",
            "Bạn có chắc muốn xóa sản phẩm này khỏi danh sách yêu thích?",
            [
                { text: "Hủy", style: "cancel" },
                { text: "Xóa", onPress: () => onRemove(item._id), style: "destructive" },
            ]
        );
    };

    const isOutOfStock = item.inventories?.reduce((acc, inv) => acc + inv.stock, 0) === 0;

    return (
        <TouchableOpacity style={cardStyles.card} onPress={handlePress} activeOpacity={0.85}>
            <Image
                source={{ uri: item.images?.[0] || IMAGE_NOT_FOUND }}
                style={[cardStyles.image, isOutOfStock && { opacity: 0.4 }]}
            />

            {isOutOfStock && (
                <View style={cardStyles.outOfStockOverlay}>
                    <Text style={cardStyles.outOfStockText}>Hết hàng</Text>
                </View>
            )}

            <TouchableOpacity style={cardStyles.heartButton} onPress={handleRemovePress}>
                <Ionicons name="heart" size={22} color="red" />
            </TouchableOpacity>

            <View style={cardStyles.infoContainer}>
                <Text numberOfLines={2} style={cardStyles.name}>
                    {`${item.product.name} - ${item.color}`}
                </Text>
                <Text style={cardStyles.price}>{item.finalPrice.toLocaleString('vi-VN')}đ</Text>
            </View>
        </TouchableOpacity>
    );
};


export default function FavoritesScreen({ navigation }) {
    const [favorites, setFavorites] = useState(FAKE_FAVORITES_PRODUCTS);

    const handleRemoveFavorite = (variantId: string) => {
        setFavorites((prev) => prev.filter((item) => item._id !== variantId));
    };

    return (
        <View style={styles.container}>
            <ScreenHeader title="Sản phẩm Yêu thích" showBackButton navigation={navigation} />
            <FlatList
                data={favorites}
                keyExtractor={(item) => item._id}
                numColumns={2}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <View style={styles.itemWrapper}>
                        <FavoriteItemCard
                            item={item}
                            onRemove={handleRemoveFavorite}
                            navigation={navigation}
                        />
                    </View>
                )}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Ionicons name="heart-dislike-outline" size={64} color="#ccc" />
                        <Text style={styles.emptyText}>Danh sách yêu thích trống</Text>
                        <Text style={styles.emptySubText}>
                            Hãy "thả tim" các sản phẩm bạn yêu thích để xem lại sau nhé!
                        </Text>
                    </View>
                }
            />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    listContent: {
        paddingHorizontal: 8,
        paddingTop: 8,
        paddingBottom: 80,
    },
    itemWrapper: {
        flex: 1 / 2,
        padding: 8,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: width * 0.3,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#555',
        marginTop: 16,
    },
    emptySubText: {
        fontSize: 14,
        color: '#888',
        marginTop: 8,
        paddingHorizontal: 32,
        textAlign: 'center',
    },
});

const cardStyles = StyleSheet.create({
    card: {
        backgroundColor: '#fdfdfd',
        borderRadius: 12,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#eee',
        position: 'relative',
    },
    image: {
        width: '100%',
        aspectRatio: 1,
    },
    outOfStockOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255,255,255,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    outOfStockText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'green',
    },
    heartButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 6,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    infoContainer: {
        padding: 10,
    },
    name: {
        fontSize: 14,
        fontWeight: '500',
        minHeight: 36,
        color: '#333',
    },
    price: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#007f5f',
        marginTop: 4,
    },
});
