import { ObjectId } from "./common";
import { Brand } from "./models";
import { Category } from "./models";
import { Product } from "./Products/products";

export type Campaign = {
  _id: string;
  title: string;
  description: string;
  type: string;
  value: number;
  startDate: string;
  endDate: string;
  imageUrl: string;
  active: boolean;
  manualOverride: boolean;
  createdAt: string;
  updatedAt: string;
  products: Product[];
  categories: Category[];
  brands: Brand[];
};
import { Variant } from "./models";
import { ProductVariant } from "./Products/productVariant";


export interface ProductWithCampaign extends ProductVariant {
  discountValue: number;
  discountType: 'percentage' | 'fixed';
  campaignId: string;
}

