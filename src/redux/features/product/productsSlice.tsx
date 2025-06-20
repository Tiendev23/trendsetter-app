import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from '../../../api/apiClient';

export const getAllProducts = createAsyncThunk(
    'products/getAll',
    async (_, { rejectWithValue }) => {
        try {
            const res = await apiClient.get('products');
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Lỗi gọi API');
        }
    }
);

export const getBrand = createAsyncThunk(
    'brand/getBrand',
    async (_, { rejectWithValue }) => {
        try {
            const res = await apiClient.get('brands');
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Lỗi gọi API');
        }
    }
)
const productsSlice = createSlice({
    name: 'payments',
    initialState: {
        items: [],
        loading: "idle",
        error: null,
        brands: [],
        brandLoading: 'idle',
    },
    reducers: {}, // nếu cần xử lý thêm (xóa sp, v.v.)

    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.loading = 'loading';
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.items = action.payload;
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.payload || 'Đã xảy ra lỗi';
            });
        builder
            .addCase(getBrand.pending, (state) => {
                state.brandLoading = 'loading';
            })
            .addCase(getBrand.fulfilled, (state, action) => {
                state.brandLoading = 'succeeded';
                state.brands = action.payload;
            })
            .addCase(getBrand.rejected, (state, action) => {
                state.brandLoading = 'failed';
                state.error = action.payload || 'Đã xảy ra lỗi';
            });
    },
});

export default productsSlice.reducer;