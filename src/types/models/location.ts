export interface Ward {
    wardCode: string;
    name: string;
}

export interface Province {
    provinceCode: string;
    name: string;
    shortName: string;
    code: string;
    placeType: string;
    wards: Ward[];
}

export type LocationBaseProps = {
    province: string;
    ward: string;
}

export type ProvinceLite = Pick<Province, "provinceCode" | "name">;

export type AddressLocate = {
    province: ProvinceLite;
    ward: Ward;
};
