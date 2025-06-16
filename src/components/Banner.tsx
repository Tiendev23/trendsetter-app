import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Dimensions,
    Animated,
    ImageBackground,
    ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../redux/features/product/productsSlice';
import { RootState, AppDispatch } from '../redux/store';

const { width } = Dimensions.get('window');

// Component hiển thị từng item banner với ảnh nền
const BannerItem = ({ item }) => {
    return (
        <ImageBackground
            source={{ uri: item.banner }}
            style={styles.bannerItem}
            imageStyle={{ borderRadius: 12 }}
        >
            <View style={styles.textContainer}>
                <Text style={styles.smallText} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.bigText} numberOfLines={1}>{item.price} đ</Text>
                <Text style={styles.smallText} numberOfLines={1}>{item.description}</Text>
            </View>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Xem ngay</Text>
            </TouchableOpacity>
        </ImageBackground>
    );
};

const WinterBanner = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { items, loading, error } = useSelector((state: RootState) => state.products);

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    const scrollX = useRef(new Animated.Value(0)).current;
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleMomentumScrollEnd = (event) => {
        const index = Math.round(event.nativeEvent.contentOffset.x / width);
        setCurrentIndex(index);
    };

    // const renderItem = ({ item }) => <BannerItem item={item} />;

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
    return (
        <View style={styles.listContainer}>
            <Animated.FlatList
                data={items}
                keyExtractor={(item) => item._id}
                renderItem={BannerItem}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                onMomentumScrollEnd={handleMomentumScrollEnd}
            />

            {/* Dots */}
            <View style={styles.pagination}>
                {items.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            currentIndex === index ? styles.dotActive : styles.dotInactive,
                        ]}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
    },
    bannerItem: {
        width: 397,
        height: 140,
        flexDirection: 'row',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 5,
        backgroundColor: 'blue'
    },
    textContainer: {
        flex: 1,
        marginRight: 10,
    },
    smallText: {
        color: '#fff',
        fontSize: 16,
        marginBottom: 4,
    },
    bigText: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    button: {
        backgroundColor: '#fff',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
    },
    buttonText: {
        color: '#006340',
        fontWeight: 'bold',
        fontSize: 16,
        textShadowColor: 'rgba(0,0,0,0.3)',
        textShadowOffset: { width: 1, height: 2 },
        textShadowRadius: 1,
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 16,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 4,
    },
    dotActive: {
        backgroundColor: '#006340',
        width: 12,
        height: 12,
        borderRadius: 6,
    },
    dotInactive: {
        backgroundColor: '#ccc',
    },
});

export default WinterBanner;
