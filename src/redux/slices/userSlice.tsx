import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = createAsyncThunk('account/login', async (body: any, { rejectWithValue }) => {
    try {
        const response = await apiClient.post('/users/login', body);
        console.log('response.data:', response.data);

        await AsyncStorage.setItem('token', response.data.token);
        return response.data.user;
    } catch (error) {
        console.log('error', error);
        return rejectWithValue(error.response.data.message);
    }
});

export const register = createAsyncThunk('account/register', async (body: any, { rejectWithValue }) => {
    try {
        const response = await apiClient.post('/users', body);
        console.log('response.data:', response.data);

        return response.data;
    } catch (error) {
        console.log('error', error);
        return rejectWithValue(error.response.data.message);
    }
})

const userSlice = createSlice({
    name: 'userActions',
    initialState: {
        data: null,
        status: 'idle',
        error: null
    },
    reducers: {
        refresh: (state) => {
            state.data = null;
            state.status = 'idle';
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';                
                state.error = action.payload || 'Đã xảy ra lỗi';
            })

            .addCase(register.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(register.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Đã xảy ra lỗi';
            });
    },
});

export const { refresh } = userSlice.actions;
export default userSlice.reducer;