import { createSlice, createAsyncThunk, } from "@reduxjs/toolkit";
import apiClient from "../../../api/apiClient";

export const sendEmail = createAsyncThunk(
    'sendEmail/sendEmail',
    async (email: string, { rejectWithValue }) => {
        try {
            const res = await apiClient.post('/email', { to: email });
            return res.data;
        } catch (error: any) {
            return rejectWithValue(error.res?.data?.message || "gửi email thất bại!")
        }
    }
);
export const verifyOtp = createAsyncThunk(
    'verifyOtp/verifyOtp',
    async (data: { email: string; otp: string }, { rejectWithValue }) => {
        try {
            const res = await apiClient.post('/email/verifyOtp', data);
            return res.data; // có thể chứa token hoặc message
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
                state.error = action.payload || 'Gui email thanh cong!'
            })
            .addCase(sendEmail.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.payload || 'Gui email that bai!'
            })

            
        builder
            .addCase(verifyOtp.pending, (state) => {
                state.loading = 'loading';
            })
            .addCase(verifyOtp.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.error = null;
                state.data = action.payload;
            })
            .addCase(verifyOtp.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.payload as string;
            });
    },
});



export default sendEmailSlice.reducer;