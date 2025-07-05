import { Brand } from "./brand";
import { Category } from "./category";

export type Product = {
    _id: string;
    name: string;
    price: number;
    category?: Category;
    brand?: Brand;
    images?: string[];
    banner?: string;
    description?: string;
    sizes?: string[];
    colors?: string[];
    stock?: number;
    __v: number;
};

export const IMAGE_NOT_FOUND =
    "https://res.cloudinary.com/trendsetter/image/upload/v1750076569/download_cdvees.png";
