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
import { Context } from "../../contexts/AuthContext";

export default function NotificationScreen({ navigation }) {
  const { user } = useContext(Context);
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.container}>
      {user ? (
        <ScrollView style={styles.container}>
          <View style={styles.dividerTop} />

          {list.map((item, index) => (
            <View key={index}>
              <TouchableOpacity
                style={styles.tag}
                onPress={() => navigation.navigate("Chat")}
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
                    {!item.read && <View style={styles.unreadDot} />}
                  </View>

                  <Text
                    style={styles.message}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {item.nd}
                  </Text>
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
          <View style={styles.button}>
            <TouchableOpacity
              style={styles.login}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.loginText}>Đăng nhập</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.signup}
              onPress={() => navigation.navigate("SignUp")}
            >
              <Text style={styles.signupText}>Đăng ký</Text>
            </TouchableOpacity>
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
  button: {
    flexDirection: "row",
    marginVertical: 35,
    justifyContent: "space-around",
  },
  login: {
    borderWidth: 1,
    borderColor: "#006340",
    borderRadius: 10,
    width: 180,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    fontWeight: "600",
    color: "#006340",
  },
  signup: {
    backgroundColor: "#006340",
    borderRadius: 10,
    width: 180,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  signupText: {
    color: "white",
    fontWeight: "600",
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
  unreadDot: {
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
  headerContainer: {
        paddingVertical: 22,
        paddingHorizontal: 18,
    },
    headerTitle: {
        fontWeight: '600',
        fontStyle: 'italic',
        fontSize: 20,
        color: '#006340',
        textAlign: 'center',
    },
    headerActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
        height: '100%',
        paddingHorizontal: 18,
    },
});


const list = [
  {
    img: require("../../../assets/images/anh2.png"),
    title: "Admin",
    nd: "Chào bạn, đây là tin nhắn chưa đọcaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    read: false,
  },
  {
    img: require("../../../assets/images/anh2.png"),
    title: "Shop thời trang",
    nd: "Đơn hàng của bạn đã được giao thành công. ",
    read: true,
  },
];

