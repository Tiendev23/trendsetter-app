import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
  Pressable,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getAllProducts } from "../../redux/features/product/productsSlice";
import { fetchCategories } from "../../redux/features/category/categoriesSlice";
import { ProductVariant } from "../../types/Products/productVariant";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import { formatCurrency } from "../../utils/formatForm";
import { AuthContext } from "../../contexts/AuthContext";
import { FavoriteContext } from "../../contexts/FavoriteContext";
import {
  addFavorite,
  removeFavorite,
  optimisticAddFavorite,
  optimisticRemoveFavorite,
} from "../../redux/features/product/favoriteSlice";
import { IMAGE_NOT_FOUND } from "../../types/Products/products";

const { width } = Dimensions.get("window");

export default function SearchScreen() {
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tất Cả");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const {
    items = [],
    loading,
    error,
  } = useAppSelector((state) => state.products);
  const { cateList, cateStatus, cateError } = useAppSelector(
    (state) =>
      state.categories || { cateList: [], cateStatus: false, cateError: null }
  );

  // Context cho favorite
  const { user } = useContext(AuthContext)!;
  const { isLiked, toggleLike: toggleLikeGuest } = useContext(FavoriteContext)!;
  const { favorites } = useAppSelector((state) => state.favorite);

  const priceFilters = [
    { label: "Tất cả", min: 0, max: Infinity },
    { label: "0 - 100 ngàn", min: 0, max: 100_000 },
    { label: "110 ngàn - 120 ngàn", min: 110_000, max: 120_000 },

    // Giá cao nhất sẽ được cập nhật động phía dưới
  ];
  const [activePriceFilter, setActivePriceFilter] = useState(priceFilters[0]);

  // Tìm giá cao nhất trong list
  const maxPrice =
    items && items.length > 0
      ? Math.max(...items.map((p) => p.finalPrice || 0))
      : 0;
  const dynamicPriceFilters = priceFilters;

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const categories = ["Tất Cả", ...(cateList || []).map((c) => c.name)];

  const filteredProducts = (items || []).filter((product: ProductVariant) => {
    const matchCategory =
      activeCategory === "Tất Cả" ||
      product.product.category?.name === activeCategory;
    const matchSearch =
      (product.product.name?.toLowerCase() || "").includes(
        searchQuery.toLowerCase()
      ) ||
      (product.product.brand?.name?.toLowerCase() || "").includes(
        searchQuery.toLowerCase()
      );
    const matchPrice =
      product.finalPrice >= activePriceFilter.min &&
      product.finalPrice <= activePriceFilter.max;
    return matchCategory && matchSearch && matchPrice;
  });

  const handleToggleLike = (variant: ProductVariant) => {
    if (user?._id) {
      const { _id: variantId } = variant;
      const isAlreadyLiked = favorites.some((f) => f._id === variantId);

      if (isAlreadyLiked) {
        dispatch(optimisticRemoveFavorite({ variantId }));
        dispatch(removeFavorite({ _id: user._id, variantId }));
      } else {
        dispatch(optimisticAddFavorite(variant));
        dispatch(addFavorite({ _id: user._id, variantId }));
      }
    } else {
      toggleLikeGuest(variant._id);
    }
  };

  const renderProductItem = ({ item }: { item: ProductVariant }) => {
    const isUnavailable = item.active === false;
    const liked = user?._id
      ? favorites.some((f) => f._id === item._id)
      : isLiked(item._id);

    return (
      <Pressable
        style={[styles.productCard, isUnavailable && styles.unavailableCard]}
        onPress={() =>
          navigation.navigate("ProductDetail", {
            productId: item.product._id,
            variantId: item._id,
          })
        }
      >
        <Image
          source={{ uri: item.images?.[0] || IMAGE_NOT_FOUND }}
          style={styles.productImage}
          resizeMode="contain"
        />

        {isUnavailable && (
          <View style={styles.unavailableOverlay}>
            <Text style={styles.unavailableText}>Tạm hết hàng</Text>
          </View>
        )}

        <Pressable
          style={({ pressed }) => [
            styles.heartIcon,
            pressed && styles.heartIconPressed,
          ]}
          onPress={(e) => {
            e.stopPropagation(); // Ngăn sự kiện press lan ra card bên ngoài
            handleToggleLike(item);
          }}
        >
          <Ionicons
            name={liked ? "heart" : "heart-outline"}
            size={24}
            color={liked ? "#ff0000" : "#006340"}
          />
        </Pressable>

        <View style={styles.productInfo}>
          <Text numberOfLines={1} style={styles.productName}>
            {item.product.name}
          </Text>
          <View style={styles.priceContainer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {item.basePrice > item.finalPrice && (
                <Text
                  style={[
                    styles.productPrice,
                    {
                      marginRight: 5,
                      textDecorationLine: "line-through",
                      color: "rgba(24, 99, 19, 0.5)",
                    },
                  ]}
                >
                  {formatCurrency(item.basePrice)}
                </Text>
              )}
              <Text style={styles.productPrice}>
                {formatCurrency(item.finalPrice)}
              </Text>
            </View>
            <View style={styles.shipTag}>
              <Ionicons name="rocket-outline" size={14} color="#000" />
              <Text style={styles.shipText}>Xpress Ship</Text>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  // State cho dropdown filter giá
  const [dropdownVisiblePrice, setDropdownVisiblePrice] = useState(false);

  return (
    <View style={styles.container}>
      {/* Search */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm theo tên hoặc thương hiệu"
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Dropdown danh mục */}
      <View style={styles.dropdownWrapper}>
        <TouchableOpacity
          style={styles.dropdownHeader}
          onPress={() => setDropdownVisible(!dropdownVisible)}
        >
          <Text style={styles.dropdownHeaderText}>{activeCategory}</Text>
          <Text style={styles.dropdownArrow}>
            {dropdownVisible ? "▲" : "▼"}
          </Text>
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
              <FlatList
                data={categories}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.dropdownItem,
                      activeCategory === item && styles.activeDropdownItem,
                    ]}
                    onPress={() => {
                      setActiveCategory(item);
                      setDropdownVisible(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.dropdownItemText,
                        activeCategory === item &&
                          styles.activeDropdownItemText,
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      </View>

      {/* Dropdown filter giá - dùng cùng style với filter danh mục */}
      <View style={styles.dropdownWrapper}>
        <TouchableOpacity
          style={styles.dropdownHeader}
          onPress={() => setDropdownVisiblePrice(!dropdownVisiblePrice)}
        >
          <Text style={styles.dropdownHeaderText}>
            {activePriceFilter.label}
          </Text>
          <Text style={styles.dropdownArrow}>
            {dropdownVisiblePrice ? "▲" : "▼"}
          </Text>
        </TouchableOpacity>
        <Modal
          transparent
          visible={dropdownVisiblePrice}
          animationType="fade"
          onRequestClose={() => setDropdownVisiblePrice(false)}
        >
          <TouchableOpacity
            style={styles.dropdownOverlay}
            activeOpacity={1}
            onPress={() => setDropdownVisiblePrice(false)}
          >
            <View style={styles.dropdownMenu}>
              <FlatList
                data={dynamicPriceFilters}
                keyExtractor={(item) => item.label}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.dropdownItem,
                      activePriceFilter.label === item.label &&
                        styles.activeDropdownItem,
                    ]}
                    onPress={() => {
                      setActivePriceFilter(item);
                      setDropdownVisiblePrice(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.dropdownItemText,
                        activePriceFilter.label === item.label &&
                          styles.activeDropdownItemText,
                      ]}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      </View>

      {/* Loading state */}
      {loading === "loading" && (
        <View style={styles.centerContainer}>
          <Text>Đang tải...</Text>
        </View>
      )}

      {/* Error state */}
      {loading === "failed" && (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>Lỗi: {error}</Text>
        </View>
      )}

      {/* Danh sách sản phẩm */}
      {loading === "succeeded" && !error && (
        <FlatList
          data={filteredProducts}
          renderItem={renderProductItem}
          keyExtractor={(item) => item._id || Math.random().toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.productList}
          showsVerticalScrollIndicator={false}
          extraData={favorites}
          ListEmptyComponent={
            <View style={styles.centerContainer}>
              <Text>Không tìm thấy sản phẩm nào</Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  searchContainer: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    height: 50,
    justifyContent: "center",
  },
  searchInput: {
    fontSize: 16,
    color: "#333",
    height: "100%",
  },
  dropdownWrapper: {
    marginBottom: 18,
  },
  dropdownHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#DDD",
    paddingHorizontal: 18,
    paddingVertical: 14,
    marginBottom: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  dropdownHeaderText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#222",
  },
  dropdownArrow: {
    fontSize: 14,
    color: "#666",
    marginLeft: 10,
  },
  dropdownOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownMenu: {
    width: width * 0.8,
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    maxHeight: 300,
  },
  dropdownItem: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  activeDropdownItem: {
    backgroundColor: "#f0f0f0",
  },
  dropdownItemText: {
    fontSize: 16,
    color: "#333",
  },
  activeDropdownItemText: {
    fontWeight: "bold",
    color: "#000",
  },
  productList: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  productCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    position: "relative",
  },
  unavailableCard: {
    opacity: 0.6,
  },
  unavailableOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: 120,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  unavailableText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  heartIcon: {
    position: "absolute",
    top: 7,
    right: 15,
    padding: 5,
    borderRadius: 20,
    backgroundColor: "#E0E0E0",
  },
  heartIconPressed: {
    backgroundColor: "#00634020",
  },
  productImage: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "#f9f9f9",
  },
  productInfo: {
    marginBottom: 8,
  },
  productName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    width: 100,
    marginVertical: 4,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#006340",
    marginVertical: 4,
  },
  priceContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  shipTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#006340",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 5,
    alignSelf: "flex-start",
    marginTop: 10,
  },
  shipText: {
    marginLeft: 4,
    fontSize: 12,
    color: "#006340",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
});
