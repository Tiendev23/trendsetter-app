import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../../api/apiClient";
import { Addresses } from "../../../types/models";

type AddressState = {
    addressList: Addresses[];
    selectedAddress: Addresses | null; // dùng cho 1 địa chỉ
    loading: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
};
const initialState: AddressState = {
    selectedAddress: null,
    addressList: [],
    loading: "idle",
    error: null,
};

//
export const fetchAddress = createAsyncThunk(
    " address/fetchAddress",
    async (
        { _id, addressId }: { _id: string; addressId?: string },
        { rejectWithValue }
    ) => {
        try {
            const res = await apiClient.get(`/users/${_id}/addresses`, {
                params: addressId ? { addressId } : {},
            });
            return res.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

//
const addressSlice = createSlice({
    name: "address",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchAddress.pending, (state) => {
                state.loading = "loading";
            })
            .addCase(fetchAddress.fulfilled, (state, action) => {
                state.loading = "succeeded";
                // Nếu payload là mảng lưu vào addressList
                if (Array.isArray(action.payload)) {
                    state.addressList = action.payload;
                    state.selectedAddress = null;
                } else {
                    // Nếu là 1 object lưu vào selectedAddress
                    state.selectedAddress = action.payload;
                }
            })
            .addCase(fetchAddress.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.payload as string;
            });
    },
});
export default addressSlice.reducer;
