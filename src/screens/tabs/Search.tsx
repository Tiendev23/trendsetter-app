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
  ScrollView,
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
    { label: "Tất cả", min: 0, max: Infinity, icon: "grid-outline" },
    { label: "100k - 600k", min: 110_000, max: 600_000, icon: "cash-outline" },
    { label: "400k - 910k", min: 400_000, max: 910_000, icon: "card-outline" },
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
        <Ionicons
          name="search"
          size={20}
          color="#666"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm theo tên hoặc thương hiệu"
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Ionicons name="close-circle" size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>

      {/* Filter Section */}
      <View style={styles.filterSection}>
        <Text style={styles.filterTitle}>Bộ lọc</Text>

        {/* Category Filter */}
        <View style={styles.filterRow}>
          <View style={styles.filterLabelContainer}>
            <Ionicons name="list-outline" size={18} color="#006340" />
            <Text style={styles.filterLabel}>Danh mục</Text>
          </View>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setDropdownVisible(!dropdownVisible)}
          >
            <Text style={styles.filterButtonText}>{activeCategory}</Text>
            <Ionicons
              name={dropdownVisible ? "chevron-up" : "chevron-down"}
              size={16}
              color="#006340"
            />
          </TouchableOpacity>
        </View>

        {/* Price Filter */}
        <View style={styles.filterRow}>
          <View style={styles.filterLabelContainer}>
            <Ionicons name="cash-outline" size={18} color="#006340" />
            <Text style={styles.filterLabel}>Khoảng giá</Text>
          </View>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setDropdownVisiblePrice(!dropdownVisiblePrice)}
          >
            <Text style={styles.filterButtonText}>
              {activePriceFilter.label}
            </Text>
            <Ionicons
              name={dropdownVisiblePrice ? "chevron-up" : "chevron-down"}
              size={16}
              color="#006340"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Category Dropdown Modal */}
      <Modal
        transparent
        visible={dropdownVisible}
        animationType="fade"
        onRequestClose={() => setDropdownVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setDropdownVisible(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Chọn danh mục</Text>
              <TouchableOpacity onPress={() => setDropdownVisible(false)}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalScrollView}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.modalItem,
                    activeCategory === category && styles.activeModalItem,
                  ]}
                  onPress={() => {
                    setActiveCategory(category);
                    setDropdownVisible(false);
                  }}
                >
                  <Text
                    style={[
                      styles.modalItemText,
                      activeCategory === category && styles.activeModalItemText,
                    ]}
                  >
                    {category}
                  </Text>
                  {activeCategory === category && (
                    <Ionicons name="checkmark" size={20} color="#006340" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Price Filter Dropdown Modal */}
      <Modal
        transparent
        visible={dropdownVisiblePrice}
        animationType="fade"
        onRequestClose={() => setDropdownVisiblePrice(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setDropdownVisiblePrice(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Chọn khoảng giá</Text>
              <TouchableOpacity onPress={() => setDropdownVisiblePrice(false)}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalScrollView}>
              {dynamicPriceFilters.map((filter) => (
                <TouchableOpacity
                  key={filter.label}
                  style={[
                    styles.modalItem,
                    activePriceFilter.label === filter.label &&
                      styles.activeModalItem,
                  ]}
                  onPress={() => {
                    setActivePriceFilter(filter);
                    setDropdownVisiblePrice(false);
                  }}
                >
                  <View style={styles.modalItemContent}>
                    <Ionicons
                      name={filter.icon as any}
                      size={20}
                      color={
                        activePriceFilter.label === filter.label
                          ? "#006340"
                          : "#666"
                      }
                    />
                    <Text
                      style={[
                        styles.modalItemText,
                        activePriceFilter.label === filter.label &&
                          styles.activeModalItemText,
                      ]}
                    >
                      {filter.label}
                    </Text>
                  </View>
                  {activePriceFilter.label === filter.label && (
                    <Ionicons name="checkmark" size={20} color="#006340" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>

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
    backgroundColor: "#f8f9fa",
    padding: 16,
  },
  searchContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 20,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    fontSize: 16,
    color: "#333",
    flex: 1,
    height: "100%",
  },
  filterSection: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
  },
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  filterLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginLeft: 8,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  filterButtonText: {
    fontSize: 14,
    color: "#006340",
    fontWeight: "500",
    marginRight: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: width * 0.85,
    backgroundColor: "white",
    borderRadius: 16,
    maxHeight: 400,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  modalScrollView: {
    paddingVertical: 8,
  },
  modalItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  modalItemContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  activeModalItem: {
    backgroundColor: "#f0f8f0",
  },
  modalItemText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 12,
  },
  activeModalItemText: {
    fontWeight: "600",
    color: "#006340",
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
    borderRadius: 12,
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
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
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
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
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
