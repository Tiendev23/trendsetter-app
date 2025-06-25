import React, { useEffect, useState } from "react";
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
} from "react-native";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getAllProducts } from "../../redux/features/product/productsSlice";
import { fetchCategories } from "../../redux/features/category/categoriesSlice";
import { Product } from "../../types";

const { width } = Dimensions.get("window");

export default function SearchScreen() {
  const dispatch = useAppDispatch();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tất Cả");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const { items = [], loading, error } = useAppSelector((state) => state.products);
  const { cateList , cateStatus, cateError } = useAppSelector(
    (state) => state.categories || { cateList: [], cateStatus: false, cateError: null }
  );
  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const categories = ["Tất Cả", ...(cateList || []).map((c) => c.name)];

  const filteredProducts = (items || []).filter((product: Product) => {
    const matchCategory =
      activeCategory === "Tất Cả" || product.category?.name === activeCategory;
    const matchSearch =
      (product.name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (product.brand?.name?.toLowerCase() || "").includes(
        searchQuery.toLowerCase()
      );
    return matchCategory && matchSearch;
  });

  const renderProductItem = ({ item }: { item: Product }) => (
    <View style={styles.productCard}>
      <Image
        source={
          typeof item.image === "string" ? { uri: item.image } : item.image
        }
        style={styles.productImage}
        resizeMode="contain"
      />
      <View style={styles.productInfo}>
        <Text style={styles.productBrand}>{item.brand?.name || 'Unknown Brand'}</Text>
        <Text style={styles.productName}>{item.name || 'Unknown Product'}</Text>
        <Text style={styles.productPrice}>{item.price || 0}₫</Text>
      </View>
    </View>
  );
  // rồi vậy thôi
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

      {/* Loading state */}
      {loading === 'loading' && (
        <View style={styles.centerContainer}>
          <Text>Đang tải...</Text>
        </View>
      )}

      {/* Error state */}
      {loading === 'failed' && (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>Lỗi: {error}</Text>
        </View>
      )}

      {/* Danh sách sản phẩm */}
      {loading === 'succeeded' && !error && (
        <FlatList
          data={filteredProducts}
          renderItem={renderProductItem}
          keyExtractor={(item) => item._id || item.id || Math.random().toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.productList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
          <View style={styles.centerContainer}>
            <Text>Không tìm thấy sản phẩm nào</Text>
          </View>}
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
    marginBottom: 20,
    zIndex: 10,
  },
  dropdownHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  dropdownHeaderText: {
    fontSize: 16,
    color: "#333",
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
  productBrand: {
    fontSize: 14,
    color: "#666",
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
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
