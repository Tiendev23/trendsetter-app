import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../../api/apiClient";
import { OrderBody } from "../../../types";

export const createOrder = createAsyncThunk(
    "order/create",
    async (body: OrderBody, { rejectWithValue }) => {
        try {
            const response = await apiClient.post("/orders", body);
            console.log("response.data:", response.data);

            return response.data;
        } catch (error) {
            console.log("error", error);
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

const orderSlice = createSlice({
    name: "orders",
    initialState: {
        data: null,
        status: "idle",
        error: null,
    },
    reducers: {
        refresh: (state) => {
            state.data = null;
            state.status = "idle";
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Đã xảy ra lỗi";
            });
    },
});

export const { refresh } = orderSlice.actions;
export default orderSlice.reducer;
