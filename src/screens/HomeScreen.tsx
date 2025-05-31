import { FlatList, StyleSheet, Text, TextInput, View ,ScrollView} from 'react-native'
import React, { useContext } from 'react'
import SearchBar from '../components/SearchBar'
import Menubar from '../components/Menubar'
import WinterBanner from '../components/Banner'
import { AppContext } from '../contexts/Appcontext'
import ProductItem from '../components/ProductItems'
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <SearchBar />
      <Menubar />
      <ScrollView showsHorizontalScrollIndicator = {false}>
      <WinterBanner />
      <View style={styles.recomment}>
        <Text style={styles.txtRecommen}>Recommended for you</Text>
        <Text style={styles.txtRecommen}>See all</Text>
      </View>
      {/* Flatlist Product */}
      <ProductItem/>
      <View style={styles.recomment}>
        <Text style={styles.txtRecommen}>Shop By Category</Text>
      </View>
      <ProductItem/>
      <View style={styles.recomment}>
        <Text style={styles.txtRecommen}>Most Popular</Text>
        <Text style={styles.txtRecommen}>See all</Text>
      </View>
      <ProductItem/>
      <View style={styles.recomment}>
        <Text style={styles.txtRecommen}>Featured Appareal</Text>
        <Text style={styles.txtRecommen}>See all</Text>
      </View>
      <ProductItem/>
      <WinterBanner />
      <View style={styles.recomment}>
        <Text style={styles.txtRecommen}>Featured Appareal</Text>
        <Text style={styles.txtRecommen}>See all</Text>
      </View>
      <ProductItem/>
      <View style={{ height: 120 }} />

      </ScrollView>
      

    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    padding: 10,
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
  recomment: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginTop: 10

  },
  txtRecommen: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'Black',
  }
});