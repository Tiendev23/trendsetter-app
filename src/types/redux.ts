import { User } from "./models";
export type Status = "idle" | "loading" | "succeeded" | "failed";

export type APIError = {
    message: string;
    code?: string;
    details?: any;
};

export type BaseState<T> = {
    data: T | null;
    status: Status;
    error: APIError | null;
};

export type BaseResponse<T> = {
    data?: T;
    message?: string;
};

// Mở rộng từ BaseState
export type AsyncState<T> = Omit<BaseState<T>, "data"> & {
    data: BaseResponse<T> | null;
};

export type LoginResponse = {
    user: User;
    token: string;
};
