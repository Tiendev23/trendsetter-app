import React, { useState } from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity, Image, StyleSheet, } from 'react-native';

const TABS = ['Tất cả', 'Chờ xác nhận', 'Đang giao', 'Đã giao', 'Đã huỷ'];

const orders = [
    {
        id: '1',
        productName: 'Áo thun nam basic',
        image: 'https://via.placeholder.com/100',
        status: 'Đang giao',
        quantity: 2,
        total: 299000,
    },
    {
        id: '2',
        productName: 'Quần jean nữ cá tính',
        image: 'https://via.placeholder.com/100',
        status: 'Chờ xác nhận',
        quantity: 1,
        total: 450000,
    },
    {
        id: '3',
        productName: 'Giày sneaker trắng',
        image: 'https://via.placeholder.com/100',
        status: 'Đã huỷ',
        quantity: 1,
        total: 550000,
    },
];

export default function OrderStatus() {
    const [selectedTab, setSelectedTab] = useState('Tất cả');

    const filteredOrders =
        selectedTab === 'Tất cả'
            ? orders
            : orders.filter(order => order.status === selectedTab);

    return (
        <View style={styles.container}>
            {/* Tabs */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabs}>
                {TABS.map(tab => (
                    <TouchableOpacity key={tab} onPress={() => setSelectedTab(tab)}>
                        <Text style={[styles.tabText, selectedTab === tab && styles.tabTextActive]}>
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Danh sách đơn hàng */}
            <FlatList
                data={filteredOrders}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.orderCard}>
                        <Image source={{ uri: item.image }} style={styles.productImage} />
                        <View style={styles.orderInfo}>
                            <Text style={styles.productName}>{item.productName}</Text>
                            <Text>Số lượng: {item.quantity}</Text>
                            <Text style={styles.status}>{item.status}</Text>
                            <Text style={styles.total}>
                                Tổng tiền: {item.total.toLocaleString()}đ
                            </Text>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, paddingTop: 40, backgroundColor: '#fff' },
    tabs: { flexDirection: 'row', paddingHorizontal: 12, marginBottom: 10 },
    tabText: {
        marginRight: 16,
        fontSize: 16,
        color: '#888',
        paddingBottom: 6,
    },
    tabTextActive: {
        color: '#000',
        fontWeight: 'bold',
        borderBottomWidth: 2,
        borderColor: '#000',
    },
    orderCard: {
        flexDirection: 'row',
        padding: 12,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    productImage: { width: 80, height: 80, borderRadius: 6 },
    orderInfo: { marginLeft: 12, flex: 1 },
    productName: { fontWeight: 'bold', marginBottom: 4, fontSize: 16 },
    status: { color: '#ff6600', marginTop: 4 },
    total: { marginTop: 6, fontWeight: 'bold' },
});
