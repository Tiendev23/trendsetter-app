import { Brand } from "./brand";
import { Category } from "./category";

export type Product = {
    _id: string;
    name: string;
    price: number;
    category: Category;
    brand?: Brand;
    image?: string;
    banner?: string;
    description?: string;
    sizes?: string[];
    colors?: string[];
    __v: number;
};
