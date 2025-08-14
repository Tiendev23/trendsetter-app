import { createSlice } from "@reduxjs/toolkit";
import apiClient from "@/api/apiClient";
import { ObjectId, ReviewDB, AsyncState, BaseResponse } from "@/types";
import { addAsyncThunkCases, makeApiThunk } from "@/utils/reduxHelper";

export const createReview = makeApiThunk<
    BaseResponse<ReviewDB>,
    { productId: ObjectId; body: FormData }
>("review/create", ({ productId, body }) =>
    apiClient.post<BaseResponse<ReviewDB>>(
        `/products/${productId}/reviews`,
        body
    )
);

const initialState: AsyncState<ReviewDB> = {
    data: null,
    status: "idle",
    error: null,
};

const reviewSlice = createSlice({
    name: "review",
    initialState,
    reducers: {
        refreshReviewState: (state) => {
            state.data = null;
            state.status = "idle";
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        addAsyncThunkCases<ReviewDB, ReviewDB>(builder, createReview);
    },
});

export const { refreshReviewState } = reviewSlice.actions;
export default reviewSlice.reducer;
