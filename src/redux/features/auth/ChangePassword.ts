import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../../api/apiClient";

export const changePass = createAsyncThunk(
    'user/changePass',
    async ({ _id, body }: { _id: string; body: any }, { rejectWithValue }) => {
    try {
      const response = await apiClient.put(`/users/${_id}`, body);
      return response.data;
    } catch (error) {
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

export default changePassSlice.reducer;