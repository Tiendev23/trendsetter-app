import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../../api/apiClient";

export const changePass = createAsyncThunk(
  'users/changePass',
  async ({ newPassword }: { newPassword: string }, { rejectWithValue }) => {
    try {
      const response = await apiClient.put(`/users/changePassword`, { newPassword });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Đổi mật khẩu thất bại");
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
        state.error = action.payload || "Đã xảy ra lỗi";
      });
  },
});
export const { resetChangePass } = changePassSlice.actions;
export default changePassSlice.reducer;