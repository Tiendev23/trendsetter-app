export type Product = {
    _id: string;
    name: string;
    price: number;
    category: string;
    brand: string;
    image: string;
    banner?: string;
    description?: string;
    sizes: string[];
    colors: string[];
};
