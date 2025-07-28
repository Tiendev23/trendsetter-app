import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "@/api/apiClient";
import { BaseState, APIError, ObjectId, Review } from "@/types";
import { AxiosError } from "axios";

export const fetchReviewsByProductId = createAsyncThunk<
    Review[], // kiểu dữ liệu khi thành công
    ObjectId, // kiểu dữ liệu truyền vào (nếu có)
    { rejectValue: APIError } // kiểu dữ liệu khi thất bại
>("reviews/fetchByProduct", async (productId, { rejectWithValue }) => {
    try {
        const response = await apiClient.get(`/products/${productId}/reviews`);
        return response.data;
    } catch (err) {
        const error = err as AxiosError<{ message: string }>;
        return rejectWithValue(
            error.response?.data || { message: "Lỗi Server" + error.message }
        );
    }
});

const initialState: BaseState<Review[]> = {
    data: [],
    status: "idle",
    error: null,
};

const productSlice = createSlice({
    name: "reviews",
    initialState,

    reducers: {
        refresh: (state) => {
            state.data = [];
            state.status = "idle";
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchReviewsByProductId.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchReviewsByProductId.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload;
            })
            .addCase(fetchReviewsByProductId.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export const { refresh } = productSlice.actions;
// Truy xuất dữ liệu dễ dàng
// export const { selectById } = productAdapter.getSelectors(
//     (state: { product: ReturnType<typeof productSlice.reducer> }) =>
//         state.product
// );
export default productSlice.reducer;
