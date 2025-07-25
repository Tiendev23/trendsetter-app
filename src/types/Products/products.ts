import { Brand } from "../models";
import { Category } from "../models";
import { ProductVariant } from "./productVariant";

export type Product = {
  _id: string;
  category?: Category;
  brand?: Brand;
  name: string;
  gender?: string;
  description?: string;
  active: boolean;
  variants: ProductVariant[];
  rating: {
    average: string;
    count: number;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export const IMAGE_NOT_FOUND =
  "https://res.cloudinary.com/trendsetter/image/upload/v1750076569/download_cdvees.png";
