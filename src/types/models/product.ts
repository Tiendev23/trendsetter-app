import { Gender, ObjectId } from "../common";
import { Brand } from "./brand";
import { Campaign } from "./campaign";
import { Category } from "./category";
import { OrderItem } from "./order";
import { User } from "./user";

export type Product = {
    _id: string;
    name: string;
    price: number;
    category?: Category;
    brand?: Brand;
    image: string;
    banner?: string;
    description?: string;
    sizes?: string[];
    colors?: string[];
    __v: number;
};

export interface VariantSize {
    _id: ObjectId; // "686e65c09d70cd16504feead";
    productVariant: ObjectId; // "686e65c09d70cd16504feeab";
    size: string; // "39";
    stock: number; // 10;
    active: boolean; // true;
    createdAt: string; // "2025-07-09T12:51:12.218Z";
    updatedAt: string; // "2025-07-09T12:51:12.218Z";
    __v?: number; // 0;
}

export interface Variant {
    _id: ObjectId; // "686e65c09d70cd16504feeab";
    product: ObjectId; // "686e65c09d70cd16504feea9";
    color: string; // "Đen";
    images: string[];
    basePrice: number; // 910000;
    active: boolean; // true;
    createdAt: string; // "2025-07-09T12:51:12.215Z";
    updatedAt: string; // "2025-07-09T12:51:12.215Z";
    __v: number; // 0;
    finalPrice: number; // 728000;
    inventories: VariantSize[];
}

type CategoryLite = Pick<Category, "_id" | "name">;

type BrandLite = Pick<Brand, "_id" | "name">;

export type CampaignLite = Pick<
    Campaign,
    "_id" | "title" | "type" | "value" | "startDate" | "endDate"
>;

export type Rating = {
    average: string; // "0.0";
    count: number;
};

export interface ProductDetails {
    _id: ObjectId; // "686e65c09d70cd16504feea9";
    category: CategoryLite;
    brand: BrandLite;
    name: string; // "Giày Thể Thao Biti's Hunter Core";
    gender: Gender; // "male";
    description: string; // "<div><p>Sở hữu diện mạo thể thao và hiện đại, mẫu <strong>Hunter Core màu đen</strong> là sự kết hợp hoàn hảo giữa hiệu năng và phong cách. Thiết kế upper từ <strong>lưới dệt công nghệ mới</strong> mang lại cảm giác thông thoáng tối đa, giúp đôi chân luôn khô ráo dù vận động cường độ cao. Sản phẩm còn nổi bật với <strong>logo Hunter to bản hai bên thân</strong>, tạo điểm nhấn mạnh mẽ và cá tính cho phái mạnh.</p><p>Đế giày làm từ chất liệu <strong>IP siêu nhẹ</strong>, cho phép di chuyển linh hoạt và êm ái hơn trên nhiều địa hình. Thiết kế đế giữa ôm chân, hỗ trợ vòm bàn chân tốt, đồng thời lớp đệm dày giúp giảm chấn hiệu quả, hạn chế mỏi khi đi lại hoặc chạy bộ lâu dài. Phần gót có thêm <strong>loop kéo tiện lợi</strong>, hỗ trợ mang vào nhanh chóng.</p><p>Không chỉ thích hợp để <strong>chạy bộ nhẹ, gym, thể thao</strong>, mẫu màu đen còn có thể kết hợp dễ dàng với trang phục thường ngày, mang lại vẻ ngoài khỏe khoắn và năng động. Với gam màu trung tính, sản phẩm là lựa chọn lý tưởng cho cả học sinh – sinh viên lẫn dân văn phòng yêu thích vận động.</p></div>";
    active: boolean; // true;
    createdAt: string; // "2025-07-09T12:51:12.210Z";
    updatedAt: string; // "2025-07-09T12:51:12.210Z";
    __v?: number; // 0;
    campaign: CampaignLite | null;
    variants: Variant[];
    rating: Rating;
}

type UserLite = Pick<User, "_id" | "username" | "fullName" | "avatar">;

type OrderItemLite = Pick<OrderItem, "_id" | "size" | "color">;

export interface Review {
    _id: ObjectId;
    user: UserLite;
    orderItem: OrderItemLite;
    rating: number;
    content: string;
    createdAt: string;
    updatedAt: string;
    __v?: number;
}
