import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import apiClient from "@/api/apiClient";
import { ProductVariant } from "@/types/Products/productVariant";


export const getFavorites = createAsyncThunk(
    'favorites/getFavorites',
    async ({ _id }: { _id: string }, { rejectWithValue }) => {
        try {
            const res = await apiClient.get(`users/${_id}/favorites`);
            return res.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const addFavorite = createAsyncThunk(
    'favorites/addFavorite',
    async ({ _id, variantId }: { _id: string, variantId: string }, { rejectWithValue }) => {
        try {
            const res = await apiClient.post(`users/${_id}/favorites`, { variantId });
            return res.data;
        } catch (err: any) {
            return rejectWithValue(err.response.data.message);
        }
    }
);

export const removeFavorite = createAsyncThunk(
    'favorites/removeFavorite',
    async ({ _id, variantId }: { _id: string, variantId: string }, { rejectWithValue }) => {
        try {
            await apiClient.delete(`users/${_id}/favorites/${variantId}`);
            return variantId;
        } catch (err: any) {
            return rejectWithValue(err.response.data.message);
        }
    }
);


type FavoritesSliceState = {
    favorites: ProductVariant[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: FavoritesSliceState = {
    favorites: [],
    status: 'idle',
    error: null,
}


const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: initialState,
    //   đồng bộ để cập nhật UI ngay lập tức
    reducers: {
        optimisticAddFavorite(state, action: PayloadAction<ProductVariant>) {
            // Thêm item vào state để UI cập nhật ngay
            // Đảm bảo không thêm trùng lặp
            if (!state.favorites.some(f => f._id === action.payload._id)) {
                state.favorites.push(action.payload);
            }
        },
        optimisticRemoveFavorite(state, action: PayloadAction<{ variantId: string }>) {
            // Xóa item khỏi state để UI cập nhật ngay
            state.favorites = state.favorites.filter(f => f._id !== action.payload.variantId);
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getFavorites.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getFavorites.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.favorites = action.payload.data;
            })
            .addCase(getFavorites.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(addFavorite.rejected, (state, action) => {
                console.error("Rollback: Failed to add favorite", action.error);
                const { variantId } = action.meta.arg;
                state.favorites = state.favorites.filter(v => v._id !== variantId);
            })
            .addCase(removeFavorite.rejected, (state, action) => {
                console.error("Rollback: Failed to remove favorite", action.error);
            });
    },
});

// Export các action mới
export const { optimisticAddFavorite, optimisticRemoveFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;