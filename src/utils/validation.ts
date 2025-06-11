// Kiểm tra định dạng email
export const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

/**
 * (?=.*[a-z]) → Bắt buộc có ít nhất một chữ thường (a-z)
 * (?=.*[A-Z]) → Bắt buộc có ít nhất một chữ hoa (A-Z)
 * (?=.*\d) → Bắt buộc có ít nhất một số (0-9)
 * (?=.*[!@#$%^&*]) → Bắt buộc có ít nhất một ký hiệu (!@#$%^&*)
 * [A-Za-z\d!@#$%^&*]{8,} → Tổng độ dài phải từ 8 ký tự trở lên
 */
export const validatePassword = (password: string): boolean => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return regex.test(password);
};

// Kiểm tra tên đăng nhập (không chứa ký tự đặc biệt)
export const validateUsername = (username: string): boolean => {
    const regex = /^[a-zA-Z0-9_]{3,}$/; // Tối thiểu 3 ký tự, chỉ gồm chữ cái, số, dấu gạch dưới
    return regex.test(username);
};

// Kiểm tra họ và tên (không để trống và không chứa số, ký tự đặc biệt)
export const validateFullName = (fullName: string): boolean => {
    const regex = /^[\p{L}\s]+$/u;
    return regex.test(fullName.trim());
};

