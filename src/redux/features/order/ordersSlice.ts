import { BaseResponse, AsyncState } from "@/types/redux";
import { createSlice } from "@reduxjs/toolkit";
import apiClient from "@/api/apiClient";
import { OrderPreview } from "@/types/models";
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
export const fetchUserOrders = makeApiThunk<
    BaseResponse<OrderPreview[]>,
    ObjectId
>("order/fetchAll", (userId) =>
    apiClient.get<BaseResponse<OrderPreview[]>>(`/users/${userId}/orders`)
);

const initialState: AsyncState<OrderPreview[]> = {
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
        addAsyncThunkCases<OrderPreview[], OrderPreview[]>(
            builder,
            fetchUserOrders
        );
    },
});

export const { refreshOrdersState } = ordersSlice.actions;
export default ordersSlice.reducer;
