import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from '../../../api/apiClient';

export const getAllProducts = createAsyncThunk(
    'products/getAll',
    async (_, { rejectWithValue }) => {
        try {
            const res = await apiClient.get('variants');
            return res.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Lỗi gọi API');
        }
    }

);
export const getAllRating = createAsyncThunk(
    'products/getRatting',
    async (_, { rejectWithValue }) => {
        try {
            const res = await apiClient.get('products');
            return res.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Lỗi gọi API sản phẩm');
        }
    }
);

export const getBrand = createAsyncThunk(
    'brand/getBrand',
    async (_, { rejectWithValue }) => {
        try {
            const res = await apiClient.get('brands');
            return res.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Lỗi gọi API');
        }
    }
)

export const getCampaigns = createAsyncThunk(
    'campaigns/getAll',
    async (_, { rejectWithValue }) => {
        try {
            const res = await apiClient.get('campaigns');
            return res.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Lỗi gọi API chiến dịch');
        }
    }
);

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
        // productbyid
        filteredItems: [],
        selectedBrand: null,
        productsRating: [],
        productsRatingLoading: 'idle',

        campaigns: [],
        campaignsLoading: 'idle',

    },
    reducers: {
        setSelectedBrand: (state, action) => {
            state.selectedBrand = action.payload;
            state.filteredItems = action.payload
                ? state.items.filter((p) => p.brand === action.payload)
                : state.items;
        }
    }, // nếu cần xử lý thêm (xóa sp, v.v.)

    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.loading = 'loading';
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.items = action.payload;
                state.filteredItems = action.payload;

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
            .addCase(getAllRating.pending, (state) => {
                state.productsRatingLoading = 'loading';
            })
            .addCase(getAllRating.fulfilled, (state, action) => {
                state.productsRatingLoading = 'succeeded';
                state.productsRating = action.payload;
            })
            .addCase(getAllRating.rejected, (state, action) => {
                state.productsRatingLoading = 'failed';
                state.error = action.payload || 'Đã xảy ra lỗi khi tải sản phẩm gốc';
            });
        builder
            .addCase(getCampaigns.pending, (state) => {
                state.campaignsLoading = 'loading';
            })
            .addCase(getCampaigns.fulfilled, (state, action) => {
                state.campaignsLoading = 'succeeded';
                state.campaigns = action.payload;
            })
            .addCase(getCampaigns.rejected, (state, action) => {
                state.campaignsLoading = 'failed';
                state.error = action.payload || 'Đã xảy ra lỗi';
            });


    },
});

export const { setSelectedBrand } = productsSlice.actions;
export default productsSlice.reducer;