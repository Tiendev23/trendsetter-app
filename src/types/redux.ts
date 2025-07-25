type Status = "idle" | "loading" | "succeeded" | "failed";

export type BaseState<T = any> = {
    data: T | null;
    status: Status;
    error: string | any | null;
};

export type ErrorResponse = {
    message: string;
    code?: string;
    details?: any;
};
