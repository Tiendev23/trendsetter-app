import { FlatList, RefreshControl, View } from 'react-native';
import React from 'react';
import { AddressSelection, BaseAddressProps, ObjectId, ShippingAddress } from '@/types';
import AddressItem from './AddressItem';
import { useRefresh } from '@/hooks/useRefresh';

type Props = {
    addresses: ShippingAddress[];
    handleSetDefault: (addressId: ObjectId, address: BaseAddressProps) => void;
    handleDeleteAddress: (addressId: ObjectId) => void;
    handleSelectAddress: (address: AddressSelection) => void;
    handleEditAddress: (address: ShippingAddress) => void;
    refreshing: boolean;
    onRefresh: () => Promise<void>;
};
export default function AddressList({
    addresses,
    handleSetDefault,
    handleDeleteAddress,
    handleSelectAddress,
    handleEditAddress,
    refreshing, onRefresh
}: Props) {

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={addresses}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                renderItem={({ item }) => {
                    return (
                        <AddressItem
                            address={item}
                            handleSetDefault={() => handleSetDefault(
                                item._id,
                                { ...item, isDefault: true }
                            )}
                            handleDeleteAddress={() =>
                                handleDeleteAddress(item._id)
                            }
                            handleSelectAddress={() => handleSelectAddress(item)}
                            handleEditAddress={() => handleEditAddress(item)}
                        />
                    );
                }}
                scrollEnabled={false} // Tắt cuộn riêng của FlatList
                nestedScrollEnabled={true} // Cho phép cuộn bên trong ScrollView
                contentContainerStyle={{ rowGap: 2 }}
            />
        </View>
    );
}
