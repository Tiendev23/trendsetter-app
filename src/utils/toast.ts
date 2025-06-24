import Toast from "react-native-toast-message";

/**
 * Hiển thị lỗi người dùng một cách đẹp đẽ 👀
 * @param title Dòng tiêu đề chính
 * @param message Dòng mô tả phụ (tùy chọn)
 */
export const showErrorToast = (title: string, message?: string) => {
    Toast.show({
        type: "error",
        text1: title,
        text2: message,
        position: "bottom",
        visibilityTime: 4000,
    });
};
