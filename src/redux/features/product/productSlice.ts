import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
} from "@reduxjs/toolkit";
import apiClient from "../../../api/apiClient";
import { BaseState, APIError, ProductDetails } from "../../../types";
import { AxiosError } from "axios";

export const fetchProductById = createAsyncThunk<
    ProductDetails, // kiểu dữ liệu khi thành công
    string, // kiểu dữ liệu truyền vào (nếu có)
    { rejectValue: APIError } // kiểu dữ liệu khi thất bại
>("product/fetchById", async (productId, { rejectWithValue }) => {
    try {
        const response = await apiClient.get(`/products/${productId}`);
        return response.data;
    } catch (err) {
        const error = err as AxiosError<{ message: string }>;
        return rejectWithValue(
            error.response?.data || { message: "Lỗi Server" + error.message }
        );
    }
});

const initialState: BaseState<ProductDetails> = {
    data: null,
    status: "idle",
    error: null,
};
// interface Product {
//     id: string;
//     name: string;
//     price: number;
//     category: Category;
//     brand?: Brand;
//     image?: string;
//     banner?: string;
//     description?: string;
//     sizes?: string[];
//     colors?: string[];
//     __v: number;
// };
// const productAdapter = createEntityAdapter<Product>();

const productSlice = createSlice({
    name: "product",
    initialState,
    // initialState: productAdapter.getInitialState({
    //     status: {},
    //     error: {},
    // }),

    reducers: {
        refresh: (state) => {
            state.data = null;
            state.status = "idle";
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductById.pending, (state, action) => {
                state.status = "loading";
                // state.status[action.meta.arg] = "loading";
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.status = "succeeded";
                // state.status[action.meta.arg] = "succeeded";
                state.data = action.payload;
                // state.data[action.meta.arg] = action.payload;
                // productAdapter.upsertOne(state, action.payload); // Lưu trữ sản phẩm vào adapter
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.status = "failed";
                // state.status[action.meta.arg] = "failed";
                state.error = action.payload;
                // state.error[action.meta.arg] = action.payload;
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
