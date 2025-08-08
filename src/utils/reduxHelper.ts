import {
    createAsyncThunk,
    AsyncThunk,
    ActionReducerMapBuilder,
    Draft,
} from "@reduxjs/toolkit";
import type { AxiosResponse, AxiosError } from "axios";
import { APIError, AsyncState, BaseResponse } from "@/types";

/**
 *  Sinh ra một Redux Thunk để gọi API, tự động xử lý try/catch và trả về dữ liệu hoặc lỗi.
 *
 *  @template ReturnedType  Kiểu dữ liệu được unwrap từ response.data
 *  @template ArgumentType  Kiểu đối số truyền vào khi dispatch thunk
 *
 *  @param typePrefix        Tiền tố của action type, ví dụ "cart/fetchCart"
 *  @param apiCall           Hàm gọi API, nhận vào ArgumentType và trả về Promise<AxiosResponse<ReturnedType>>
 *
 *  @returns AsyncThunk<ReturnedType, ArgumentType, { rejectValue: APIError }>
 *    - Khi thành công: trả về giá trị response.data kiểu ReturnedType
 *    - Khi lỗi: tự động bắt trong catch, unwrap APIError (hoặc fallback) rồi gọi rejectWithValue
 *  @example
 *  const fetchCart = makeApiThunk<BaseResponse<CartItem[]>, ObjectId>(
 *      "cart/fetchCart",
 *      (userId) => apiClient.get<BaseResponse<CartItem[]>>(`/users/${userId}/cart`)
 *  );
 */
export function makeApiThunk<ReturnedType, ArgumentType>(
    typePrefix: string,
    apiCall: (arg: ArgumentType) => Promise<AxiosResponse<ReturnedType>>
): AsyncThunk<ReturnedType, ArgumentType, { rejectValue: APIError }> {
    return createAsyncThunk<
        ReturnedType,
        ArgumentType,
        { rejectValue: APIError }
    >(typePrefix, async (arg, { rejectWithValue }) => {
        try {
            const response = await apiCall(arg);
            return response.data;
        } catch (err) {
            const axiosErr = err as AxiosError<APIError>;
            const fallback: APIError = {
                code: "UNKNOWN_ERROR",
                message: axiosErr.message,
            };
            const apiErr = axiosErr.response?.data ?? fallback;
            return rejectWithValue(apiErr);
        }
    });
}

/**
 *  Hàm tiện ích dùng để tự động thêm các `case` xử lý trạng thái của một `async thunk`
 *  vào `builder` trong Redux Toolkit (createSlice).
 *
 *  Mục đích: Giúp giảm lặp code khi xử lý các trạng thái `pending`, `fulfilled`, và `rejected`
 *  của một async thunk, đặc biệt khi nhiều slice có logic tương tự.
 *
 *  @template StateType - Kiểu dữ liệu lưu trong state (ví dụ: CartItem[]).
 *  @template ReturnedType - Kiểu dữ liệu trả về từ thunk (có thể là bản nháp hoặc null).
 *
 *  @param builder - Đối tượng ActionReducerMapBuilder dùng để thêm các case vào slice.
 *  @param thunk - Một async thunk được tạo bằng createAsyncThunk.
 *
 *  Cách hoạt động:
 *  - Khi thunk đang thực thi (`pending`), cập nhật `state.status = "loading"`.
 *  - Khi thunk thành công (`fulfilled`), cập nhật `state.status = "succeeded"` và gán dữ liệu trả về vào `state.data`.
 *  - Khi thunk thất bại (`rejected`), cập nhật `state.status = "failed"` và lưu thông tin lỗi vào `state.error`.
 *
 *  @example
 *  extraReducers: (builder) => {
 *      addAsyncThunkCases<CartItem[], CartItem[]>(
 *          builder,
 *          fetchCart
 *      );
 *  },
 */
export function addAsyncThunkCases<
    StateType,
    ReturnedType extends Draft<StateType>,
>(
    builder: ActionReducerMapBuilder<AsyncState<StateType>>,
    thunk: AsyncThunk<
        BaseResponse<ReturnedType>,
        any,
        { rejectValue: APIError }
    >
) {
    builder
        .addCase(thunk.pending, (state) => {
            state.status = "loading";
            state.error = null;
        })
        .addCase(thunk.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data = {
                data: action.payload.data,
                message: action.payload.message
            };
        })
        .addCase(thunk.rejected, (state, action) => {
            state.status = "failed";
            state.error = {
                message: action.payload?.message || "Lỗi Server",
                code: action.payload?.code,
                details: action.payload?.details,
            };
        });
}
