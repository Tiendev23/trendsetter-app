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

export type ProvinceLite = Pick<Province, "provinceCode" | "name">;

export type AddressSelection = Pick<Province, "provinceCode"> &
    Pick<Ward, "wardCode">;
