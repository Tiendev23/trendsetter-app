import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveItem = async (key: string, value: any) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        console.error(`Lỗi khi lưu item key ${key} | ${value}:`, e);
    }
};

export const getItem = async (key: string) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.error(`Lỗi khi lấy item key ${key}:`, e);
        return null;
    }
};

export const removeItem = async (key: string) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (e) {
        console.error("Lỗi khi xóa item khỏi storage:", e);
    }
};
