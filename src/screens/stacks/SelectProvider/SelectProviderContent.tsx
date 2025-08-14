import { StyleSheet, View } from 'react-native';
import React from 'react';
import { SelectProviderNav } from '@/types/navigation';
import { FlatList } from 'react-native-gesture-handler';
import { PaymentMethod } from '@/types/models';
import { PaymentMethodItem } from './components';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setSelectedMethod } from '@/redux/features/payment/providerSlice';

type Props = {
    navigation: SelectProviderNav;
    methods: PaymentMethod[];
}

export default function SelectProviderContent({ navigation, methods }: Props) {
    const dispatch = useAppDispatch();
    const selectedMethod = useAppSelector(state => state.provider.method)

    return (
        <View style={styles.container}>
            <FlatList
                data={methods}
                renderItem={({ item }) => (
                    <PaymentMethodItem
                        method={item}
                        isSelected={item.provider === selectedMethod.provider}
                        handleMethodSelected={() => {
                            dispatch(setSelectedMethod(item));
                            navigation.goBack();
                        }}
                    />
                )}
                contentContainerStyle={styles.contentContainer}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F9'
    },
    contentContainer: {
        rowGap: 12,
        paddingVertical: 16,
        paddingHorizontal: 16,
    },
});