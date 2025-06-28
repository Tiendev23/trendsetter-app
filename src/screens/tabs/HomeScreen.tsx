import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Image, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import WinterBanner from '../../components/HomeScreenItems/Banner'
import Menubar from '../../components/HomeScreenItems/Menubar'
import ProductItem from '../../components/HomeScreenItems/ProductItems'
import { HomeNav, TabsNav } from '../../navigation/NavigationTypes'
import eventBus from '../../utils/Evenbus'
import { getAllProducts, getBrand } from '../../redux/features/product/productsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'



export default function HomeScreen({ navigation }) {
    const tabNav = useNavigation<HomeNav>();
    const stackNav = useNavigation<TabsNav>();
    const [refreshing, setRefreshing] = useState(false);
    const { items, loading, error, brands, brandLoading } = useSelector((state: RootState) => state.products);
    //rootstate
    const isLoading = loading === 'loading' || brandLoading === 'loading'
    const isFailed = loading === 'failed' || brandLoading === 'failed';
    const errorMassage = loading === 'failed' ? error : brandLoading === 'failed' ? "lỗi tải brand" : null

    //api
    const dispatch = useDispatch<AppDispatch>();

    //api product
    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);
    //api brand
    useEffect(() => {
        dispatch(getBrand());
    }, [dispatch]);

    // refreshing 
    const onRefresh = () => {
        setRefreshing(true);
        eventBus.emit('REFRESH_ALL');
        dispatch(getAllProducts()).finally(() => setRefreshing(false));
    }
    // rootstate product



    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity><Image source={require('../../../assets/images/logo.jpg')} style={styles.logo} resizeMode='contain' /></TouchableOpacity>
                <Text style={styles.txtTitle}>Trendsetter</Text>
                <TouchableOpacity
                    onPress={() => {
                        stackNav.navigate('Cart')
                    }}
                ><Image source={require('../../../assets/icons/cart_icon.png')} style={styles.cart} resizeMode='contain' /></TouchableOpacity>
            </View>
            <ScrollView showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={isLoading || isFailed ? styles.centeredScroll : undefined}

                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor="#006340"
                        titleColor="#006340"
                        title='Đang tải sản phẩm'
                    />
                }
            >
                {isLoading && !refreshing ? (
                    <View style={styles.centered}>
                        <ActivityIndicator size="large" color="#006340" />
                        <Text>
                            {loading === 'loading'
                                ? 'Đang tải sản phẩm...'
                                : 'Đang tải thương hiệu...'}
                        </Text>
                    </View>
                ) : isFailed ? (
                    <View style={styles.centered}>
                        <Text style={{ color: 'red' }}>{errorMassage}</Text>
                    </View>
                ) : (!refreshing && (
                    <>
                        <WinterBanner navigation={stackNav} items={items} />
                        <View style={styles.recommend}>
                            <Text style={styles.textRecommend}>Gợi Ý Cho Bạn</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('ProductlistScreen', { title: 'Gợi ý Cho bạn' })
                                }}
                            >
                                <Text style={styles.textRecommend}>Xem Thêm</Text>
                            </TouchableOpacity>
                        </View>
                        {/* Flatlist Product */}
                        <ProductItem navigation={stackNav} items={items} />

                        <View style={styles.recommend}>
                            <Text style={styles.textRecommend}>Thương hiệu yêu thích </Text>
                        </View>
                        <Menubar navigation={stackNav} brands={brands} />
                        <View style={styles.recommend}>
                            <Text style={styles.textRecommend}>Phổ Biến Nhất</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('ProductlistScreen', { title: 'Phổ biến nhất' })
                                }}
                            >
                                <Text style={styles.textRecommend}>Xem Thêm</Text>
                            </TouchableOpacity>
                        </View>
                        <ProductItem navigation={stackNav} items={items} />
                        <View style={styles.recommend}>
                            <Text style={styles.textRecommend}>Sản phẩm quần áo tiêu biểu</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('ProductlistScreen', { title: 'Sản phẩm quần áo tiêu biểu' })
                                }}
                            >
                                <Text style={styles.textRecommend}>Xem Thêm</Text>
                            </TouchableOpacity>
                        </View>
                        <ProductItem navigation={stackNav} items={items} />
                        <WinterBanner navigation={stackNav} items={items} />
                        <View style={styles.recommend}>
                            <Text style={styles.textRecommend}>Sản Phẩm giảm giá</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('ProductlistScreen', { title: 'Sản phẩm giảm giá' })
                                }}
                            >
                                <Text style={styles.textRecommend}>Xem Thêm</Text>
                            </TouchableOpacity>
                        </View>
                        <ProductItem navigation={stackNav} items={items} />
                    </>
                ))}





            </ScrollView >


        </View >
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        boxSizing: 'border-box',
        padding: 10,
        backgroundColor: '#fff'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        height: 40,
        marginBottom: 5,
    },
    txtTitle: {
        fontSize: 24,
        color: '#006340',
        fontWeight: 'bold',
        fontStyle: 'italic',
    },
    logo: {
        height: 45,
        width: 50,
        borderRadius: 50
    },
    cart: {
        height: 35,
        width: 50,
    },
    input: {
        height: 40,
        borderColor: '#999',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 10
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    recommend: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10
    },
    textRecommend: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#006340',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 600, // hoặc Dimensions.get('window').height
    },

    centeredScroll: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});