import rawData from "@/data/locations.json";
import type {
    AddressLocate,
    BaseAddressProps,
    LocationBaseProps,
    Province,
    ProvinceLite,
    ShippingAddress,
    Ward as WardLite,
} from "../types";
import { ensureExists } from "@/utils/errorHelper";

const provinces = rawData as Province[];

/** Chọn ra code và tên tỉnh/thành */
export function getProvinces(): ProvinceLite[] {
    return provinces.map(({ provinceCode, name }) => ({
        provinceCode,
        name,
    }));
}

/** Lấy toàn bộ phường/xã */
export function getAllWards(): WardLite[] {
    return provinces.flatMap((p) => p.wards);
}

/** Lấy mảng phường/xã của 1 tỉnh; nếu không tìm thấy sẽ ném Error */
export function getWardsByProvince(provinceCode: string | null): WardLite[] {
    if (!provinceCode) return [];

    const province = ensureExists(
        provinces.find((p) => p.provinceCode === provinceCode),
        `Không tìm thấy tỉnh/thành có code=${provinceCode}`
    );

    return ensureExists(
        province.wards && province.wards.length > 0
            ? province.wards
            : undefined,
        `Không tìm thấy phường/xã cho tỉnh ${province.name}`
    );
}

/** Lấy 1 phường/xã trong province; throw nếu không tìm thấy */
function getWardByName(province: Province, wardName: string): WardLite {
    return ensureExists(
        province.wards.find((w) => w.name === wardName),
        `Không tìm thấy phường/xã "${wardName}" trong tỉnh ${province.name}`
    );
}

/** Định dạng ShippingAddress thành selection object */
export function mapAddressToCode(addr: LocationBaseProps): AddressLocate {
    const province = ensureExists(
        provinces.find((p) => p.name === addr.province),
        `Không tìm thấy tỉnh/thành "${addr.province}"`
    );

    const ward = getWardByName(province, addr.ward);

    return {
        province: {
            name: province.name,
            provinceCode: province.provinceCode,
        },
        ward: {
            name: ward.name,
            wardCode: ward.wardCode,
        },
    };
}

export function calculateShippingFee(addr: LocationBaseProps | null): number {
    if (!addr) return 0;

    const { province, ward } = mapAddressToCode({
        province: addr.province,
        ward: addr.ward,
    });

    if ("26782" === ward.wardCode) return 20000;
    if ("79" === province.provinceCode) return 40000;

    const nearbyProvinces = ["75", "80", "82", "86"];
    const westernProvinces = ["91", "92", "96"];
    const centralProvinces = [
        "40",
        "42",
        "44",
        "46",
        "48",
        "51",
        "52",
        "56",
        "66",
        "68",
    ];
    const northernProvinces = [
        "01",
        "04",
        "08",
        "11",
        "12",
        "14",
        "15",
        "19",
        "20",
        "22",
        "24",
        "25",
        "31",
        "33",
        "37",
        "38",
    ];

    if (nearbyProvinces.includes(province.provinceCode)) return 60000;
    if (westernProvinces.includes(province.provinceCode)) return 80000;
    if (centralProvinces.includes(province.provinceCode)) return 100000;
    if (northernProvinces.includes(province.provinceCode)) return 120000;

    return 150000; // fallback nếu không xác định được
}
