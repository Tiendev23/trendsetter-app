// screens/PaymentMethodsScreen.js

import React, { useState } from 'react';
import {
    View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenHeader } from '@/components'; // Component header của bạn

// ======================================================================
// DỮ LIỆU GIẢ (HARD-CODED DATA)
// ======================================================================

const FAKE_WALLET = {
    balance: 5850000,
};

const FAKE_LINKED_CARDS = [
    {
        id: 'card_001',
        type: 'visa', // 'visa', 'mastercard', 'jcb', 'amex'
        last4: '1234',
        bankName: 'Vietcombank',
        isDefault: true,
    },
    {
        id: 'card_002',
        type: 'mastercard',
        last4: '5678',
        bankName: 'Techcombank',
        isDefault: false,
    },
    {
        id: 'card_003',
        type: 'jcb',
        last4: '9012',
        bankName: 'ACB',
        isDefault: false,
    },
];

// --- Component phụ trợ để render một dòng thẻ ---
const CardRow = ({ card, onSetDefault, onRemove }) => {
    const getCardIcon = () => {
        // TODO: Thay thế bằng ảnh logo thật từ assets
        // return <Image source={require(`../../assets/images/${card.type}.png`)} style={styles.cardLogo} />;
        
        // Dùng icon placeholder
        switch (card.type) {
            case 'visa':
                return <Ionicons name="card" size={32} color="#1A1F71" />;
            case 'mastercard':
                return <Ionicons name="card" size={32} color="#EB001B" />;
            case 'jcb':
                return <Ionicons name="card" size={32} color="#003B71" />;
            default:
                return <Ionicons name="card-outline" size={32} color="#666" />;
        }
    };

    return (
        <TouchableOpacity style={styles.cardRow}>
            <View style={styles.cardIconContainer}>
                {getCardIcon()}
            </View>
            <View style={styles.cardDetails}>
                <Text style={styles.cardBankName}>{card.bankName}</Text>
                <Text style={styles.cardNumber}>**** **** **** {card.last4}</Text>
                {card.isDefault && (
                    <View style={styles.defaultBadge}>
                        <Text style={styles.defaultBadgeText}>Mặc định</Text>
                    </View>
                )}
            </View>
            <TouchableOpacity onPress={() => onRemove(card.id)} style={styles.removeButton}>
                <Ionicons name="trash-outline" size={24} color="#E74C3C" />
            </TouchableOpacity>
        </TouchableOpacity>
    );
};


// --- Component Màn hình Chính ---
export default function PaymentMethodsScreen({ navigation }) {
    const [cards, setCards] = useState(FAKE_LINKED_CARDS);

    const handleRemoveCard = (cardId) => {
        Alert.alert(
            "Xóa thẻ",
            "Bạn có chắc chắn muốn xóa phương thức thanh toán này?",
            [
                { text: "Hủy", style: "cancel" },
                { 
                    text: "Xóa", 
                    onPress: () => {
                        setCards(currentCards => currentCards.filter(c => c.id !== cardId));
                        // TODO: Gọi API để xóa thẻ
                    }, 
                    style: "destructive" 
                },
            ]
        );
    };

    const handleAddMethod = () => {
        // Điều hướng đến màn hình thêm thẻ/ví
        Alert.alert("Thông báo", "Điều hướng đến màn hình thêm phương thức thanh toán.");
        // navigation.navigate('AddNewCard');
    };

    return (
        <View style={styles.container}>
            <ScreenHeader
                title="Phương thức Thanh toán"
                showBackButton={true}
                navigation={navigation}
            />
            <ScrollView style={styles.scrollView}>
                {/* Phần Ví Trendsetter */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>VÍ TRENDSETTER</Text>
                    <TouchableOpacity style={styles.walletRow} onPress={() => navigation.navigate('Wallet')}>
                        <Ionicons name="wallet" size={32} color="#006340" style={styles.walletIcon} />
                        <View>
                            <Text style={styles.walletLabel}>Ví Trendsetter</Text>
                            <Text style={styles.walletBalance}>Số dư: {FAKE_WALLET.balance.toLocaleString('vi-VN')}đ</Text>
                        </View>
                        <Ionicons name="chevron-forward-outline" size={22} color="#ccc" style={styles.arrowIcon}/>
                    </TouchableOpacity>
                </View>

                {/* Phần Thẻ Tín dụng/Ghi nợ */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>THẺ TÍN DỤNG/GHI NỢ</Text>
                    <View style={styles.cardListContainer}>
                        {cards.map(card => (
                            <CardRow 
                                key={card.id} 
                                card={card} 
                                onRemove={handleRemoveCard}
                            />
                        ))}
                    </View>
                </View>

                {/* Nút Thêm Phương thức thanh toán */}
                <TouchableOpacity style={styles.addButton} onPress={handleAddMethod}>
                    <Ionicons name="add-circle-outline" size={24} color="#006340" />
                    <Text style={styles.addButtonText}>Thêm phương thức thanh toán</Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    );
}


// --- Styles ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    scrollView: {
        flex: 1,
    },
    // --- Section Styles ---
    sectionContainer: {
        marginTop: 10,
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: '600',
        color: '#666',
        paddingHorizontal: 16,
        paddingBottom: 8,
    },
    // --- Wallet Styles ---
    walletRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 16,
    },
    walletIcon: {
        marginRight: 16,
    },
    walletLabel: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    walletBalance: {
        fontSize: 14,
        color: '#888',
        marginTop: 2,
    },
    arrowIcon: {
        marginLeft: 'auto', // Đẩy mũi tên vềสุดขอบ
    },
    // --- Card List Styles ---
    cardListContainer: {
        backgroundColor: '#FFFFFF',
    },
    cardRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    cardIconContainer: {
        width: 50,
        alignItems: 'center',
        marginRight: 12,
    },
    cardLogo: {
        width: 40,
        height: 25,
        resizeMode: 'contain',
    },
    cardDetails: {
        flex: 1,
    },
    cardBankName: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    cardNumber: {
        fontSize: 14,
        color: '#888',
        marginTop: 2,
    },
    defaultBadge: {
        backgroundColor: '#E6F6F0',
        borderColor: '#00B074',
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 6,
        paddingVertical: 2,
        alignSelf: 'flex-start', // Chỉ chiếm không gian cần thiết
        marginTop: 6,
    },
    defaultBadgeText: {
        color: '#00B074',
        fontSize: 11,
        fontWeight: 'bold',
    },
    removeButton: {
        padding: 8, // Tăng vùng bấm
    },
    // --- Add Button Styles ---
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        marginTop: 10,
        padding: 16,
    },
    addButtonText: {
        fontSize: 16,
        color: '#006340',
        marginLeft: 16,
        fontWeight: '500',
    }
});