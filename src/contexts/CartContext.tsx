import { createContext, useState, ReactNode } from "react";
import { CartItem, Product } from "../types";

type CartContextType = {
    items: CartItem[];
    status: string;
    setStatus: (value: string) => void
    getCartItem: (
        item: CartItem
    ) => CartItem;
    getSubtotal: () => number;
    addToCart: (
        product: Product,
        selectedSize: string,
        selectedColor: string,
        quantity: number
    ) => void;
    deleteCartItem: (
        item: CartItem
    ) => void;
    updateCartItem: (
        item: CartItem,
        newQuantity: number
    ) => void;
    clearCart: () => void;
};

export const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([
        // {
        //     name: "Nike Air Zoom Pegasus 40",
        //     product: "685bee08c9c6ffe04f185a3d",
        //     quantity: 1,
        //     price: 35000,
        //     size: "XL",
        //     color: "Xanh",
        // }
    ]);
    const [status, setStatus] = useState('idle');
    const getCartItem = (item: CartItem) => {
        return cart.find(
            (obj) =>
                obj.product === item.product &&
                obj.size === item.size &&
                obj.color === item.color
        );
    };

    const getSubtotal = () => {
        return cart.reduce((subtotal, obj) => subtotal + (obj.price * obj.quantity), 0);
    };

    const addToCart = (product: Product, selectedSize: string, selectedColor: string, quantity: number) => {
        setCart((prev) => {
            const existingItem = prev.find(
                (item) =>
                    item.product === product._id &&
                    item.size === selectedSize &&
                    item.color === selectedColor
            );

            if (existingItem) {
                return prev.map((item) =>
                    item.product === product._id &&
                        item.size === selectedSize &&
                        item.color === selectedColor
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                return [
                    ...prev,
                    {
                        name: product.name,
                        product: product._id,
                        quantity: quantity,
                        price: product.price,
                        size: selectedSize,
                        color: selectedColor,
                    },
                ];
            }
        });
    };

    const updateCartItem = (item: CartItem, newQuantity: number) => {
        setCart((prev) =>
            prev.map((obj) =>
                obj.product === item.product &&
                    obj.size === item.size &&
                    obj.color === item.color
                    ? { ...obj, quantity: Math.max(newQuantity, 1) } // Không cho giảm dưới 1
                    : obj

            )
        );
    };

    const deleteCartItem = (item: CartItem) => {
        setCart((prev) =>
            prev.filter(
                (obj) =>
                    !(obj.product === item.product &&
                        obj.size === item.size &&
                        obj.color === item.color)
            )
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ items: cart, status, setStatus, getCartItem, getSubtotal, addToCart, updateCartItem, deleteCartItem, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}