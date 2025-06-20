import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../../api/apiClient";
import { CreateRequestRes, CreateRequestReq } from "../../../types";

export const createPayOSPayment = createAsyncThunk<
    CreateRequestRes,
    CreateRequestReq
>("payment/createPayOS", async (body, { rejectWithValue }) => {
    try {
        const response = await apiClient.post("/payments/payos-method", body);
        console.log("response.data:", response.data);

        return response.data;
    } catch (error) {
        console.log("error", error.response);
        return rejectWithValue(error.response?.data?.message);
    }
});

const payOSSlice = createSlice({
    name: "payOSMethod",
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
            .addCase(createPayOSPayment.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createPayOSPayment.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload.data.checkoutUrl;
            })
            .addCase(createPayOSPayment.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export const { refresh } = payOSSlice.actions;
export default payOSSlice.reducer;
