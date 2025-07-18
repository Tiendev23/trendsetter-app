import { createSlice, createAsyncThunk, } from "@reduxjs/toolkit";
import apiClient from "../../../api/apiClient";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const sendEmail = createAsyncThunk(
    'sendEmail/sendEmail',
    async (email: string, { rejectWithValue }) => {
        try {
            const res = await apiClient.post('/auth/forgot-password', { to: email });
            return res.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Gửi email thất bại!");


        }
    }
);
export const verifyOtp = createAsyncThunk(
    'verifyOtp/verifyOtp',
    async (data: { email: string; otp: string }, { rejectWithValue }) => {
        try {
            const res = await apiClient.post('/auth/verify-otp', data);
            return res.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Xác thực OTP thất bại!");
        }
    }
);


const initialState = {
    loading: 'idle',
    error: null,
    data: []
};

export const sendEmailSlice = createSlice({
    name: 'name',
    initialState,
    reducers: {

    },

    extraReducers(builder) {
        builder
            .addCase(sendEmail.pending, (state) => {
                state.loading = 'loading';
            })
            .addCase(sendEmail.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.error = action.payload
            })
            .addCase(sendEmail.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.payload
            })


        builder
            .addCase(verifyOtp.pending, (state) => {
                state.loading = 'loading';
            })
            .addCase(verifyOtp.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.error = null;
                state.data = action.payload;
                const token = action.payload?.token;
                if (token) {
                    AsyncStorage.setItem("token", token);
                }
            })
            .addCase(verifyOtp.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.payload as string;
            });
    },
});



export default sendEmailSlice.reducer;