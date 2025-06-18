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
          <View style={styles.divider2} />

          {list.map((item, index) => (
            <View key={index}>
              <TouchableOpacity style={styles.tag}>
                <View>
                  <Image source={item.img} style={{ width: 60, height: 60 }} />
                </View>

                <View style={styles.content}>
                  <Text style={styles.tieude}>
                    {item.title}
                    {/* Introducing the New Message Center */}
                  </Text>
                  <Text
                    style={styles.message}
                    numberOfLines={expanded ? undefined : 2}
                    ellipsizeMode="tail"
                  >
                    {item.nd}
                    {/* Every StockX order status, release update, market change, and
                more would be righ
                you.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa */}
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
  image: {
    width: "auto",
    height: 200,
    margin: -16,
  },
  tag: {
    flexDirection: "row",
    height: 100,
    padding: 20,
    flex: 1,
    alignItems: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "green",
    marginTop: 6,
    marginRight: 8,
  },
  content: {
    marginLeft: "5%",
    flex: 1,
  },
  tieude: {
    fontWeight: "600",
    fontSize: 15,
    marginBottom: 4,
  },
  message: {
    fontSize: 12,
    color: "#444",
    lineHeight: 18,
  },
  closeText: {
    fontSize: 18,
    color: "#999",
  },
  divider: {
    marginHorizontal: 35,
    height: 1,
    backgroundColor: "gray",
  },
  divider2: {
    height: 2,
    backgroundColor: "gray",
  },
});

const list = [
  {
    img: require("../../../assets/images/anh2.png"),
    title: "Trung tâm thông báo",
    nd: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaammmmmmmmmmmmmmmmmmmmmmmaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaammmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm",
  },
  {
    img: require("../../../assets/images/anh2.png"),
    title: "Trung tâm thông báo",
    nd: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  },
];
