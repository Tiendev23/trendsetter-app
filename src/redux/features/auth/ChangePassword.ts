import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../../api/apiClient";

//  đổi mật khẩu khi đăng nhập
export const changePass = createAsyncThunk(
  'users/changePass',
  async (
    { currentPassword, newPassword }: { currentPassword: string; newPassword: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiClient.patch(`/auth/password`, { currentPassword, newPassword });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Đổi mật khẩu thất bại");
    }
  }
);

//  đặt lại mật khẩu khi quên mật khẩu (reset-password)
export const resetChangePassword = createAsyncThunk(
  'users/resetChangePass',
  async (newPassword: string, { rejectWithValue }) => {
    try {
      const res = await apiClient.patch(`/auth/reset-password`, { newPassword });
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Đặt lại mật khẩu thất bại");
    }
  }
);

const changePassSlice = createSlice({
  name: "changePass",
  initialState: {
    data: null as any,
    status: "idle" as "idle" | "loading" | "succeeded" | "failed",
    error: null as string | null,
  },
  reducers: {
    resetChangePass: (state) => {
      state.data = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // changePass
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
        state.error = action.payload as string;
      });

    // resetChangePassword
    builder
      .addCase(resetChangePassword.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetChangePassword.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(resetChangePassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { resetChangePass } = changePassSlice.actions;
export default changePassSlice.reducer;
