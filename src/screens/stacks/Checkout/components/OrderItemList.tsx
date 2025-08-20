import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { CartItem } from '@/types';
import { OrderItem } from '@/components';

type Props = {
    items: CartItem[];
    handleItemClick: (item: CartItem) => void;
};
export default function OrderItemList({
    items, handleItemClick
}: Props) {

    return (
        <View style={styles.container}>
            <FlatList
                data={items}
                renderItem={({ item }) =>
                    <OrderItem
                        item={item}
                        navToProdDetails={() => handleItemClick(item)}
                    />
                }
                scrollEnabled={false} // Tắt cuộn riêng của FlatList
                nestedScrollEnabled={true} // Cho phép cuộn bên trong ScrollView
                ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    itemSeparator: {
        width: "100%",
        height: 1,
        backgroundColor: "#cacacbff"
    }
})