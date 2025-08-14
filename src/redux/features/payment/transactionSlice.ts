import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import apiClient from "@/api/apiClient";
import {
    AsyncState,
    BaseResponse,
    Provider,
    TransactionRequest,
    TransStatus,
    ProviderData,
} from "@/types";
import { addAsyncThunkCases, makeApiThunk } from "@/utils/reduxHelper";

export const createTransaction = makeApiThunk<
    BaseResponse<ProviderData>,
    { provider: Provider; body: TransactionRequest }
>("transaction/create", ({ provider, body }) =>
    apiClient.post<BaseResponse<ProviderData>>(
        `/transactions/${provider}`,
        body
    )
);

export const cancelTransaction = makeApiThunk<
    BaseResponse<ProviderData>,
    { provider: Provider; orderId: string | number }
>("transaction/cancel", ({ provider, orderId }) =>
    apiClient.put<BaseResponse<ProviderData>>(
        `/transactions/${provider}/${orderId}`
    )
);

type TransType = AsyncState<ProviderData> & {
    transStatus: TransStatus;
};

const initialState: TransType = {
    data: null,
    status: "idle",
    error: null,
    transStatus: "pending",
};

const transactionSlice = createSlice({
    name: "transaction",
    initialState,
    reducers: {
        resetTransactionState(state) {
            state.data = null;
            state.status = "idle";
            state.error = null;
        },
        setTransStatus(state, action: PayloadAction<TransStatus>) {
            state.transStatus = action.payload;
        },
    },
    extraReducers: (builder) => {
        addAsyncThunkCases<ProviderData, ProviderData>(
            builder,
            createTransaction
        );

        addAsyncThunkCases<ProviderData, ProviderData>(
            builder,
            cancelTransaction
        );
    },
});

export const { resetTransactionState, setTransStatus } =
    transactionSlice.actions;
export default transactionSlice.reducer;
