import { BaseResponse, AsyncState } from "@/types/redux";
import { createSlice } from "@reduxjs/toolkit";
import apiClient from "@/api/apiClient";
import { addAsyncThunkCases, makeApiThunk } from "@/utils/reduxHelper";
import { ObjectId, Order } from "@/types";

export const cancelOrder = makeApiThunk<BaseResponse<undefined>, ObjectId>(
    "order/cancel",
    (orderId) =>
        apiClient.patch<BaseResponse<undefined>>(`/orders/${orderId}/cancel`)
);

export const fetchOrderById = makeApiThunk<BaseResponse<Order>, ObjectId>(
    "order/fetchById",
    (orderId) => apiClient.get<BaseResponse<Order>>(`/orders/${orderId}`)
);

const initialState: AsyncState<Order> = {
    data: null,
    status: "idle",
    error: null,
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        refreshOrderState: (state) => {
            state.data = null;
            state.status = "idle";
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // CANCEL
        addAsyncThunkCases<Order | undefined, undefined>(builder, cancelOrder);
        // FETCH_ORDER
        addAsyncThunkCases<Order | undefined, Order>(builder, fetchOrderById);
    },
});

export const { refreshOrderState } = orderSlice.actions;
export default orderSlice.reducer;
