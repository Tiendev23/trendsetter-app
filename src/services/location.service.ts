import rawData from "@/data/locations.json";
import type {
    AddressSelection,
    Province,
    ProvinceLite,
    ShippingAddress,
    Ward,
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
export function getAllWards(): Ward[] {
    return provinces.flatMap((p) => p.wards);
}

/** Lấy mảng phường/xã của 1 tỉnh; nếu không tìm thấy sẽ ném Error */
export function getWardsByProvince(provinceCode: string): Ward[] {
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
function getWardByName(province: Province, wardName: string): Ward {
    return ensureExists(
        province.wards.find((w) => w.name === wardName),
        `Không tìm thấy phường/xã "${wardName}" trong tỉnh ${province.name}`
    );
}

/** Định dạng ShippingAddress thành selection object */
export function mapAddressToSelection(addr: ShippingAddress): AddressSelection {
    const province = ensureExists(
        provinces.find((p) => p.name === addr.province),
        `Không tìm thấy tỉnh/thành "${addr.province}"`
    );

    const ward = getWardByName(province, addr.ward);

    return {
        provinceCode: province.provinceCode,
        wardCode: ward.wardCode,
    };
}