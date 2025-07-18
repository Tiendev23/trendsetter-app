import { ObjectId } from "../common";

export type Brand = {
    _id: ObjectId;
    name: string;
    logoUrl: string;
    __v?: number;
};
