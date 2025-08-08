import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ScreenHeader } from '@/components';
import SelectAddressContent from './SelectAddressContent';
import { SelectAddressNav } from '@/types';
import { useRequireAuth } from '@/contexts/AuthContext';

type Props = {
    navigation: SelectAddressNav;
};

export default function SelectAddress({ navigation }: Props) {
    const user = useRequireAuth();

    return (
        <View style={styles.container}>
            <ScreenHeader
                title='Địa chỉ nhận hàng'
            />

            <SelectAddressContent
                navigation={navigation}
                userId={user._id}
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