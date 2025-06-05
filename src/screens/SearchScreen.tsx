import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Image, StyleSheet, TouchableOpacity, Modal, Dimensions } from 'react-native';

type Product = {
  id: string;
  name: string;
  brand: string;
  price: string;
  category: string;
  image: any;
};

const { width } = Dimensions.get('window');

const ProductSearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Tất Cả');  
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Sample product data
  const products: Product[] = [
    {
      id: '1',
      name: 'Jordan',
      brand: 'Giày thể thao',
      price: '$58.7',
      category: 'Apparel',
      image: require('../../assets/pngaaa.png')
    },
    {
      id: '2',
      name: 'Air Max',
      brand: 'Nike',
      price: '$37.8',
      category: 'Giày thể thao',
      image: require('../../assets/pngaaa.png')
    },
    {
      id: '3',
      name: 'Club Max',
      brand: 'Nike',
      price: '$47.7',
      category: 'Giày thể thao',
      image: require('../../assets/pngaaa.png')
    },
    {
      id: '4',
      name: 'Air Max',
      brand: 'Nike',
      price: '$57.6',
      category: 'Giày hiệu',
      image: require('../../assets/pngaaa.png')
    },
    {
      id: '5',
      name: 'Air Max',
      brand: 'Nike',
      price: '$57.6',
      category: 'Giàynn',
      image: require('../../assets/pngaaa.png')
    },
    {
      id: '6',
      name: 'Air Max',
      brand: 'Nike',
      price: '$57.6',
      category: 'Giàynn',
      image: require('../../assets/pngaaa.png')
    }
  ];

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'Tất Cả' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Categories
  const categories = ['Tất Cả', 'Giày thể thao', 'Giày hiệu', 'Giàynn'];

  // Render product item
  const renderProductItem = ({ item }: { item: Product }) => (
    <View style={styles.productCard}>
      <Image
        source={typeof item.image === 'string' ? { uri: item.image } : item.image}
        style={styles.productImage}
        resizeMode="contain"
      />
      <View style={styles.productInfo}>
        <Text style={styles.productBrand}>{item.brand}</Text>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
      </View>
     
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Search bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by brand"
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Dropdown Menu */}
      <View style={styles.dropdownWrapper}>
        <TouchableOpacity 
          style={styles.dropdownHeader}
          onPress={() => setDropdownVisible(!dropdownVisible)}
          activeOpacity={0.7}
        >
          <Text style={styles.dropdownHeaderText}>{activeCategory}</Text>
          <Text style={styles.dropdownArrow}>{dropdownVisible ? '▲' : '▼'}</Text>
        </TouchableOpacity>

        <Modal
          transparent
          visible={dropdownVisible}
          animationType="fade"
          onRequestClose={() => setDropdownVisible(false)}
        >
          <TouchableOpacity 
            style={styles.dropdownOverlay}
            activeOpacity={1}
            onPress={() => setDropdownVisible(false)}
          >
            <View style={styles.dropdownMenu}>
              {categories.map(category => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.dropdownItem,
                    activeCategory === category && styles.activeDropdownItem
                  ]}
                  onPress={() => {
                    setActiveCategory(category);
                    setDropdownVisible(false);
                  }}
                  activeOpacity={0.6}
                >
                  <Text style={[
                    styles.dropdownItemText,
                    activeCategory === category && styles.activeDropdownItemText
                  ]}>
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </Modal>
      </View>

      {/* Product list */}
      <FlatList
        data={filteredProducts}
        renderItem={renderProductItem}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.productList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  demo: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  searchContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    height: 50,
    justifyContent: 'center',
  },
  searchInput: {
    fontSize: 16,
    color: '#333',
    height: '100%',
  },
  dropdownWrapper: {
    marginBottom: 20,
    zIndex: 10,
  },
  dropdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  dropdownHeaderText: {
    fontSize: 16,
    color: '#333',
  },
  dropdownArrow: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
  },
  dropdownOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownMenu: {
    width: width * 0.8,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  dropdownItem: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  activeDropdownItem: {
    backgroundColor: '#f8f8f8',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333',
  },
  activeDropdownItemText: {
    color: '#000',
    fontWeight: '600',
  },
  productList: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  productCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#f9f9f9',
  },
  productInfo: {
    marginBottom: 8,
  },
  productBrand: {
    fontSize: 14,
    color: '#666',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  
});

export default ProductSearchScreen;