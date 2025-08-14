import { saveItem } from '@/services/asyncStorage.service';
import { createSlice, createAsyncThunk, } from "@reduxjs/toolkit";
import apiClient from "../../../api/apiClient";
import * as Storage from "@/services/asyncStorage.service";
import { KEY } from '@/constants';

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
            })
            .addCase(sendEmail.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.payload as any;
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
                    Storage.saveItem(KEY.TOKEN, token);                    
                }
            })
            .addCase(verifyOtp.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.payload as any;
            });
    },
});



export default sendEmailSlice.reducer;