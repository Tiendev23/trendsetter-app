import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../../api/apiClient";
import { Payment } from "../../../types";

export const getAllPaymentMethods = createAsyncThunk(
    "payments/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.get("/payments");
            return response.data;
        } catch (error) {
            console.log("payments/getAll error", error.response);
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

const paymentsSlice = createSlice({
    name: "payments",
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
            .addCase(getAllPaymentMethods.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getAllPaymentMethods.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload;
            })
            .addCase(getAllPaymentMethods.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Đã xảy ra lỗi chưa xác định";
            });
    },
});

export const { refresh } = paymentsSlice.actions;
export default paymentsSlice.reducer;
