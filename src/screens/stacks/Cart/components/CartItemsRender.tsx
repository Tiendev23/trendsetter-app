import { FlatList, View } from 'react-native';
import React from 'react';
import { CartItem, ObjectId } from '@/types';
import { default as CartItemRender } from './CartItem';

type Props = {
    data: CartItem[];
    isEditable: boolean;
    checkedItems: CartItem[];
    handleOnClicked: (item: CartItem) => void;
    handleOnSelect: (sizeId: ObjectId) => void;
    handleOnUpdate: (sizeId: ObjectId, newQuantity: number) => void;
    handleOnDelete: (sizeId: ObjectId) => void;
};
export default function CartItemsRender({
    data, checkedItems, isEditable,
    handleOnClicked, handleOnSelect, handleOnUpdate, handleOnDelete
}: Props) {

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={data}
                renderItem={({ item }) => {
                    const isSelected = checkedItems.some(i => i.size._id === item.size._id);
                    return (
                        <CartItemRender
                            item={item}
                            isEditable={isEditable}
                            isSelected={isSelected}
                            onItemClicked={handleOnClicked}
                            onSelectItem={handleOnSelect}
                            onUpdateItem={handleOnUpdate}
                            onDeleteItem={handleOnDelete}
                        />
                    );
                }}
                contentContainerStyle={{ gap: 16, paddingVertical: 16 }}
            />
        </View>
    );
}
