import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions, Animated } from 'react-native';

// Lấy width màn hình
const { width } = Dimensions.get('window');

// Component: 1 banner
const BannerItem = ({ item }) => {
  return (
    <View style={[styles.bannerItem, { backgroundColor: item.backgroundColor }]}>
      <View style={styles.textContainer}>
        <Text style={styles.smallText} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.bigText} numberOfLines={1}>{item.discount}</Text>
        <Text style={styles.smallText} numberOfLines={1}>{item.subtitle}</Text>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>{item.buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

// Component: Banner + pagination
const WinterBanner = () => {
  const bannerData = [
    {
      id: '1',
      title: 'Get Winter Discount',
      discount: '20% Off',
      subtitle: 'For Children',
      backgroundColor: '#006340',
      buttonText: 'Shop Now',
    },
    {
      id: '2',
      title: 'Summer Sale',
      discount: '50% Off',
      subtitle: 'For Everyone',
      backgroundColor: '#FF5733',
      buttonText: 'Explore Now',
    },
    {
      id: '3',
      title: 'Autumn Special',
      discount: '30% Off',
      subtitle: 'Limited Time',
      backgroundColor: '#8E44AD',
      buttonText: 'Buy Now',
    },
  ];

  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  // Bắt sự kiện scroll xong để update index (cho dot)
  const handleMomentumScrollEnd = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const renderItem = ({ item }) => <BannerItem item={item} />;

  return (
    <View style={styles.listContainer}>
      <Animated.FlatList
        data={bannerData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false } // không dùng listener ở đây
        )}
        onMomentumScrollEnd={handleMomentumScrollEnd} // dùng để update currentIndex
      />

      {/* Pagination dots */}
      <View style={styles.pagination}>
        {bannerData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index ? styles.dotActive : styles.dotInactive,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
  bannerItem: {
    width: 395,
    height: 140,
    flexDirection: 'row',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 5,
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  smallText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 4,
  },
  bigText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  button: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: '#006340',
    fontWeight: 'bold',
    fontSize: 16,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 1,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: '#006340',
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  dotInactive: {
    backgroundColor: '#ccc',
  },
});

export default WinterBanner;
