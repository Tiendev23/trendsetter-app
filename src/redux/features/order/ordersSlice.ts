import { BaseState, APIError } from "../../../types/redux";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../../api/apiClient";
import { AxiosError } from "axios";
import { Order } from "../../../types/models";

export const fetchOrdersByUser = createAsyncThunk<
    Order[], // kiểu dữ liệu khi thành công
    string, // kiểu dữ liệu truyền vào (nếu có)
    { rejectValue: APIError } // kiểu dữ liệu khi thất bại
>("order/fetchByUser", async (userId, { rejectWithValue }) => {
    try {
        const response = await apiClient.get(`/orders/user/${userId}`);
        // console.log("ordersSlice > response", response);
        return response.data;
    } catch (err) {
        const error = err as AxiosError<{ message: string }>;
        return rejectWithValue(
            error.response?.data || { message: "Lỗi không xác định" }
        );
    }
});

const initialState: BaseState<Order[]> = {
    data: [],
    status: "idle",
    error: null,
};

const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        refresh: (state) => {
            state.data = [];
            state.status = "idle";
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrdersByUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchOrdersByUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload;
            })
            .addCase(fetchOrdersByUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload.message;
            });
    },
});

export const { refresh } = ordersSlice.actions;
export default ordersSlice.reducer;
