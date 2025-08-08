import {
    AddressSelection,
    BaseAddressProps,
    ProvinceLite,
    Ward,
} from "@/types";
import {
    validateAddressStreet,
    validateFullName,
    validatePhoneNumber,
} from "@/utils/validateForm";

type InputAddress = Omit<AddressSelection, "ward" | "province">;

export function isValidAddress(address: InputAddress): boolean {
    return (
        validateFullName(address.fullName) &&
        validatePhoneNumber(address.phone) &&
        validateAddressStreet(address.street)
    );
}

type Props = {
    input: InputAddress;
    province: ProvinceLite | null;
    ward: Ward | null;
    isDefault: boolean;
};
export function getAddress({
    input,
    province,
    ward,
    isDefault,
}: Props): BaseAddressProps | null {
    if (!ward || !province || !isValidAddress(input)) return null;
    return {
        fullName: input.fullName,
        phone: input.phone,
        province: province.name,
        ward: ward.name,
        street: input.street,
        isDefault: isDefault,
    };
}
