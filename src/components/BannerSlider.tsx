import React from 'react';
import { View, Image, FlatList, Dimensions, StyleSheet } from 'react-native';

type Banner = {
  id: string;
  image: string;
};

type Props = {
  banners: Banner[];
};

const { width } = Dimensions.get('window');

export default function BannerSlider({ banners }: Props) {
  return (
    <FlatList
      data={banners}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Image source={{ uri: item.image }} style={styles.image} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width,
    height: 180,
    resizeMode: 'cover',
  },
});
