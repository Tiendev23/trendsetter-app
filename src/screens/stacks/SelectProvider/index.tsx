import { StyleSheet, View } from 'react-native';
import React from 'react';
import { ScreenHeader } from '@/components';
import { SelectProviderNav } from '@/types';
import SelectProviderContent from './SelectProviderContent';
import { getAllMethods } from '@/services/payment.service';

type Props = {
    navigation: SelectProviderNav;
};

export default function SelectAddress({ navigation }: Props) {
    const methods = getAllMethods();

    return (
        <View style={styles.container}>
            <ScreenHeader
                title='Phương thức thanh toán'
            />

            <SelectProviderContent
                navigation={navigation}
                methods={methods}
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