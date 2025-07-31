import { ObjectId } from "../common";

type DiscountType = "percentage" | "fixed";

export type Campaign = {
    _id: ObjectId; // ["686e65c09d70cd16504feeb7"]
    products: ObjectId[];
    categories: ObjectId[]; // ["686e65c09d70cd16504fee9d"];
    brands: ObjectId[]; // ["686e65c09d70cd16504fee9f"];
    title: string; // "Giảm giá 20% cho giày thể thao Biti's Hunter";
    description: string; // "Chương trình khuyến mãi đặc biệt cho các sản phẩm giày thể thao trong tháng này.";
    type: DiscountType; // "percentage";
    value: number; // 20;
    startDate: string; // "2025-07-09T12:51:12.226Z"
    endDate: string; // "2025-08-09T12:51:12.226Z"
    imageUrl: string; // "https://example.com/campaign-image.jpg";
    active: boolean; // true;
    createdAt: string; // "2025-07-09T12:51:12.229Z"
    updatedAt: string; // "2025-07-09T12:51:12.229Z"
    __v: number; // 0;
};
