export const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(value);
};

export const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Lưu ý: getMonth() từ 0 → 11
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
};

type StatusMeta = {
    label: string;
    color: string;
};
const orderStatusMap: Record<string, StatusMeta> = {
    pending: { label: "Đang xử lý", color: "#FFA500" }, 
    confirmed: { label: "Đã xác nhận", color: "#FFA500" }, 
    shipping: { label: "Đang giao", color: "#FFA500" },
    delivered: { label: "Đã giao", color: "#28A745" },
    cancelled: { label: "Đã huỷ", color: "#DC3545" }, 
};
export const formatOrderStatus = (status: string): StatusMeta => {
    return (
        orderStatusMap[status] || { label: "Không xác định", color: "#6C757D" }
    );
};
