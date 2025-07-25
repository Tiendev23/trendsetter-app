import { ObjectId } from "../common";

export type CartItem = {
    variantId: ObjectId;
    sizeId: ObjectId;
    quantity: number;
};
