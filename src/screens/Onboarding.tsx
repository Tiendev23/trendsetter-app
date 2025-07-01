import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native';

const { width, height } = Dimensions.get('window');

const ONBOARD_DATA = [
  {
    key: 'splash',
    title: 'TRENDSETTER',
    description: '',
    image: require('../../assets/images/logo.jpg'),
    showButton: false,
  },
  {
    key: 'onboard1',
    title: 'TẠO NÊN XU HƯỚNG TRENDSETTER',
    description: '',
    image: require('../../assets/images/biti_hunter.png'),
    showButton: true,
    buttonText: 'Bắt Đầu Khám Phá',
  },
  {
    key: 'onboard2',
    title: 'Tỏa sáng mỗi ngày theo cách của riêng bạn',
    description: 'Bộ sưu tập thời trang thông minh, cuốn hút và đẳng cấp – Khám phá ngay',
    image: require('../../assets/images/anh2.png'),
    showButton: true,
    buttonText: 'Next',
  },
  {
    key: 'onboard3',
    title: 'Bạn Có Thể Tạo Nên Xu Hướng',
    description: 'Có rất nhiều trang phục thời thượng và cuốn hút đang chờ bạn',
    image: require('../../assets/images/order_failed.png'),
    showButton: true,
    buttonText: 'Next',
  },
];

const Onboarding = ({ navigation, onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (currentIndex < ONBOARD_DATA.length - 1) {
      timerRef.current = setTimeout(() => {
        goToNext();
      }, 3000);
    }
    return () => clearTimeout(timerRef.current);
  }, [currentIndex]);

  const goToNext = () => {
    if (currentIndex < ONBOARD_DATA.length - 1) {
      setCurrentIndex(currentIndex + 1);
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      if (navigation && navigation.replace) {
        navigation.replace('Login');
      } else if (onFinish) {
        onFinish();
      }
    }
  };

  const goBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      flatListRef.current?.scrollToIndex({ index: currentIndex - 1 });
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.page}>
      {index > 0 && (
        <TouchableOpacity style={styles.backBtn} onPress={goBack}>
          <Text style={styles.backText}>{'quay lại'}</Text>
        </TouchableOpacity>
      )}
      {index !== 0 && (
        <TouchableOpacity style={styles.skipBtn} onPress={() => {
          if (navigation && navigation.replace) {
            navigation.replace('Login');
          } else if (onFinish) {
            onFinish();
          }
        }}>
          <Text style={styles.skipText}>Bỏ qua</Text>
        </TouchableOpacity>
      )}
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>{item.title}</Text>
      {!!item.description && <Text style={styles.desc}>{item.description}</Text>}
      {index === 0 && (
        <TouchableOpacity style={styles.button} onPress={() => {
          setCurrentIndex(1);
          flatListRef.current?.scrollToIndex({ index: 1 });
        }}>
          <Text style={styles.buttonText}>Bắt Đầu Khám Phá</Text>
        </TouchableOpacity>
      )}
      {index !== 0 && (
        <View style={styles.dotsContainer}>
          {ONBOARD_DATA.slice(1).map((_, idx) => (
            <View
              key={idx}
              style={[styles.dot, idx === currentIndex - 1 && styles.activeDot]}
            />
          ))}
        </View>
      )}
      {index !== 0 && (
        <TouchableOpacity style={styles.button} onPress={goToNext}>
          <Text style={styles.buttonText}>{item.buttonText || 'Next'}</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <FlatList
      ref={flatListRef}
      data={ONBOARD_DATA}
      renderItem={renderItem}
      horizontal
      pagingEnabled
      scrollEnabled={false}
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item.key}
      extraData={currentIndex}
    />
  );
};

const styles = StyleSheet.create({
  page: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#137547',
  },
  image: {
    width: width * 0.7,
    height: height * 0.35,
    marginBottom: 30,
  },
  title: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  desc: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 24,
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginBottom: 24,
  },
  buttonText: {
    color: '#137547',
    fontWeight: 'bold',
    fontSize: 16,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginHorizontal: 4,
    opacity: 0.4,
  },
  activeDot: {
    opacity: 1,
    backgroundColor: '#FFD600',
  },
  skipBtn: {
    position: 'absolute',
    top: 40,
    right: 24,
    zIndex: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  skipText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    opacity: 0.9,
  },
  backBtn: {
    position: 'absolute',
    top: 40,
    left: 24,
    zIndex: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  backText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 22,
    opacity: 0.9,
  },
});

export default Onboarding; 