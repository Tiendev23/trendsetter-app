import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "@/api/apiClient";
import {
    AsyncState,
    BaseResponse,
    PayOSResponse,
    ZaloPayResponse,
    Provider,
    TransactionRequest,
} from "@/types";
import { addAsyncThunkCases, makeApiThunk } from "@/utils/reduxHelper";

export const createTransaction = makeApiThunk<
    BaseResponse<PayOSResponse | ZaloPayResponse>,
    { provider: Provider; body: TransactionRequest }
>("transaction/create", ({ provider, body }) =>
    apiClient.post<BaseResponse<PayOSResponse | ZaloPayResponse>>(
        `/transactions/${provider}`,
        body
    )
);

export const cancelTransaction = makeApiThunk<
    BaseResponse<PayOSResponse | ZaloPayResponse>,
    { provider: Provider; orderId: string | number }
>("transaction/cancel", ({ provider, orderId }) =>
    apiClient.put<BaseResponse<PayOSResponse | ZaloPayResponse>>(
        `/transactions/${provider}/${orderId}`
    )
);

const initialState: AsyncState<PayOSResponse | ZaloPayResponse> = {
    data: null,
    status: "idle",
    error: null,
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
    },
    extraReducers: (builder) => {
        addAsyncThunkCases<
            PayOSResponse | ZaloPayResponse,
            PayOSResponse | ZaloPayResponse
        >(builder, createTransaction);

        addAsyncThunkCases<
            PayOSResponse | ZaloPayResponse,
            PayOSResponse | ZaloPayResponse
        >(builder, cancelTransaction);
    },
});

export const { resetTransactionState } = transactionSlice.actions;
export default transactionSlice.reducer;
