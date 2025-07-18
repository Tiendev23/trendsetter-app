import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Image, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Backnav from '../../../components/Tabbar/Backnav';
import { Addresses } from '../../../types';
import { useDispatch, useSelector, UseSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { fetchAddress } from '../../../redux/features/addresses/addressesSlice';
import { AuthContext } from '../../../contexts/AuthContext';

export interface Props {
    navigation: any;
    route?: any;
}

const AddressCard = ({ address, onEdit }: { address: Addresses, onEdit: (_id: string,) => void }) => {
    const fullAddress: string = `${address.streetDetails}, ${address.ward}, ${address.district}, ${address.city}`;

    return (
        <View style={styles.card}>
            <TouchableOpacity style={styles.editButton} onPress={() => onEdit(address._id)}>
                <Text style={styles.editButtonText}>Sửa</Text>
            </TouchableOpacity>
            <View style={styles.cardHeader}>
                <Text style={styles.nameText}>{address.fullName}</Text>
                {address.isDefault && (
                    <View style={styles.defaultTag}>
                        <Ionicons name="checkmark-circle" size={14} color="#34A853" />
                        <Text style={styles.defaultTagText}>Mặc định</Text>
                    </View>
                )}
            </View>
            <View style={styles.cardBody}>
                <Text style={styles.infoText}>{address.phone}</Text>
                <Text style={styles.infoText}>{fullAddress}</Text>
            </View>
        </View>
    );
}

//  màn hình trống
const EmptyState = ({ onAdd }: { onAdd: () => void }) => (
    <View style={styles.emptyContainer}>
        <Image
            source={require('../../../../assets/images/dontAdd.png')}
            style={styles.emptyImage}
        />
        <Text style={styles.emptyTitle}>Chưa có địa chỉ nào</Text>
        <Text style={styles.emptySubtitle}>
            Thêm địa chỉ để bạn nhận hàng nhanh chóng và thuận tiện hơn nhé!
        </Text>
        <TouchableOpacity style={styles.addButton} onPress={onAdd}>
            <Ionicons name="add" size={22} color="#FFFFFF" />
            <Text style={styles.addButtonText}>Thêm địa chỉ mới</Text>
        </TouchableOpacity>
    </View>
);





const AddressListScreen: React.FC<Props> = ({ navigation, route }) => {
    const { loading, error, addressList } = useSelector((state: RootState) => state.address)
    const { user } = useContext(AuthContext)
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            dispatch(fetchAddress({ _id: user._id }));
        });

        return unsubscribe; // cleanup khi component unmount
    }, [navigation]);
    const handleEditAddress = (addressId: string) => {
        navigation.navigate('EditAddress', { addressId, userId: user._id });
    };

    const handleAddAddress = () => {
        navigation.navigate(/** them sau */);
        console.log('Add new address');
    };

    const renderAddress = ({ item }: { item: Addresses }) => (
        <AddressCard address={item} onEdit={handleEditAddress} />
    );

    return (
        <View style={styles.screen}>
            <Backnav navigation={navigation} route={route} />
            {(!addressList || addressList.length === 0) ? (
                <EmptyState onAdd={handleAddAddress} />
            ) : (
                <>
                    <FlatList
                        data={addressList}
                        renderItem={renderAddress}
                        keyExtractor={(item) => item._id}
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

export const styles = StyleSheet.create({
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
        paddingHorizontal: 20,
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
        marginBottom: "40%"
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