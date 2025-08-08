import { StyleSheet, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { CartNav } from '@/types';
import { CartItem, ObjectId, User } from '@/types';
import { CartItemsRender, ConfirmDeleteModal, ConfirmLoginModal, DeletionCountPanel, PricingPanel } from './components';
import { CartContextType } from '@/contexts/CartContext';
import { useRefresh } from '@/hooks/useRefresh';
import { fetchCart } from '@/redux/features/cart/cartsSlice';

type Props = {
    navigation: CartNav;
    isEditable: boolean;
    cartContext: CartContextType;
    user: User | null;
    onDelete: () => void;
}

export default function CartContent({ navigation, cartContext, isEditable, user, onDelete }: Props) {
    const cart = cartContext;
    const { onRefresh, refreshing } = useRefresh(user ? () => fetchCart(user._id) : undefined);
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
            navigation.navigate("Checkout", { items: checkedItems });
        } else {
            setModalVisible(true);
        }
    };

    function handleOnClickedItem(item: CartItem) {
        navigation.navigate("ProductDetail", {
            productId: item.product,
            variantId: item.variant,
        }, { merge: true });
    }

    const isCartEmpty = cart.items.length === 0;
    const isNoCheckedItems = checkedItems.length === 0;

    return (
        <View style={styles.container}>
            <CartItemsRender
                data={cart.items}
                selectedItemIds={checkedIds}
                isEditable={isEditable}
                onRefresh={onRefresh}
                refreshing={refreshing}
                handleOnClicked={handleOnClickedItem}
                handleOnSelect={(sizeId: ObjectId) =>
                    setCheckedIds(prev => prev.includes(sizeId)
                        ? prev.filter(id => id !== sizeId)
                        : [...prev, sizeId]
                    )
                }
                handleOnUpdate={(sizeId: ObjectId, newQuantity: number) => cart.updateItem(sizeId, newQuantity)}
                handleOnDelete={(sizeId: ObjectId) => cart.removeItem(sizeId)}
            />

            {
                isEditable ?
                    <DeletionCountPanel
                        invisible={isCartEmpty}
                        checkedIds={checkedIds}
                        isCheckedAll={isCheckedAll}
                        onCheckedAll={toggleCheckAll}
                        onDeleting={() => setModalVisible(true)}
                    />
                    :
                    <PricingPanel
                        invisible={isCartEmpty || isNoCheckedItems}
                        checkedItems={checkedItems}
                        onBuying={handleOnBuying}
                    />
            }

            <ConfirmLoginModal
                visible={modalVisible && !isEditable}
                onClose={() => setModalVisible(false)}
                onLogin={() => {
                    setModalVisible(false);
                    navigation.navigate("Login", {});
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