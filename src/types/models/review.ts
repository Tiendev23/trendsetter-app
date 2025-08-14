import { ObjectId } from "../common";
import { OrderItem } from "./order";
import { User } from "./user";

export interface ReviewPayload {
    orderItem: ObjectId;
    rating: number;
    content: string;
    images: string[];
}
export interface BaseReviewProps extends Omit<ReviewPayload, "orderItem"> {
    _id: ObjectId;
    product: ObjectId;
    like: number;
    isEdited: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface ReviewDB extends BaseReviewProps {
    user: ObjectId;
    orderItem: ObjectId;
}

type UserLite = Pick<User, "_id" | "username" | "fullName" | "avatar">;

type OrderItemLite = Pick<OrderItem, "_id" | "color" | "size">;

export interface Review extends BaseReviewProps {
    user: UserLite;
    orderItem: OrderItemLite;
}
