import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Account {
    email: string;
    password: string;
}

export const login = createAsyncThunk('account/login', async ({ email, password }: Account, { rejectWithValue }) => {
    try {
        const response = await apiClient.post('/users/login', { email, password });
        console.log('response.data:', response.data);

        await AsyncStorage.setItem('token', response.data.token);
        return response.data.user;
    } catch (error) {
        console.log('error', error);
        return rejectWithValue(error.message);
    }
});

const userSlice = createSlice({
    name: 'userActions',
    initialState: {
        user: null,
        status: 'idle',
        error: null
    },
    reducers: {
        logout: (state) => {
            AsyncStorage.removeItem('token'); // Xóa token khi logout
            state.user = null;
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
                state.user = action.payload;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Đã xảy ra lỗi';
            });
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;