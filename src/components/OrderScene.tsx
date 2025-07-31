import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Order } from '../types/models';
import OrderPreview from './listItems/OrderPreview';
import { OrderNav } from '../types/navigation';

type Props = {
    data: Order[];
    navigation: OrderNav;
};

export default function OrderScene({ data, navigation }: Props) {
    return (
        <View style={{ flex: 1 }} >
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <OrderPreview
                        order={item}
                        navigation={navigation}
                    />
                )}
                contentContainerStyle={{ gap: 16, paddingVertical: 16 }}
                style={{ flex: 1 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({});