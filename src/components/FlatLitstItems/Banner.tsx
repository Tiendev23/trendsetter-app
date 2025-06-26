import React, { useEffect, useRef, useState, useMemo } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions, ActivityIndicator, Animated, ImageBackground,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../redux/features/product/productsSlice';
import { RootState, AppDispatch } from '../../redux/store';
import eventBus from '../../utils/Evenbus';
import { formatCurrency } from '../../utils/formatForm';

const { width } = Dimensions.get('window');
const WinterBanner = ({ navigation }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { items, loading, error } = useSelector((state: RootState) => state.products);
    const flatListRef = useRef<FlatList>(null);

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    // refeshing
    useEffect(() => {
        const listener = () => {
            dispatch(getAllProducts());
        };

        eventBus.on('REFRESH_ALL', listener);

        return () => {
            eventBus.off('REFRESH_ALL', listener);
        };
    }, []);

    const scrollX = useRef(new Animated.Value(0)).current;
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleMomentumScrollEnd = (event) => {
        const index = Math.round(event.nativeEvent.contentOffset.x / width);
        setCurrentIndex(index);
    };

    const shuffleArray = (array) => {
        return [...array].sort(() => Math.random() - 0.5);
    };


    const shuffledItems = useMemo(() => shuffleArray(items), [items]);
    // const shuffledItems = useMemo(() => {
    //     const filtered = items.filter(item => item.banner); // lọc trước
    //     return shuffleArray(filtered);
    // }, [items]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (shuffledItems.length > 0) {
                const nextIndex = (currentIndex + 1) % shuffledItems.length;
                flatListRef.current?.scrollToOffset({
                    offset: nextIndex * width,
                    animated: true,
                });
                setCurrentIndex(nextIndex);
            }
        }, 4000);

        return () => clearInterval(interval);
    }, [currentIndex, shuffledItems, width]);

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

    const BannerItem = ({ item }) => {
        return (
            <ImageBackground
                source={{ uri: item.banner }}
                style={styles.bannerItem}
                imageStyle={{ borderRadius: 12, resizeMode: 'cover', opacity: 0.9 }}
            >
                <View style={styles.textContainer}>
                    <Text style={styles.smallText} numberOfLines={1}>{item.name}</Text>
                    <Text style={styles.bigText} numberOfLines={1}>{formatCurrency(item.price)}</Text>
                    <Text style={styles.smallText} numberOfLines={1}>{item.description}</Text>

                </View>


                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('ProductDetail', { item })}
                >
                    <Text style={styles.buttonText}>Xem ngay</Text>
                </TouchableOpacity>
            </ImageBackground>
        );
    };

    return (
        <View style={styles.listContainer}>
            <Animated.FlatList
                ref={flatListRef}
                data={shuffledItems}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => <BannerItem item={item} />}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                initialNumToRender={4}
                maxToRenderPerBatch={8}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                onMomentumScrollEnd={handleMomentumScrollEnd}
            />

            {/* Dots */}
            <View style={styles.pagination}>
                {shuffledItems.map((_, index) => (
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
        //width: 397,
        width: width - 38,
        height: 140,
        flexDirection: 'row',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 17,
        marginTop: 4,
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
    },
    dotInactive: {
        backgroundColor: '#ccc',
    },
});

export default WinterBanner;
