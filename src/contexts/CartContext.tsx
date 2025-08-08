import { createContext, useState, ReactNode, useContext, useEffect } from "react";
import { CartItem, ObjectId } from "@/types";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useAuthContext } from "./AuthContext";
import { clearCart, removeManyCartItem, resetCartsState } from "@/redux/features/cart/cartsSlice";
import { showErrorToast, showSuccessToast } from "@/utils/toast";
import * as Storage from "@/services/asyncStorage.service";
import { addCartItem, removeCartItem, resetCartState, updateCartItem } from "@/redux/features/cart/cartSlice";
import { debounce } from 'lodash';

export type CartContextType = {
    items: CartItem[];

    addToCart: (item: CartItem) => void;

    updateItem: (
        sizeId: ObjectId,
        newQuantity: number
    ) => void;

    removeItem: (
        sizeId: ObjectId
    ) => void;

    removeManyItem: (
        sizeIds: ObjectId[]
    ) => void;

    clearAllItems: () => void;

    clearCartUI: (sizeIds: ObjectId[]) => void;
};

export const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const { user } = useAuthContext();
    const dispatch = useAppDispatch();
    const { data, status, error } = useAppSelector(state => state.carts);
    const { status: updateStatus, error: updateError } = useAppSelector(state => state.cart);
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        Storage.getItem("@cart").then((storedCart) => {
            if (Array.isArray(storedCart))
                setCart(storedCart);
        });
    }, []);

    useEffect(() => {
        if (status === "succeeded") {
            if (Array.isArray(data?.data))
                setCart(data?.data);
            dispatch(resetCartsState());
        }
        if (status === 'failed') {
            showErrorToast({
                title: `Lỗi ${error?.code}`,
                message: error?.message
            });
            dispatch(resetCartsState())
        }
    }, [status]);

    useEffect(() => {
        if (updateStatus === 'succeeded') {
            dispatch(resetCartState())
        }
        if (updateStatus === 'failed') {
            showErrorToast({
                title: `Lỗi ${updateError?.code}`,
                message: updateError?.message
            })
            dispatch(resetCartState())
        }
    }, [updateStatus]);

    async function updateCartStorage(updatedCart: CartItem[]) {
        await Storage.removeItem("@cart");
        await Storage.saveItem("@cart", updatedCart);
    }

    const addToCart = async (newItem: CartItem) => {
        const exists = cart.find(item => item.size._id === newItem.size._id);
        let updatedCart;
        if (exists) {
            updatedCart = cart.map(item =>
                item.size._id === newItem.size._id
                    ? { ...item, quantity: item.quantity + newItem.quantity }
                    : item
            );
        } else {
            updatedCart = [...cart, newItem];
        }

        if (user) {
            dispatch(addCartItem({ userId: user._id, body: { sizeId: newItem.size._id, quantity: newItem.quantity } }));
        } else {
            await updateCartStorage(updatedCart);
        }

        setCart(updatedCart);
        showSuccessToast({
            title: "Đã thêm vào giỏ hàng"
        })
    };

    const debouncedUpdateItem = debounce(
        (sizeId: ObjectId, quantity: number) => {
            const updatedCart = cart.map(
                (item) =>
                    item.size._id === sizeId
                        ? { ...item, quantity }
                        : item
            );
            if (user) {
                dispatch(updateCartItem({ userId: user._id, sizeId, body: { quantity } }));
            } else {
                updateCartStorage(updatedCart);
            }
            setCart(updatedCart);
        },
        300 // thời gian chờ (ms)
    );

    const updateItem = (sizeId: ObjectId, newQuantity: number) => {
        const quantity = Math.max(newQuantity, 1);
        debouncedUpdateItem(sizeId, quantity);
    };

    const removeItem = async (sizeId: ObjectId) => {
        const updatedCart = cart.filter(item => item.size._id !== sizeId);

        if (user) {
            dispatch(removeCartItem({ userId: user._id, sizeId }))
        } else {
            await updateCartStorage(updatedCart);
        }
        setCart(updatedCart);
    };

    const removeManyItem = async (sizeIds: ObjectId[]) => {
        const sizeIdSet = new Set(sizeIds);
        const updatedCart = cart.filter(item => !sizeIdSet.has(item.size._id));

        if (user) {
            dispatch(removeManyCartItem({ userId: user._id, body: sizeIds }))
        } else {
            await updateCartStorage(updatedCart);
        }
        setCart(updatedCart);
    }

    const clearAllItems = async () => {
        if (user) {
            dispatch(clearCart(user._id))
        } else {
            await updateCartStorage([]);
        }
        setCart([]);
    };

    const clearCartUI = (sizeIds: ObjectId[]) => {
        const sizeIdSet = new Set(sizeIds);
        const updatedCart = cart.filter(item => !sizeIdSet.has(item.size._id));
        setCart(updatedCart);
    }

    return (
        <CartContext.Provider value={{
            items: cart, addToCart, updateItem,
            removeItem, removeManyItem, clearAllItems,
            clearCartUI
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCartContext = () => {
    const context = useContext(CartContext);
    if (!context)
        throw new Error('useCart must be used within a CartProvider');
    return context;
}