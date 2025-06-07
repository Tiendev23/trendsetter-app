import { FlatList, StyleSheet, Text, TextInput, View, ScrollView } from 'react-native'
import React, { useContext } from 'react'
import SearchBar from '../../components/SearchBar'
import Menubar from '../../components/Menubar'
import WinterBanner from '../../components/Banner'
import ProductItem from '../../components/ProductItems'

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <SearchBar />
            <Menubar />
            <ScrollView showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <WinterBanner />
                <View style={styles.recommend}>
                    <Text style={styles.textRecommend}>Recommended for you</Text>
                    <Text style={styles.textRecommend}>See all</Text>
                </View>
                {/* Flatlist Product */}
                <ProductItem />
                <View style={styles.recommend}>
                    <Text style={styles.textRecommend}>Shop By Category</Text>
                </View>
                <ProductItem />
                <View style={styles.recommend}>
                    <Text style={styles.textRecommend}>Most Popular</Text>
                    <Text style={styles.textRecommend}>See all</Text>
                </View>
                <ProductItem />
                <View style={styles.recommend}>
                    <Text style={styles.textRecommend}>Featured Appareal</Text>
                    <Text style={styles.textRecommend}>See all</Text>
                </View>
                <ProductItem />
                <WinterBanner />
                <View style={styles.recommend}>
                    <Text style={styles.textRecommend}>Featured Appareal</Text>
                    <Text style={styles.textRecommend}>See all</Text>
                </View>
                <ProductItem />


            </ScrollView>


        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        boxSizing: 'border-box',
        padding: 10,
        backgroundColor: '#fff'
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
        marginTop: 10

    },
    textRecommend: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'Black',
    }
});