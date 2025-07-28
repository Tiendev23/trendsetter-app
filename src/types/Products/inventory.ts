import { ObjectId } from "../common"
import { ProductInVariant } from "./productVariant"

export type Inventory = {
    _id: ObjectId,
    size: string,
    stock: number,
    active: boolean,
    productVariant: string
}