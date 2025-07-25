import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../../api/apiClient";
import {
    CreateOrderReq,
    BaseState,
    PayosCreateRes,
} from "../../../types/models";

export const createPayosOrder = createAsyncThunk<
    PayosCreateRes,
    CreateOrderReq
>("payment/payos/create", async (body, { rejectWithValue }) => {
    try {
        const response = await apiClient.post(
            "/payments/payos/create-transaction",
            body
        );
        console.log("response.data:", response.data);
        return response.data;
    } catch (error) {
        console.log("payosSlice > error", error.response);
        return rejectWithValue(error.response?.data?.message);
    }
});

const initialState: BaseState<PayosCreateRes> = {
    data: null,
    status: "idle",
    error: null,
};

const payosSlice = createSlice({
    name: "payosMethod",
    initialState,
    reducers: {
        refresh: (state) => {
            state.data = null;
            state.status = "idle";
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createPayosOrder.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createPayosOrder.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload;
            })
            .addCase(createPayosOrder.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export const { refresh } = payosSlice.actions;
export default payosSlice.reducer;
