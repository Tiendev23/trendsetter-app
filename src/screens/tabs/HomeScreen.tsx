import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useMemo, useState } from 'react'
import { Image, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import WinterBanner from '../../components/HomeScreenItems/Banner'
import Menubar from '../../components/HomeScreenItems/Menubar'
import ProductItem from '../../components/HomeScreenItems/ProductItems'
import { HomeNav, TabsNav } from '../../navigation/NavigationTypes'
import eventBus from '../../utils/Evenbus'
import { getAllProducts, getAllRating, getBrand, getCampaigns } from '../../redux/features/product/productsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import ScreenHeader from '../../components/ScreenHeader'
import ToCartButton from '../../components/ToCartButton'
import ProductItemsbyRating from '../../components/HomeScreenItems/ProductItemsbyRating'
import { FlatList } from 'react-native-gesture-handler'
import { Campaign, ProductWithCampaign } from '../../types/Campaign'



export default function HomeScreen({ navigation }: { navigation: any }) {
    const tabNav = useNavigation<HomeNav>();
    const stackNav = useNavigation<TabsNav>();
    const [refreshing, setRefreshing] = useState(false);
    const { items, loading, error, brands, brandLoading, productsRatingLoading, productsRating, campaignsLoading, campaigns } = useSelector((state: RootState) => state.products);
    //rootstate
    const isLoading = loading === 'loading' || brandLoading === 'loading'
    const isFailed = loading === 'failed' || brandLoading === 'failed';
    const errorMassage = loading === 'failed' ? error : brandLoading === 'failed' ? "lỗi tải brand" : null
    //const campaignProducts = useCampaignProducts();

    //api
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        //api product
        dispatch(getAllProducts());
        //api brand
        dispatch(getBrand());
        dispatch(getCampaigns());

        dispatch(getAllRating());
    }, [dispatch]);

    // refreshing 
    const onRefresh = () => {
        setRefreshing(true);
        eventBus.emit('REFRESH_ALL');
        dispatch(getAllProducts()).finally(() => setRefreshing(false));
    }
    //
    const ProductRating = productsRating.filter(p => Number(p.rating?.average || 0) >= 4);

    return (
        <View style={styles.container}>
            <ScreenHeader
                title='Trendsetter'
                titleStyle={{
                    fontStyle: 'italic',
                    fontWeight: 'bold',
                    letterSpacing: 1
                }}
                leftButton={
                    <Image source={require('../../../assets/images/logo.jpg')} style={styles.logo} resizeMode='contain' />
                }
                rightButton={
                    <ToCartButton navigation={navigation} />
                }
            />
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
                        <WinterBanner navigation={stackNav} items={campaigns} />
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
                        <ProductItemsbyRating navigation={stackNav} items={ProductRating} />
                        <View style={styles.recommend}>
                            <Text style={styles.textRecommend}>Sản phẩm tiêu biểu</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('ProductlistScreen', { title: 'Sản phẩm quần áo tiêu biểu' })
                                }}
                            >
                                <Text style={styles.textRecommend}>Xem Thêm</Text>
                            </TouchableOpacity>
                        </View>
                        <ProductItem navigation={stackNav} items={items} />
                        <WinterBanner navigation={stackNav} items={campaigns} />
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
                        <ProductItem
                            navigation={stackNav}
                            items={
                                productsRating
                            }
                        />



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