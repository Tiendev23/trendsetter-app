import { FlatList, Text, TextInput, View, ScrollView, TouchableOpacity, Image, useWindowDimensions, RefreshControl, StyleSheet } from 'react-native'
import React, { useContext, useState } from 'react'
import SearchBar from '../../components/SearchBar'
import Menubar from '../../components/Menubar'
import WinterBanner from '../../components/Banner'
import ProductItem from '../../components/ProductItems'
import { HomeNav, TabsNav } from '../../navigation/NavigationTypes'
import { useNavigation } from '@react-navigation/native'
import eventBus from '../../utils/Evenbus'
import ScreenHeader from '../../components/ScreenHeader'
import ToCartButton from '../../components/ToCartButton'

export default function Home({ navigation }) {
    const tabNav = useNavigation<HomeNav>();
    const stackNav = useNavigation<TabsNav>();
    const [refreshing, setRefreshing] = useState(false);
    // refreshing
    const onRefresh = () => {
        setRefreshing(true);
        eventBus.emit('REFRESH_ALL');
        setRefreshing(false);
    }

    return (
        <View style={{ backgroundColor: '#fff' }}>
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
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={['#006340']}
                    />
                }
            >
                <View style={styles.container}>
                    <WinterBanner navigation={stackNav} />
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
                    <ProductItem navigation={stackNav} />

                    <View style={styles.recommend}>
                        <Text style={styles.textRecommend}>Mua sắm theo danh mục</Text>
                    </View>
                    <Menubar navigation={stackNav} />
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
                    <ProductItem navigation={stackNav} />
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
                    <ProductItem navigation={stackNav} />
                    <WinterBanner navigation={stackNav} />
                    <View style={styles.recommend}>
                        <Text style={styles.textRecommend}>Sản Phẩm Quần Áo Tiêu Biểu</Text>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('ProductlistScreen', { title: 'Sản phẩm quần áo tiêu biểu' })
                            }}
                        >
                            <Text style={styles.textRecommend}>Xem Thêm</Text>
                        </TouchableOpacity>
                    </View>
                    <ProductItem navigation={stackNav} />
                </View>
            </ScrollView >


        </View >
    )
};


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
        borderRadius: 25
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
    }
});