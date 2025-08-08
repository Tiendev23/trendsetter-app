import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ScreenHeader } from '@/components';
import AddAddressContent from './AddAddressContent';
import { AddressModifyNav, AddressModifyRoute, ObjectId, ShippingAddress } from '@/types';
import { useRequireAuth } from '@/contexts/AuthContext';
import EditAddressContent from './EditAddressContent';

type ContentProps = Pick<Props, "navigation"> & {
    userId: ObjectId;
    address?: ShippingAddress | undefined;
}

const AddressModifyContent = ({ navigation, userId, address }: ContentProps) => {
    if (address) return (
        <EditAddressContent
            navigation={navigation}
            userId={userId}
            address={address}
        />
    )

    return (
        <AddAddressContent
            navigation={navigation}
            userId={userId}
        />
    )
}

type Props = {
    navigation: AddressModifyNav;
    route: AddressModifyRoute;
};

export default function AddressModify({ navigation, route }: Props) {
    const address = route.params?.address;
    const user = useRequireAuth();
    const title = address ? "Sửa địa chỉ" : "Thêm địa chỉ";
    return (
        <View style={styles.container}>
            <ScreenHeader
                title={title}
            />

            <AddressModifyContent
                navigation={navigation}
                userId={user._id}
                address={address}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F9'
    },
})