import { ObjectId } from "../common";

export interface BaseItemProps {
    quantity: number;
}
// Payload khi POST thêm/bớt
export interface CartItemLite extends BaseItemProps {
    sizeId: ObjectId;
}

// Data server trả về trực tiếp từ DB sau POST/PUT
export interface CartItemDB extends BaseItemProps {
    _id: ObjectId;
    user: ObjectId;
    variantSize: ObjectId;
    __v: number;
}

// Data dùng để hiển thị lên front-end
export interface CartItem extends BaseItemProps {
    product: ObjectId;
    variant: ObjectId;
    size: {
        _id: ObjectId;
        size: string;
    };
    campaign: ObjectId | null;
    name: string;
    color: string;
    basePrice: number;
    finalPrice: number;
    imageUrl: string;
    active: boolean;
}
