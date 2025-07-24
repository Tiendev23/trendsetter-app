import { Brand } from "./brand";
import { Category } from "./category";
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
  brands:Brand[];
};
