import { ShippingAddress } from "@/types/models/address";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../../api/apiClient";

type SelectedLocation = {
    city: string;
    district: string;
    ward: string;
    streetDetails: string;
};
type AddressState = {
    addressList: ShippingAddress[];
    selectedAddress: ShippingAddress | null; // dùng cho 1 địa chỉ
    loading: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
    selectedLocation: SelectedLocation | null;
};
const initialState: AddressState = {
    selectedAddress: null,
    addressList: [],
    selectedLocation: null,
    loading: "idle",
    error: null,
};

// lay danh sach dia chi
export const fetchAddress = createAsyncThunk(
    " address/fetchAddress",
    async ({ _id }: { _id: string }, { rejectWithValue }) => {
        try {
            const res = await apiClient.get(`/users/${_id}/addresses`);            
            return res.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);
// update

export const updateAddress = createAsyncThunk(
    "address/updateAddress",
    async (
        {
            userId,
            addressId,
            addressData,
        }: {
            userId: string;
            addressId: string;
            addressData: any;
        },
        { rejectWithValue }
    ) => {
        try {
            const { _id, ...cleanedAddressData } = addressData;
            const res = await apiClient.patch(
                `/users/${userId}/addresses/${addressId}`,
                cleanedAddressData
            );

            return res.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);
// xóa địa chỉ
export const deleteAddress = createAsyncThunk(
    "address/deleteAddress",
    async (
        { userId, addressId }: { userId: string; addressId: string },
        { rejectWithValue }
    ) => {
        try {
            const res = await apiClient.delete(
                `/users/${userId}/addresses/${addressId}`
            );
            return { addressId }; // Trả lại id để xóa trong store
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);
// creat
export const createAddress = createAsyncThunk(
    "address/createAddress",
    async (
        { userId, addressData }: { userId: string; addressData: any },
        { rejectWithValue }
    ) => {
        try {
            const res = await apiClient.post(
                `/users/${userId}/addresses`,
                addressData
            );
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
    reducers: {
        setSelectedLocation: (state, action) => {
            state.selectedLocation = action.payload;
        },
    },
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
            })
            //remove
            .addCase(deleteAddress.fulfilled, (state, action) => {
                state.addressList = state.addressList.filter(
                    (address) => address._id !== action.payload.addressId
                );
            })
            .addCase(deleteAddress.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});
export const { setSelectedLocation } = addressSlice.actions;

export default addressSlice.reducer;
