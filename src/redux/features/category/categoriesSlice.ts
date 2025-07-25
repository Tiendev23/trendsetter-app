import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../../api/apiClient";
import { Category } from "../../../types/models";
type CategoryState = {
    cateList: Category[];
    cateStatus: boolean;
    cateError: string | null;
};

const initialState: CategoryState = {
    cateList: [],
    cateStatus: false,
    cateError: null,
};

// Fetch categories
export const fetchCategories = createAsyncThunk<Category[]>(
    "categories/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const res = await apiClient.get("/categories");
            return res.data;
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || "Đã xảy ra lỗi"
            );
        }
    }
);

const categorySlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.cateStatus = true;
                state.cateError = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.cateStatus = false;
                state.cateList = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.cateStatus = false;
                state.cateError = action.payload as string;
            });
    },
});
export default categorySlice.reducer;
