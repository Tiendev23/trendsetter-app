import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../../api/apiClient";

export const changePass = createAsyncThunk(
  'users/changePass',
  async ({ currentPassword, newPassword }: { currentPassword: string, newPassword: string }, { rejectWithValue }) => {
    try {
      const response = await apiClient.patch(`/auth/password`, { currentPassword, newPassword });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);
export const resetChangePassword = createAsyncThunk(
  'users/resetChangePass',
  async (newPassword:string, { rejectWithValue }) => {
    try {
      const res = await apiClient.patch(`auth/reset-password`, { newPassword });
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);
const changePassSlice = createSlice({
  name: "changePass",
  initialState: {
    data: null,
    status: "idle",
    error: null,
  },
  reducers: {
    resetChangePass: (state) => {
      state.data = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(changePass.pending, (state) => {
        state.status = "loading";
      })
      .addCase(changePass.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;

      })
      .addCase(changePass.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});
export const { resetChangePass } = changePassSlice.actions;
export default changePassSlice.reducer;