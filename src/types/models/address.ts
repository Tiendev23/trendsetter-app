import { ObjectId } from "../common";

export interface BaseAddressProps {
    fullName: string;
    phone: string;
    street: string;
    ward: string;
    province: string;
    isDefault: boolean;
}

export interface ShippingAddress extends BaseAddressProps {
    _id: ObjectId;
    user: ObjectId;
    __v?: number
}

export type AddressSelection = Omit<BaseAddressProps, "isDefault">;