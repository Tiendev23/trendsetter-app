import { FlatList, View } from 'react-native';
import React from 'react';
import { CartItem as Item, ObjectId } from '@/types';
import CartItem from './CartItem';

type Props = {
    data: Item[];
    isEditable: boolean;
    checkedItems: Item[];
    handleOnSelect: (sizeId: ObjectId) => void;
    handleOnUpdate: (sizeId: ObjectId, newQuantity: number) => void;
    handleOnDelete: (sizeId: ObjectId) => void;
};
export default function CartItemsRender({
    data, checkedItems, isEditable,
    handleOnSelect: onSelect, handleOnUpdate: onUpdateItem, handleOnDelete: onDeleteItem
}: Props) {

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={data}
                renderItem={({ item }) => {
                    const isSelected = checkedItems.some(i => i.size._id === item.size._id);
                    return (
                        <CartItem
                            item={item}
                            onSelect={onSelect}
                            isEditable={isEditable}
                            isSelected={isSelected}
                            onUpdateItem={onUpdateItem}
                            onDeleteItem={onDeleteItem}
                        />
                    );
                }}
                contentContainerStyle={{ gap: 16, paddingVertical: 16 }}
            />
        </View>
    );
}
