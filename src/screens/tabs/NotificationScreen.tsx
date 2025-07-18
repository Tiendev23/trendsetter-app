import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useMessages } from "../../contexts/ChatDataContext";
import CustomButton from "../../components/buttons/CustomButton";

export default function NotificationScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const [expanded, setExpanded] = useState(false);
  const { messages } = useMessages();
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Thông báo</Text>
      </View>
      {user ? (
        <ScrollView style={styles.container}>
          <View style={styles.dividerTop} />

          {messages.map((item, index) => (
            <View key={index}>
              <TouchableOpacity
                style={styles.tag}
                onPress={() => navigation.navigate("Chat", { id: item.id })}
              >
                <Image source={item.img} style={styles.avatar} />

                <View style={styles.content}>
                  <View style={styles.titleRow}>
                    <Text
                      style={[
                        styles.tieude,
                        !item.read && { fontWeight: "bold" },
                      ]}
                    >
                      {item.title}
                    </Text>
                    {!item.read && <View style={styles.unread} />}
                  </View>
                  <Text
                    style={styles.message}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {item.nd}
                  </Text>
                  <Text style={styles.timeText}>{item.time}</Text>
                </View>
              </TouchableOpacity>

              <View style={styles.divider} />
            </View>
          ))}
        </ScrollView>
      ) : (
        <ScrollView style={styles.scroll}>
          <Text style={styles.title}>Thử ngay!</Text>
          <Text style={styles.subtitle}>
            Nhận thông báo đơn hàng và sản phẩm bạn theo dõi — hãy đăng nhập
            hoặc đăng ký.
          </Text>
          <View style={styles.authContainer}>
            <CustomButton
              title="Đăng ký"
              onPress={() => navigation.navigate("SignUp")}
            />
            <CustomButton
              title="Đăng nhập"
              outlineStyle
              onPress={() => navigation.navigate("Login")}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scroll: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 20,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  tag: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  tieude: {
    fontSize: 15,
    color: "#000",
  },
  message: {
    fontSize: 13,
    color: "#555",
    marginTop: 4,
    lineHeight: 18,
  },
  unread: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#2ecc71",
    marginLeft: 6,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
  },
  dividerTop: {
    height: 2,
    backgroundColor: "#ccc",
  },
  timeText: {
    fontSize: 12,
    color: "#888",
    marginTop: 6,
  },

  headerContainer: {
    paddingVertical: 22,
    paddingHorizontal: 18,
  },
  headerTitle: {
    fontWeight: "600",
    fontStyle: "italic",
    fontSize: 20,
    color: "#006340",
    textAlign: "center",
  },
  headerActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    width: "100%",
    height: "100%",
    paddingHorizontal: 18,
  },
  authContainer: {
    marginTop: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    paddingHorizontal: 18,
  },
});
