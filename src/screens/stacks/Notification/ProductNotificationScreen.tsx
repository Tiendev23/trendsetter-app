
import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
} from "react-native";

export default function ProductNotificationScreen() {
    const productNotifications = [
        {
            id: 1,
            title: "Sản phẩm mới",
            img: require("../../../../assets/images/anh2.png"),
            time: "Ngày 3 tháng 6 năm 2025 5:06 PM",
        },
        {
            id: 2,
            title: "Sản phẩm mới",
            img: require("../../../../assets/images/anh2.png"),
            time: "Ngày 3 tháng 6 năm 2025 5:06 PM",
        },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>Thông báo</Text>
            </View>

            <ScrollView>
                {productNotifications.map((item) => (
                    <TouchableOpacity style={styles.item} key={item.id}>
                        <Image source={item.img} style={styles.image} />
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.time}>{item.time}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    headerContainer: { paddingVertical: 22, paddingHorizontal: 18 },
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
    image: { width: 50, height: 50, borderRadius: 8 },
    textContainer: { marginLeft: 12 },
    title: { fontSize: 15, color: "#000", fontWeight: "500" },
    time: { fontSize: 13, color: "#555", marginTop: 4 },
});
