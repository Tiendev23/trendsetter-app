import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../../api/apiClient";
import { BaseState, Payment } from "../../../types";

export const fetchAllMethods = createAsyncThunk(
    "payments/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.get("/payments");
            return response.data;
        } catch (error) {
            console.log("paymentsSlice > error", error.response);
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

type PaymentsState = BaseState<Payment[]> & {
    selectedMethod: Payment | null;
};

const initialState: PaymentsState = {
    data: null,
    status: "idle",
    error: null,
    selectedMethod: null,
};

const paymentsSlice = createSlice({
    name: "payments",
    initialState,
    reducers: {
        refresh: (state) => {
            state.data = null;
            state.status = "idle";
            state.error = null;
        },
        setSelectedMethod: (state, action) => {
            state.selectedMethod = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllMethods.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchAllMethods.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload;
            })
            .addCase(fetchAllMethods.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Đã xảy ra lỗi chưa xác định";
            });
    },
});

export const { refresh, setSelectedMethod } = paymentsSlice.actions;
export default paymentsSlice.reducer;
