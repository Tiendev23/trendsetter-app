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
//getproductbyId
export const getProductById = createAsyncThunk(
    'products/getById',
    async (id: string, { rejectWithValue }) => {
        try {
            const res = await apiClient.get(`products/${id}`);
            return res.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Lỗi lấy chi tiết sản phẩm');
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
    name: 'products',
    initialState: {
        // trang thái all product
        items: [],
        loading: "idle",
        error: null,
        // trang thái brand
        brands: [],
        brandLoading: 'idle',
        // trang thai sanphamtheodanhmuc
        productId: [],
        productByIdStatus: 'idle',
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
        builder
            .addCase(getProductById.pending, (state) => {
                state.productByIdStatus = 'loading';
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.productByIdStatus = 'succeeded';
                state.productId = action.payload;
                state.items = [action.payload]; // để reuse FlatList

            })
            .addCase(getProductById.rejected, (state, action) => {
                state.productByIdStatus = 'failed';
                state.error = action.payload;
            });
    },
});

export default productsSlice.reducer;