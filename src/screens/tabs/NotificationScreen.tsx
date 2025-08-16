// screens/Notification/NotificationScreen.js
import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { AuthContext } from "../../contexts/AuthContext";
import CustomButton from "../../components/buttons/CustomButton";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function NotificationScreen({ navigation }) {
  const { user } = useContext(AuthContext);

  const productCount = 2;
  const activityCount = 3;

  if (!user) {
    return (
      <View style={styles.scroll}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Trung tâm thông báo</Text>
        </View>
        <Text style={styles.title}>Thử ngay!</Text>
        <Text style={styles.subtitle}>
          Nhận thông báo đơn hàng và sản phẩm bạn theo dõi — hãy đăng nhập hoặc
          đăng ký.
        </Text>
        <View style={styles.authContainer}>
          <CustomButton
            title="Đăng ký"
            onPress={() => navigation.navigate("SignUp")}
          />
          <CustomButton
            title="Đăng nhập"
            outline
            onPress={() => navigation.navigate("Login")}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Trung tâm thông báo</Text>
      </View>

      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("ProductNotification")}
      >
        <MaterialIcons name="notifications-none" size={24} color="#007AFF" />
        <Text style={styles.itemText}>Thông báo</Text>
        {productCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{productCount}</Text>
          </View>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("ActivityNotification")}
      >
        <MaterialIcons name="notifications-none" size={24} color="#007AFF" />
        <Text style={styles.itemText}>Hoạt động</Text>
        {activityCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{activityCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scroll: { flex: 1, padding: 16, backgroundColor: "#ffffff" },
  title: { fontSize: 22, fontWeight: "600", marginBottom: 10 },
  subtitle: { fontSize: 14, color: "#555", marginBottom: 20 },
  authContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    paddingHorizontal: 18,
  },
  headerContainer: { paddingVertical: 20, paddingHorizontal: 18 },
  headerTitle: {
    fontWeight: "bold",
    fontStyle: "italic",
    fontSize: 20,
    color: "#006340",
    textAlign: "center",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemText: { flex: 1,  marginLeft: 12, fontSize: 16, color: "#000" },
  badge: {
    backgroundColor: "#ff3b30",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: { color: "#fff", fontSize: 13, fontWeight: "600" },
});
