// screens/WalletScreen.js

import React, { useState } from 'react';
import {
    View, Text, StyleSheet, FlatList, TouchableOpacity, Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenHeader } from '@/components'; 



const FAKE_WALLET_BALANCE = 5850000;

const FAKE_TRANSACTIONS = [
    {
        id: 'txn_001',
        type: 'payment', // 'payment', 'refund', 'topup'
        title: 'Thanh toán đơn hàng #20240720A5B1',
        amount: -275000,
        date: '20/07/2024, 10:30',
        status: 'Hoàn thành',
    },
    {
        id: 'txn_002',
        type: 'refund',
        title: 'Hoàn tiền đơn hàng #20240718C9D2',
        amount: 150000,
        date: '19/07/2024, 15:45',
        status: 'Hoàn thành',
    },
    {
        id: 'txn_003',
        type: 'topup',
        title: 'Nạp tiền vào ví',
        amount: 2000000,
        date: '18/07/2024, 09:00',
        status: 'Hoàn thành',
    },
    {
        id: 'txn_004',
        type: 'payment',
        title: 'Thanh toán đơn hàng #20240715E3F4',
        amount: -1250000,
        date: '15/07/2024, 20:15',
        status: 'Hoàn thành',
    },
    {
        id: 'txn_005',
        type: 'payment',
        title: 'Thanh toán đơn hàng #20240712G7H8',
        amount: -75000,
        date: '12/07/2024, 11:00',
        status: 'Hoàn thành',
    },
    {
        id: 'txn_006',
        type: 'topup',
        title: 'Nạp tiền vào ví',
        amount: 5000000,
        date: '10/07/2024, 08:30',
        status: 'Hoàn thành',
    },
];

// --- Component phụ trợ để render một dòng giao dịch ---
const TransactionItem = ({ item }) => {
    const isIncome = item.amount > 0;
    const amountColor = isIncome ? '#2ECC71' : '#333'; 
    const amountPrefix = isIncome ? '+' : '';

    const getIcon = () => {
        switch (item.type) {
            case 'payment':
                return { name: 'receipt-outline', color: '#E74C3C' }; // Đỏ
            case 'refund':
                return { name: 'arrow-undo-outline', color: '#2ECC71' }; // Xanh lá
            case 'topup':
                return { name: 'wallet-outline', color: '#3498DB' }; // Xanh dương
            default:
                return { name: 'cash-outline', color: '#95A5A6' }; // Xám
        }
    };

    const icon = getIcon();

    return (
        <TouchableOpacity style={styles.transactionRow}>
            <View style={[styles.iconContainer, { backgroundColor: `${icon.color}20` }]}>
                <Ionicons name={icon.name} size={24} color={icon.color} />
            </View>
            <View style={styles.transactionDetails}>
                <Text style={styles.transactionTitle} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.transactionDate}>{item.date}</Text>
            </View>
            <View style={styles.transactionAmountContainer}>
                <Text style={[styles.transactionAmount, { color: amountColor }]}>
                    {amountPrefix}{item.amount.toLocaleString('vi-VN')}đ
                </Text>
                <Text style={styles.transactionStatus}>{item.status}</Text>
            </View>
        </TouchableOpacity>
    );
};


// --- Component Màn hình Chính ---
export default function WalletScreen({ navigation }) {

    const handleAction = (actionName) => {
        Alert.alert("Thông báo", `Chức năng "${actionName}" đang được phát triển.`);
    };

    // Header của FlatList, chứa số dư và các nút hành động
    const ListHeader = () => (
        <View>
            {/* Phần Header chính */}
            <View style={styles.header}>
                <View style={styles.balanceContainer}>
                    <Text style={styles.balanceLabel}>Số dư Ví</Text>
                    <Text style={styles.balanceAmount}>{FAKE_WALLET_BALANCE.toLocaleString('vi-VN')}đ</Text>
                </View>

                {/* Phần các nút hành động */}
                <View style={styles.actionsContainer}>
                    <TouchableOpacity style={styles.actionButton} onPress={() => handleAction('Nạp tiền')}>
                        <Ionicons name="add-circle-outline" size={32} color="#006340" />
                        <Text style={styles.actionText}>Nạp tiền</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton} onPress={() => handleAction('Rút tiền')}>
                        <Ionicons name="arrow-down-circle-outline" size={32} color="#006340" />
                        <Text style={styles.actionText}>Rút tiền</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton} onPress={() => handleAction('Chuyển tiền')}>
                        <Ionicons name="swap-horizontal-outline" size={32} color="#006340" />
                        <Text style={styles.actionText}>Chuyển tiền</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Tiêu đề cho danh sách giao dịch */}
            <Text style={styles.historyHeader}>Lịch sử Giao dịch</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <ScreenHeader
                title="Ví Trendsetter"
                showBackButton={true}
                navigation={navigation}
                rightButton={
                    <TouchableOpacity onPress={() => handleAction('Xem thêm tùy chọn')}>
                        <Ionicons name="ellipsis-vertical" size={24} color="#333" />
                    </TouchableOpacity>
                }
            />
            <FlatList
                data={FAKE_TRANSACTIONS}
                renderItem={({ item }) => <TransactionItem item={item} />}
                keyExtractor={item => item.id}
                ListHeaderComponent={ListHeader}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}


// --- Styles ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    // --- Header Styles ---
    header: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        marginBottom: 10,
    },
    balanceContainer: {
        alignItems: 'center',
        marginBottom: 24,
    },
    balanceLabel: {
        fontSize: 16,
        color: '#666',
    },
    balanceAmount: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#006340',
        marginTop: 4,
    },
    // --- Actions Styles ---
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    actionButton: {
        alignItems: 'center',
    },
    actionText: {
        marginTop: 4,
        fontSize: 14,
        color: '#333',
    },
    // --- History Styles ---
    historyHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 10,
    },
    listContent: {
        paddingBottom: 20,
    },
    // --- Transaction Item Styles ---
    transactionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    transactionDetails: {
        flex: 1,
    },
    transactionTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    transactionDate: {
        fontSize: 13,
        color: '#888',
        marginTop: 4,
    },
    transactionAmountContainer: {
        alignItems: 'flex-end',
    },
    transactionAmount: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    transactionStatus: {
        fontSize: 13,
        color: '#888',
        marginTop: 4,
    }
});