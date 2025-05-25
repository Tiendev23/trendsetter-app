import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';

type Category = {
  id: string;
  name: string;
  image: string;
};

type Props = {
  categories: Category[];
  onPressCategory: (categoryId: string) => void;
};

export default function CategoryList({ categories, onPressCategory }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh mục</Text>
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.categoryItem}
            onPress={() => onPressCategory(item.id)}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
  },
  categoryItem: {
    marginRight: 15,
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 6,
  },
  name: {
    fontSize: 14,
  },
});
