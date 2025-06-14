import { createContext, useState, ReactNode } from "react";
import { CartItem, Product } from "../types";

type CartContextType = {
    cartItems: CartItem[];
    addToCart: (
        product: Product,
        selectedSize: string,
        selectedColor: string
    ) => void;
    deleteCartItem: (
        productId: string,
        selectedSize: string,
        selectedColor: string
    ) => void;
    updateCartItem: (
        productId: string,
        selectedSize: string,
        selectedColor: string,
        newQuantity: number
    ) => void;
    clearCart: () => void;
};

export const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const addToCart = (product: Product, selectedSize: string, selectedColor: string) => {
        setCartItems((prev) => {
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
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [
                    ...prev,
                    {
                        product: product._id,
                        quantity: 1,
                        price: product.price,
                        size: selectedSize,
                        color: selectedColor,
                    },
                ];
            }
        });
    };

    const updateCartItem = (productId: string, selectedSize: string, selectedColor: string, newQuantity: number) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.product === productId &&
                    item.size === selectedSize &&
                    item.color === selectedColor
                    ? { ...item, quantity: Math.max(newQuantity, 1) } // Không cho giảm dưới 1
                    : item

            )
        );
    };

    const deleteCartItem = (productId: string, selectedSize: string, selectedColor: string) => {
        setCartItems((prev) =>
            prev.filter(
                (item) =>
                    !(item.product === productId &&
                        item.size === selectedSize &&
                        item.color === selectedColor)
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, updateCartItem, deleteCartItem, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}