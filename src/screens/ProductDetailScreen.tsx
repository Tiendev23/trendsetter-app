import React from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';

const sampleProducts = [
  { id: '1', name: 'Áo thun nam', price: 200000 },
  { id: '2', name: 'Quần jeans nữ', price: 350000 },
  { id: '3', name: 'Váy dạo phố', price: 450000 },
];

export default function ProductDetailScreen({ navigation }) {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={sampleProducts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { product: item })}>
            <View style={{ padding: 10, borderBottomWidth: 1 }}>
              <Text>{item.name}</Text>
              <Text>{item.price.toLocaleString()} VND</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <Button title="Giỏ hàng" onPress={() => navigation.navigate('Cart')} />
    </View>
  );
}
