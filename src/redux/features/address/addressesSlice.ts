import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import apiClient from "@/api/apiClient";
import {
    AsyncState,
    ShippingAddress,
    ObjectId,
    BaseResponse,
    BaseAddressProps,
    AddressSelection,
} from "@/types";
import { addAsyncThunkCases, makeApiThunk } from "@/utils/reduxHelper";

export const fetchAllAddresses = makeApiThunk<
    BaseResponse<ShippingAddress[]>,
    ObjectId
>("address/fetchAll", (userId) =>
    apiClient.get<BaseResponse<ShippingAddress[]>>(`/users/${userId}/addresses`)
);

export const addShippingAddress = makeApiThunk<
    BaseResponse<ShippingAddress[]>,
    { userId: ObjectId; body: BaseAddressProps }
>("address/create", ({ userId, body }) =>
    apiClient.post<BaseResponse<ShippingAddress[]>>(
        `/users/${userId}/addresses`,
        body
    )
);

export const updateShippingAddress = makeApiThunk<
    BaseResponse<ShippingAddress[]>,
    { userId: ObjectId; addressId: ObjectId; body: BaseAddressProps }
>("address/update", ({ userId, addressId, body }) =>
    apiClient.patch<BaseResponse<ShippingAddress[]>>(
        `/users/${userId}/addresses/${addressId}`,
        body
    )
);

export const deleteShippingAddress = makeApiThunk<
    BaseResponse<ShippingAddress[]>,
    { userId: ObjectId; addressId: ObjectId }
>("address/delete", ({ userId, addressId }) =>
    apiClient.delete<BaseResponse<ShippingAddress[]>>(
        `/users/${userId}/addresses/${addressId}`
    )
);
type AddressState = AsyncState<ShippingAddress[]> & {
    address: AddressSelection | null;
};
const initialState: AddressState = {
    address: null,
    data: null,
    status: "idle",
    error: null,
};

const addressesSlice = createSlice({
    name: "addresses",
    initialState,
    reducers: {
        resetAddressesState(state) {
            state.data = null;
            state.status = "idle";
            state.error = null;
        },
        setSelectedAddress: (
            state,
            action: PayloadAction<AddressSelection | null>
        ) => {
            state.address = action.payload;
        },
    },
    extraReducers: (builder) => {
        // FETCH_ALL
        addAsyncThunkCases<ShippingAddress[], ShippingAddress[]>(
            builder,
            fetchAllAddresses
        );
        // ADD_ADDRESS
        addAsyncThunkCases<ShippingAddress[], ShippingAddress[]>(
            builder,
            addShippingAddress
        );
        // UPDATE_ADDRESS
        addAsyncThunkCases<ShippingAddress[], ShippingAddress[]>(
            builder,
            updateShippingAddress
        );
        // DELETE_ADDRESS
        addAsyncThunkCases<ShippingAddress[], ShippingAddress[]>(
            builder,
            deleteShippingAddress
        );
    },
});

export const { resetAddressesState, setSelectedAddress } =
    addressesSlice.actions;
export default addressesSlice.reducer;
