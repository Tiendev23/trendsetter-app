import { StyleSheet, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { CartNav } from '@/navigation/NavigationTypes';
import { CartItem as CartItem, ObjectId, User } from '@/types';
import { CartItemsRender, ConfirmDeleteModal, ConfirmLoginModal, DeletionCountPanel, PricingPanel } from './components';
import { CartContextType } from '@/contexts/CartContext';

type Props = {
    navigation: CartNav;
    isEditable: boolean;
    cartContext: CartContextType;
    user: User | null;
    onDelete: () => void;
}

export default function CartContent({ navigation, cartContext, isEditable, user, onDelete }: Props) {
    const cart = cartContext;
    const [checkedIds, setCheckedIds] = useState<string[]>([]);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    useEffect(() => {
        setCheckedIds([])
    }, [isEditable])

    const checkedItems = useMemo(() => {
        return cart.items.filter(item => checkedIds.includes(item.size._id));
    }, [cart.items, checkedIds]);

    const isCheckedAll = useMemo(() =>
        cart.items.length > 0 && checkedIds.length === cart.items.length,
        [cart.items, checkedIds]
    );

    function handleUpdateItem(sizeId: ObjectId, newQuantity: number) {
        cart.updateItem(sizeId, newQuantity)
    };

    function handleDeleteItem(sizeId: ObjectId) {
        cart.removeItem(sizeId);
        toggleCheckItem(sizeId);
    };

    function toggleCheckItem(sizeId: ObjectId) {
        setCheckedIds(prev =>
            prev.includes(sizeId) ? prev.filter(id => id !== sizeId) : [...prev, sizeId]
        );
    };

    function toggleCheckAll() {
        if (isCheckedAll) {
            setCheckedIds([]);
        } else {
            setCheckedIds(cart.items.map(i => i.size._id));
        }
    };

    function handleCartDeleting() {
        if (isCheckedAll) {
            cart.clearAllItems();
        } else {
            cart.removeManyItem(checkedIds);
        };
        onDelete();
        setCheckedIds([]);
        setModalVisible(false);
    }

    function handleOnBuying() {
        if (user) {
            navigation.navigate({
                name: "Checkout",
                params: {
                    items: checkedItems,
                }
            });
        } else {
            setModalVisible(true);
        }
    };

    return (
        <View style={styles.container}>
            <CartItemsRender
                data={cart.items}
                checkedItems={checkedItems}
                onSelect={toggleCheckItem}
                isEditable={isEditable}
                onUpdateItem={handleUpdateItem}
                onDeleteItem={handleDeleteItem}
            />
            {
                isEditable ?
                    <DeletionCountPanel
                        isEmpty={cart.items.length == 0}
                        checkedIds={checkedIds}
                        isCheckedAll={isCheckedAll}
                        onCheckedAll={toggleCheckAll}
                        onDeleting={() => setModalVisible(true)}
                    />
                    :
                    <PricingPanel
                        checkedItems={checkedItems}
                        onBuying={handleOnBuying}
                    />
            }

            <ConfirmLoginModal
                visible={modalVisible && !isEditable}
                onClose={() => setModalVisible(false)}
                onLogin={() => {
                    setModalVisible(false);
                    navigation.navigate({
                        name: "Login",
                        params: {}
                    });
                }}
            />

            <ConfirmDeleteModal
                visible={modalVisible && isEditable}
                checkedIds={checkedIds}
                onNegative={() => setModalVisible(false)}
                onPositive={handleCartDeleting}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F9'
    },

    pricingPanel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        gap: 20,
        paddingBottom: 30
    },

    priceWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    label: {
        fontWeight: '500',
        fontSize: 16,
    },
    price: {
        color: '#006340'
    },

})