import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
} from "@reduxjs/toolkit";
import apiClient from "../../../api/apiClient";
// import { Brand, Category } from "../../../types";

export const fetchProductById = createAsyncThunk(
    "product/fetchById",
    async (productId: string, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(`/products/${productId}`);
            return response.data;
        } catch (error) {
            console.log(error);            
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

const initialState = {
    data: {},
    status: {},
    error: {},
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
            state.data = {};
            state.status = {};
            state.error = {};
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductById.pending, (state, action) => {
                state.status[action.meta.arg] = "loading";
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.status[action.meta.arg] = "succeeded";
                state.data[action.meta.arg] = action.payload;                
                // productAdapter.upsertOne(state, action.payload); // Lưu trữ sản phẩm vào adapter
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.status[action.meta.arg] = "failed";
                state.error[action.meta.arg] = action.payload;                
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
