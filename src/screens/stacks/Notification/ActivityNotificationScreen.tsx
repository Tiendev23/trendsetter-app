
import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";


export default function ActivityNotificaScreen() {
    const activities = [
        {
            id: 1,
            title: "Giao dịch Sản phẩm Nike Air Zoom đã đặt thành công",
            time: "Ngày 30 tháng 4 năm 2025 1:01 PM",
        },
        {
            id: 2,
            title: "Giao dịch Nike Air Zoom Pegasus 36 Miami đang chờ giao hàng",
            time: "Ngày 30 tháng 4 năm 2025 1:01 PM",
        },
        {
            id: 3,
            title: "Giao dịch Nike Air Max đã giao thành công",
            time: "Ngày 30 tháng 4 năm 2025 1:01 PM",
        },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>Hoạt động</Text>
            </View>

            <ScrollView>
                {activities.map((item) => (
                    <TouchableOpacity style={styles.item} key={item.id}>
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
        fontWeight: "600",
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
    textContainer: { marginLeft: 12, flex: 1 },
    title: { fontSize: 15, color: "#000", fontWeight: "500" },
    time: { fontSize: 13, color: "#555", marginTop: 4 },
});
