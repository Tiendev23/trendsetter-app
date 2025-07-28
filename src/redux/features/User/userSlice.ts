// redux/slices/userSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../../api/apiClient';

interface UserState {
    profile: any;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: UserState = {
    profile: null,
    status: 'idle',
    error: null,
};

export const updateProfile = createAsyncThunk(
    'user/updateProfile',
    async (
        { userId, formData }: { userId: string; formData: FormData },
        thunkAPI
    ) => {
        try {
            const response = await apiClient.patch(`/users/${userId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error: any) {
            console.log('Full error:', error);

            const fallbackMessage =
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                error?.message ||
                'Đã xảy ra lỗi không xác định';

            return thunkAPI.rejectWithValue(fallbackMessage);
        }

    }
);
// xoa user
export const deleteUser = createAsyncThunk(
    'user/deleteUser',
    async ({ userId }: { userId: string }, { rejectWithValue }) => {
        try {
            const response = await apiClient.delete(`/users/${userId}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error?.response?.data?.message || 'Xoá người dùng thất bại'
            );
        }
    }
);
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.profile = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateProfile.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                    console.log('✅ API trả về user:', action.payload); // ← Xem gender ở đây

                state.status = 'succeeded';
                state.profile = action.payload;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
