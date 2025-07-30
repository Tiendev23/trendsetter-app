import { createSlice } from "@reduxjs/toolkit";
import apiClient from "@/api/apiClient";
import {
    ObjectId,
    Review,
    AsyncState,
    BaseResponse,
} from "@/types";
import { addAsyncThunkCases, makeApiThunk } from "@/utils/reduxHelpers";

export const fetchReviewsByProductId = makeApiThunk<
    BaseResponse<Review[]>,
    ObjectId
>("reviews/fetchByProduct", (productId) =>
    apiClient.get<BaseResponse<Review[]>>(`/products/${productId}/reviews`)
);

const initialState: AsyncState<Review[]> = {
    data: null,
    status: "idle",
    error: null,
};

const reviewsSlice = createSlice({
    name: "reviews",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        addAsyncThunkCases<Review[], Review[]>(
            builder,
            fetchReviewsByProductId
        );
    },
});

export default reviewsSlice.reducer;
