// Định nghĩa kiểu dữ liệu cho User
export type User = {
    _id: string;
    fullName: string;
    username: string;
    email: string;
    favorites?: string[];
    password?: string;
    role?: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
};
