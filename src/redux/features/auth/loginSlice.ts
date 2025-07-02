import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../../api/apiClient";

export const login = createAsyncThunk(
    "user/login",
    async (body: any, { rejectWithValue }) => {
        try {
            const response = await apiClient.post("/users/login", body);

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

const loginSlice = createSlice({
    name: "auth",
    initialState: {
        data: null,
        status: "idle",
        error: null,
    },
    reducers: {
        refresh: (state) => {
            state.data = null;
            state.status = "idle";
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = "loading";
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Đã xảy ra lỗi";
            })
    },
});

export const { refresh } = loginSlice.actions;
export default loginSlice.reducer;
