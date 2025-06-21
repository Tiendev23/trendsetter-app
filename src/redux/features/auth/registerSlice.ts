import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../../api/apiClient";

export const register = createAsyncThunk(
    "user/register",
    async (body: any, { rejectWithValue }) => {
        try {
            const response = await apiClient.post("/users", body);
            console.log("response.data:", response.data);

            return response.data;
        } catch (error) {
            console.log("error", error);
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

const registerSlice = createSlice({
    name: "register",
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
            .addCase(register.pending, (state) => {
                state.status = "loading";
            })
            .addCase(register.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Đã xảy ra lỗi";
            });
    },
});

export const { refresh } = registerSlice.actions;
export default registerSlice.reducer;
