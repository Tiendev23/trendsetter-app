import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

type Props = {
  name: string;
  price: number;
  image: string;
  onPress: () => void;
};

export default function ProductCard({ name, price, image, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text numberOfLines={1} style={styles.name}>{name}</Text>
      <Text style={styles.price}>{price.toLocaleString('vi-VN')} đ</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 150,
    marginRight: 15,
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 2,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: '#4caf50',
    fontWeight: '700',
  },
});
