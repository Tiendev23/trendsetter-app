import { FlatList, RefreshControl, View } from 'react-native';
import React from 'react';
import { CartItem as CartItemType, ObjectId } from '@/types';
import CartItem from './CartItem';

type Props = {
    data: CartItemType[];
    isEditable: boolean;
    selectedItemIds: ObjectId[];
    handleOnClicked: (item: CartItemType) => void;
    handleOnSelect: (sizeId: ObjectId) => void;
    handleOnUpdate: (sizeId: ObjectId, newQuantity: number) => void;
    handleOnDelete: (sizeId: ObjectId) => void;
    refreshing: boolean;
    onRefresh: () => Promise<void>;
};
export default function CartItemsRender({
    data, selectedItemIds, isEditable, refreshing, onRefresh,
    handleOnClicked, handleOnSelect, handleOnUpdate, handleOnDelete
}: Props) {

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={data}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                renderItem={({ item }) => {
                    const isSelected = selectedItemIds.some(id => id === item.size._id);
                    return (
                        <CartItem
                            item={item}
                            isEditable={isEditable}
                            isSelected={isSelected}
                            handleCartItemClick={() => handleOnClicked(item)}
                            handleSelectItem={() => handleOnSelect(item.size._id)}
                            handleUpdateItem={(newQuantity: number) => handleOnUpdate(item.size._id, newQuantity)}
                            handleDeleteItem={() => handleOnDelete(item.size._id)}
                        />
                    );
                }}
                contentContainerStyle={{ gap: 16, paddingVertical: 16 }}
            />
        </View>
    );
}
