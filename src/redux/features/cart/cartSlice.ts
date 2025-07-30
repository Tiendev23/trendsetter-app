import { createSlice } from "@reduxjs/toolkit";
import apiClient from "@/api/apiClient";
import {
    BaseItemProps,
    AsyncState,
    CartItemDB,
    CartItemLite,
    ObjectId,
    BaseResponse,
} from "@/types";
import { addAsyncThunkCases, makeApiThunk } from "@/utils/reduxHelpers";

export const addCartItem = makeApiThunk<
    BaseResponse<CartItemDB>,
    { userId: ObjectId; body: CartItemLite }
>("cart/addItem", ({ userId, body }) =>
    apiClient.post<BaseResponse<CartItemDB>>(`/users/${userId}/cart`, body)
);

export const updateCartItem = makeApiThunk<
    BaseResponse<CartItemDB>,
    { userId: ObjectId; sizeId: ObjectId; body: BaseItemProps }
>("cart/updateItem", ({ userId, sizeId, body }) =>
    apiClient.patch<BaseResponse<CartItemDB>>(
        `/users/${userId}/cart/${sizeId}`,
        body
    )
);

export const removeCartItem = makeApiThunk<
    BaseResponse<CartItemDB>,
    { userId: ObjectId; sizeId: ObjectId }
>("cart/removeItem", ({ userId, sizeId }) =>
    apiClient.delete<BaseResponse<CartItemDB>>(
        `/users/${userId}/cart/${sizeId}`
    )
);

type StateType = CartItemDB;
const initialState: AsyncState<StateType> = {
    data: null,
    status: "idle",
    error: null,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        resetCartState(state) {
            state.data = null;
            state.status = "idle";
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // ADD_ITEM
        addAsyncThunkCases<StateType, CartItemDB>(builder, addCartItem);
        // UPDATE_ITEM
        addAsyncThunkCases<StateType, CartItemDB>(builder, updateCartItem);
        // REMOVE_ITEM
        addAsyncThunkCases<StateType, CartItemDB>(builder, removeCartItem);
    },
});

export const { resetCartState } = cartSlice.actions;
export default cartSlice.reducer;
