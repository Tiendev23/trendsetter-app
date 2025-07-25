import Toast from "react-native-toast-message";

type ToastType = "success" | "error" | "info";
type Props = {
    title: string;
    message?: string;
};
/**
 * Hiển thông báo tới người dùng một cách đẹp đẽ 👀
 * @param type Loại thông báo: "success" | "error" | "info"
 * @param title Dòng tiêu đề chính
 * @param message Dòng mô tả phụ (tùy chọn)
 */
export const showErrorToast = ({ title, message }: Props) => {
    Toast.show({
        type: "error",
        text1: title,
        text2: message,
        position: "bottom",
        visibilityTime: 5000,
    });
};

export const showSuccessToast = ({ title, message }: Props) => {
    Toast.show({
        type: "success",
        text1: title,
        text2: message,
        position: "bottom",
        visibilityTime: 3000,
    });
};

export const showInfoToast = ({ title, message }: Props) => {
    Toast.show({
        type: "info",
        text1: title,
        text2: message,
        position: "bottom",
        visibilityTime: 3000,
    });
};
