export type reduxInitState<T = any> = {
    data: T | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | any | null;
};

export type ErrorResponse = {
    message: string;
    code?: string;
    details?: any;
};

export type useStateTuple<T> = [T, React.Dispatch<React.SetStateAction<T>>];
