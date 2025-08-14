import { BaseResponse, AsyncState } from "@/types/redux";
import { createSlice } from "@reduxjs/toolkit";
import apiClient from "@/api/apiClient";
import { addAsyncThunkCases, makeApiThunk } from "@/utils/reduxHelper";
import { ObjectId } from "@/types";

export const cancelOrder = makeApiThunk<BaseResponse<undefined>, ObjectId>(
    "order/cancel",
    (orderId) =>
        apiClient.patch<BaseResponse<undefined>>(`/orders/${orderId}/cancel`)
);

const initialState: AsyncState<undefined> = {
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
        addAsyncThunkCases<undefined, undefined>(builder, cancelOrder);
    },
});

export const { refreshOrderState } = orderSlice.actions;
export default orderSlice.reducer;
