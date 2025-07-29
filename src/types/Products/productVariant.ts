import { Brand } from "../models";
import { Category } from "../models";
import { Inventory } from "./inventory";

export type ProductInVariant = {
    _id: string;
    category: Category;
    brand: Brand;
    name: string;
    gender: string;
    description: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
};

export type ProductVariant = {
    _id: string;
    product: ProductInVariant;
    color: string;
    images: string[];
    basePrice: number;
    finalPrice: number;
    active: boolean;
    inventories: Inventory;
    createdAt: string;
    updatedAt: string;
};