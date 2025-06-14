import { FlatList, StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useContext } from 'react'
import SearchBar from '../../components/SearchBar'
import Menubar from '../../components/Menubar'
import WinterBanner from '../../components/Banner'
import ProductItem from '../../components/ProductItems'
import { HomeNav, TabsNav } from '../../navigation/NavigationTypes'
import { useNavigation } from '@react-navigation/native'

export default function HomeScreen() {
    const tabNav = useNavigation<HomeNav>();
    const stackNav = useNavigation<TabsNav>();

    // const btnSeeall = () => {
    //     return (
    //         <TouchableOpacity
    //             onPress={() => {
    //                 navigation.navigate('Search')
    //             }}
    //         >
    //             <Text style={styles.txtRecommen}>See all</Text>
    //         </TouchableOpacity>
    //     )
    // }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity><Image source={require('../../../assets/images/fb.png')} style={styles.logo} resizeMode='contain' /></TouchableOpacity>
                <Text style={styles.txtTitle}>Trendsetter</Text>
                <TouchableOpacity><Image source={require('../../../assets/icons/cart_icon.png')} style={styles.cart} resizeMode='contain' /></TouchableOpacity>
            </View>
            <ScrollView showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <WinterBanner />
                <View style={styles.recommend}>
                    <Text style={styles.textRecommend}>Recommended for you</Text>
                    <TouchableOpacity
                        onPress={() => {
                            tabNav.navigate('Search')
                        }}
                    >
                        <Text style={styles.textRecommend}>See all</Text>
                    </TouchableOpacity>
                </View>
                {/* Flatlist Product */}
                <ProductItem navigation={stackNav} />

                <View style={styles.recommend}>
                    <Text style={styles.textRecommend}>Shop By Category</Text>
                </View>
                <ProductItem navigation={stackNav} />
                <View style={styles.recommend}>
                    <Text style={styles.textRecommend}>Most Popular</Text>
                    <TouchableOpacity
                        onPress={() => {
                            tabNav.navigate('Search')
                        }}
                    >
                        <Text style={styles.textRecommend}>See all</Text>
                    </TouchableOpacity>
                </View>
                <ProductItem navigation={stackNav} />
                <View style={styles.recommend}>
                    <Text style={styles.textRecommend}>Featured Appareal</Text>
                    <TouchableOpacity
                        onPress={() => {
                            tabNav.navigate('Search')
                        }}
                    >
                        <Text style={styles.textRecommend}>See all</Text>
                    </TouchableOpacity>
                </View>
                <ProductItem navigation={stackNav} />
                <WinterBanner />
                <View style={styles.recommend}>
                    <Text style={styles.textRecommend}>Featured Appareal</Text>
                    <TouchableOpacity
                        onPress={() => {
                            tabNav.navigate('Search')
                        }}
                    >
                        <Text style={styles.textRecommend}>See all</Text>
                    </TouchableOpacity>
                </View>
                <ProductItem navigation={stackNav} />


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
        height: 35,
        width: 50,
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
        marginHorizontal: 10,
        marginTop: 10,
    },
    textRecommend: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#006340',
    }
});