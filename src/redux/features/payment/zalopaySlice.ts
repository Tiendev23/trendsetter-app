import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../../api/apiClient";
import { BaseState, ErrorResponse } from "../../../types";
import {  ZalopayCreateReq, ZalopayCreateRes } from "../../../types/payments";
import { AxiosError } from "axios";

export const createZalopayOrder = createAsyncThunk<
    ZalopayCreateRes,
    ZalopayCreateReq,
    { rejectValue: ErrorResponse }
>("payment/zalopay/create", async (body, { rejectWithValue }) => {
    try {
        const response = await apiClient.post(
            "/payments/zalopay/create-transaction",
            body
        );
        console.log("zalopaySlice > data", response.data);
        return response.data;
    } catch (err) {
        const error = err as AxiosError<{ message: string }>;
        return rejectWithValue(
            error.response?.data || { message: "Lỗi không xác định" }
        );
    }
});

const initialState: BaseState<ZalopayCreateRes> = {
    data: null,
    status: "idle",
    error: null,
};

const zalopaySlice = createSlice({
    name: "zalopayMethod",
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
            .addCase(createZalopayOrder.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createZalopayOrder.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload;
            })
            .addCase(createZalopayOrder.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export const { refresh } = zalopaySlice.actions;
export default zalopaySlice.reducer;
