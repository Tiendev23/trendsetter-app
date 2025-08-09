import { BaseResponse, AsyncState } from "@/types/redux";
import { createSlice } from "@reduxjs/toolkit";
import apiClient from "@/api/apiClient";
import { Order } from "@/types/models";
import { addAsyncThunkCases, makeApiThunk } from "@/utils/reduxHelper";
import { ObjectId } from "@/types";

// export const fetchOrdersByUser = createAsyncThunk<
//     Order[], // kiểu dữ liệu khi thành công
//     string, // kiểu dữ liệu truyền vào (nếu có)
//     { rejectValue: APIError } // kiểu dữ liệu khi thất bại
// >("order/fetchByUser", async (userId, { rejectWithValue }) => {
//     try {
//         const response = await apiClient.get(`/orders/user/${userId}`);
//         // console.log("ordersSlice > response", response);
//         return response.data;
//     } catch (err) {
//         const error = err as AxiosError<{ message: string }>;
//         return rejectWithValue(
//             error.response?.data || { message: "Lỗi không xác định" }
//         );
//     }
// });
export const fetchOrdersByUser = makeApiThunk<BaseResponse<Order[]>, ObjectId>(
    "order/fetchByUser",
    (userId) => apiClient.get<BaseResponse<Order[]>>(`/users/${userId}/orders`)
);

const initialState: AsyncState<Order[]> = {
    data: null,
    status: "idle",
    error: null,
};

const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        refreshOrdersState: (state) => {
            state.data = null;
            state.status = "idle";
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        addAsyncThunkCases<Order[], Order[]>(builder, fetchOrdersByUser);
    },
});

export const { refreshOrdersState } = ordersSlice.actions;
export default ordersSlice.reducer;
