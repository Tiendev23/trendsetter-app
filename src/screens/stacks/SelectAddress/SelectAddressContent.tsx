import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import CustomButton from '@/components/buttons/CustomButton';
import { AddressList } from './components';
import { AddressSelection, BaseAddressProps, ObjectId, SelectAddressNav, ShippingAddress } from '@/types';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { deleteShippingAddress, fetchAllAddresses, setSelectedAddress, updateShippingAddress } from '@/redux/features/address/addressesSlice';
import { showErrorToast } from '@/utils/toast';
import { OnLoading } from '@/components';
import { useRefresh } from '@/hooks/useRefresh';
import * as Storage from '@/services/asyncStorage.service';
import { KEY } from '@/constants';

type Props = {
    navigation: SelectAddressNav;
    userId: ObjectId;
};

export default function SelectAddressContent({ navigation, userId }: Props) {
    const dispatch = useAppDispatch();
    const { onRefresh, refreshing } = useRefresh(() => fetchAllAddresses(userId));
    const { status, error } = useAppSelector(state => state.addresses);
    const addresses = useAppSelector(state => state.addresses.data?.data);

    useEffect(() => {
        dispatch(fetchAllAddresses(userId));
    }, []);

    useEffect(() => {
        if (addresses && addresses.length == 0) {
            dispatch(setSelectedAddress(null))
        }
    }, [addresses])

    if (status === 'loading' || status === 'failed' || !addresses) {
        if (error) {
            showErrorToast({
                title: `Lỗi tải địa chỉ ${error.code}`,
                message: error.message
            });
            dispatch(fetchAllAddresses(userId));
        }
        return (
            <OnLoading />
        )
    };

    function handleSetDefault(addressId: ObjectId, address: BaseAddressProps) {
        Storage.removeItem(KEY.ADDR);
        Storage.saveItem(KEY.ADDR, address);
        dispatch(updateShippingAddress({
            userId,
            addressId,
            body: address
        }))
    }

    function handleDeleteAddress(addressId: ObjectId) {
        dispatch(deleteShippingAddress({ userId, addressId }))
    }

    function handleSelectAddress(address: AddressSelection) {
        dispatch(setSelectedAddress(address));
        navigation.goBack();
    }

    function handleEditAddress(address: ShippingAddress) {
        navigation.navigate("AddressModify", { address });
    }

    const AddAddressButton = () => {
        if (addresses.length >= 5)
            return (
                <View style={styles.buttonWrapper}>
                    <CustomButton
                        title='THÊM ĐỊA CHỈ'
                        outline
                        onPress={() => navigation.navigate("AddressModify", {})}
                    />
                </View>
            )
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View>
                    <AddAddressButton />

                    <AddressList
                        addresses={addresses}
                        handleSetDefault={handleSetDefault}
                        handleDeleteAddress={handleDeleteAddress}
                        handleSelectAddress={handleSelectAddress}
                        handleEditAddress={handleEditAddress}
                        onRefresh={onRefresh}
                        refreshing={refreshing}
                    />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F9'
    },
    buttonWrapper: {
        paddingVertical: 14,
        paddingHorizontal: 20,
        backgroundColor: "#FFFFFF",
        borderBottomColor: "#D0D3D5",
        borderBottomWidth: 1,
    },
});