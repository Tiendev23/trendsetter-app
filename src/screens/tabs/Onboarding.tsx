import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from "react-native";

const { width, height } = Dimensions.get("window");

const ONBOARD_DATA = [
  {
    key: "splash",
    title: "TRENDSETTER",
    description: "",
    showButton: false,
  },
  {
    key: "onboard1",
    title: "TẠO NÊN XU HƯỚNG TRENDSETTER",
    description: "",
    image: require("../../../assets/images/1.jpg"),
    showButton: true,
    buttonText: "Bắt Đầu Miễn Phí",
  },
  {
    key: "onboard2",
    title: "Tỏa sáng mỗi ngày theo cách của riêng bạn",
    description:
      "Bộ sưu tập thời trang thông minh, cuốn hút và đẳng cấp – khám phá ngay",
    image: require("../../../assets/images/2.jpg"),
    showButton: true,
    buttonText: "Next",
  },
  {
    key: "onboard3",
    title: "Bạn Có Thể Tạo Nên Xu Hướng",
    description: "Có rất nhiều trang phục thời thượng và cuốn hút đang chờ bạn",
    image: require("../../../assets/images/3.jpg"),
    showButton: true,
    buttonText: "Next",
  },
];

const Onboarding = ({ navigation, onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const timerRef = useRef(null);

  // Auto slide 3s
  useEffect(() => {
    if (currentIndex < ONBOARD_DATA.length - 1) {
      timerRef.current = setTimeout(() => {
        setCurrentIndex((prev) => {
          const next = prev + 1;
          flatListRef.current?.scrollToIndex({ index: next });
          return next;
        });
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
        navigation.replace("Login");
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

  const skip = () => {
    if (navigation && navigation.replace) {
      navigation.replace("Login");
    } else if (onFinish) {
      onFinish();
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.page}>
      {/* Bỏ qua & Quay lại */}
      {index > 0 && (
        <TouchableOpacity style={styles.backBtn} onPress={goBack}>
          <Text style={styles.backText}>{"<"}</Text>
        </TouchableOpacity>
      )}
      {index !== 0 && (
        <TouchableOpacity style={styles.skipBtn} onPress={skip}>
          <Text style={styles.skipText}>Bỏ Qua</Text>
        </TouchableOpacity>
      )}
      {/* Ảnh hoặc chỉ chữ TRENDSETTER */}
      <View style={styles.imageWrap}>
        {index === 0 ? (
          <Text style={styles.logoTitle}>TRENDSETTER</Text>
        ) : (
          <Image
            source={item.image}
            style={styles.image}
            resizeMode="cover"
          />
        )}
      </View>
      {/* Title & Desc */}
      {index !== 0 && <Text style={styles.title}>{item.title}</Text>}
      {!!item.description && (
        <Text style={styles.desc}>{item.description}</Text>
      )}
      {/* Dots */}
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
      {/* Button */}
      {item.showButton && (
        <TouchableOpacity style={styles.button} onPress={goToNext}>
          <Text style={styles.buttonText}>{item.buttonText || "Next"}</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#137547" }}>
      <StatusBar barStyle="light-content" backgroundColor="#137547" />
      <FlatList
        ref={flatListRef}
        data={ONBOARD_DATA}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.key}
        extraData={currentIndex}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    width,
    height,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#137547",
    paddingHorizontal: 24,
  },
  imageWrap: {
    marginTop: 10,
    marginBottom: 24,
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.95,
    height: height * 0.42,
    overflow: "hidden",
    borderRadius: 24,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 24,
    resizeMode: "cover",
  },
  logoImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    marginTop: 80,
  },
  title: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 34,
    letterSpacing: 0.5,
  },
  logoTitle: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 0,
    letterSpacing: 2,
    fontStyle: "italic",
  },
  desc: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
    paddingHorizontal: 24,
    opacity: 0.9,
    lineHeight: 22,
  },
  button: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 32,
    marginTop: 16,
    minWidth: 220,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: "#137547",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 0.5,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
    marginBottom: 8,
  },
  dot: {
    width: 18,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#fff",
    marginHorizontal: 4,
    opacity: 0.4,
  },
  activeDot: {
    opacity: 1,
    backgroundColor: "#FFD600",
  },
  skipBtn: {
    position: "absolute",
    top: 48,
    right: 24,
    zIndex: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  skipText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    opacity: 0.9,
  },
  backBtn: {
    position: "absolute",
    top: 48,
    left: 24,
    zIndex: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  backText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 28,
    opacity: 0.9,
  },
});

export default Onboarding;
