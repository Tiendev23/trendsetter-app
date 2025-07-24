import { ProductInVariant } from "./productVariant"

export type Inventory = {
    _id: string,
    size: string,
    stock: number,
    active: boolean,
    productVariant: string
}