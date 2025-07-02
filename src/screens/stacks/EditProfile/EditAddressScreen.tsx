import React, { useState } from 'react';
import {View,Text,StyleSheet,ScrollView,TouchableOpacity,FlatList,Image,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Backnav from '../../../components/Tabbar/Backnav';
interface Address {
    id: string;
    name: string;
    phone: string;
    address: string;
    city: string;
    isDefault: boolean;
}

export interface Props {
    navigation: any;
    route?: any;
}

const FAKE_ADDRESSES = [
    {
        id: '1',
        name: 'Trần Văn An',
        phone: '0987 654 321',
        address: '123 Đường Lê Lợi, Phường Bến Thành, Quận 1',
        city: 'TP. Hồ Chí Minh',
        isDefault: true,
    },
    {
        id: '2',
        name: 'Văn phòng Công ty',
        phone: '0123 456 789',
        address: 'Tầng 10, Tòa nhà Bitexco, 2 Hải Triều, Phường Bến Nghé, Quận 1',
        city: 'TP. Hồ Chí Minh',
        isDefault: false,
    },
    {
        id: '3',
        name: 'Nguyễn Thị Bình',
        phone: '0369 852 147',
        address: 'Số 50, Ngõ 100, Phố Dịch Vọng Hậu',
        city: 'Hà Nội',
        isDefault: false,
    },
];


const AddressCard = ({ address, onEdit }: { address: Address, onEdit: (id: string) => void }) => (
    <View style={styles.card}>
        <TouchableOpacity style={styles.editButton} onPress={() => onEdit(address.id)}>
            <Text style={styles.editButtonText}>Sửa</Text>
        </TouchableOpacity>
        <View style={styles.cardHeader}>
            <Text style={styles.nameText}>{address.name}</Text>
            {address.isDefault && (
                <View style={styles.defaultTag}>
                    <Ionicons name="checkmark-circle" size={14} color="#34C759" />
                    <Text style={styles.defaultTagText}>Mặc định</Text>
                </View>
            )}
        </View>
        <View style={styles.cardBody}>
            <Text style={styles.infoText}>{address.phone}</Text>
            <Text style={styles.infoText}>{address.address}</Text>
            <Text style={styles.infoText}>{address.city}</Text>
        </View>
    </View>
);

//  màn hình trống
const EmptyState = ({ onAdd }: { onAdd: () => void }) => (
    <View style={styles.emptyContainer}>
        <Image
            source={require('../../../../assets/images/nenchu.jpg')} // Thay bằng ảnh của bạn
            style={styles.emptyImage}
        />
        <Text style={styles.emptyTitle}>Chưa có địa chỉ nào</Text>
        <Text style={styles.emptySubtitle}>
            Hãy thêm địa chỉ để việc mua sắm được nhanh hơn nhé!
        </Text>
        <TouchableOpacity style={styles.addButton} onPress={onAdd}>
            <Ionicons name="add" size={22} color="#FFFFFF" />
            <Text style={styles.addButtonText}>Thêm địa chỉ mới</Text>
        </TouchableOpacity>
    </View>
);


const AddressListScreen: React.FC<Props> = ({ navigation, route }) => {
    const { title } = route.params || {};
    const [addresses, setAddresses] = useState<Address[]>(FAKE_ADDRESSES);

    const handleEditAddress = (addressId: string) => {
        navigation.navigate('EditAddressScreen', { addressId });
        console.log('Edit address:', addressId);
    };

    const handleAddAddress = () => {
        navigation.navigate('AddAddressScreen');
        console.log('Add new address');
    };

    const renderAddress = ({ item }: { item: Address }) => (
        <AddressCard address={item} onEdit={handleEditAddress} />
    );

    return (
        <View style={styles.screen}>
            <Backnav navigation={navigation} route={route}  />
            {addresses.length === 0 ? (
                <EmptyState onAdd={handleAddAddress} />
            ) : (
                <>
                    <FlatList
                        data={addresses}
                        renderItem={renderAddress}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.listContainer}
                        showsVerticalScrollIndicator={false}
                    />
                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.addButton} onPress={handleAddAddress}>
                            <Ionicons name="add" size={22} color="#FFFFFF" />
                            <Text style={styles.addButtonText}>Thêm địa chỉ mới</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </View>
    );
};

export default AddressListScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#F7F8FA',
    },
    listContainer: {
        padding: 16,
        paddingBottom: 100, 
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        position: 'relative',
        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        // Shadow for Android
        elevation: 3,
    },
    editButton: {
        position: 'absolute',
        top: 16,
        right: 16,
    },
    editButtonText: {
        color: '#006340', 
        fontSize: 15,
        fontWeight: '600',
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        paddingRight: 50, 
    },
    nameText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1C1C1E',
    },
    defaultTag: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 8,
        paddingHorizontal: 6,
        paddingVertical: 3,
        backgroundColor: '#E7FDD8',
        borderRadius: 6,
    },
    defaultTagText: {
        marginLeft: 4,
        color: '#34C759',
        fontSize: 12,
        fontWeight: '500',
    },
    cardBody: {
        borderTopWidth: 1,
        borderColor: '#F0F0F0',
        paddingTop: 12,
    },
    infoText: {
        fontSize: 14,
        color: '#8A8A8E',
        lineHeight: 20,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
        paddingBottom: 24, // Thêm padding cho các thiết bị có tai thỏ
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderColor: '#E5E5EA',
    },
    addButton: {
        backgroundColor: '#00796B',
        borderRadius: 12,
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    addButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyImage: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1C1C1E',
        marginBottom: 8,
    },
    emptySubtitle: {
        fontSize: 16,
        color: '#8A8A8E',
        textAlign: 'center',
        marginBottom: 24,
    },
});