import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "@/api/apiClient";
import {
    AsyncState,
    CartItem,
    CartItemLite,
    ObjectId,
    BaseResponse,
} from "@/types";
import { addAsyncThunkCases, makeApiThunk } from "@/utils/reduxHelper";

// export const fetchCart = createAsyncThunk<
//     BaseResponse<CartItem[]>,
//     ObjectId,
//     { rejectValue: APIError }
// >("cart/fetchCart", async (userId, { rejectWithValue }) => {
//     try {
//         const response = await apiClient.get<BaseResponse<CartItem[]>>(
//             `/users/${userId}/cart`
//         );
//         return response.data;
//     } catch (err) {
//         const error = err as AxiosError<APIError>;
//         const apiError: APIError = error.response?.data || {
//             message: error.message,
//             code: "UNKNOWN_ERROR",
//         };

//         return rejectWithValue(apiError);
//     }
// });
export const fetchCart = makeApiThunk<BaseResponse<CartItem[]>, ObjectId>(
    "cart/fetchCart",
    (userId) => apiClient.get<BaseResponse<CartItem[]>>(`/users/${userId}/cart`)
);

export const removeManyCartItem = makeApiThunk<
    BaseResponse<CartItem[]>,
    { userId: ObjectId; body: ObjectId[] }
>("cart/removeMany", ({ userId, body }) =>
    apiClient.delete<BaseResponse<CartItem[]>>(
        `/users/${userId}/cart/remove-many`,
        {
            data: body,
        }
    )
);

export const clearCart = makeApiThunk<BaseResponse<CartItem[]>, ObjectId>(
    "cart/clear",
    (userId) =>
        apiClient.delete<BaseResponse<CartItem[]>>(`/users/${userId}/cart`)
);

export const syncCart = makeApiThunk<
    BaseResponse<CartItem[]>,
    { userId: ObjectId; body: CartItemLite[] }
>("cart/syncCart", ({ userId, body }) =>
    apiClient.post<BaseResponse<CartItem[]>>(`/users/${userId}/cart/sync`, body)
);

const initialState: AsyncState<CartItem[]> = {
    data: null,
    status: "idle",
    error: null,
};

const cartsSlice = createSlice({
    name: "carts",
    initialState,
    reducers: {
        resetCartsState(state) {
            state.data = null;
            state.status = "idle";
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // FETCH_ITEM
        addAsyncThunkCases<CartItem[], CartItem[]>(builder, fetchCart);
        // REMOVE_MANY
        addAsyncThunkCases<CartItem[], CartItem[]>(builder, removeManyCartItem);
        // CLEAR_CART
        addAsyncThunkCases<CartItem[], CartItem[]>(builder, clearCart);
        // SYNC_CART
        addAsyncThunkCases<CartItem[], CartItem[]>(builder, syncCart);
    },
});

export const { resetCartsState } = cartsSlice.actions;
export default cartsSlice.reducer;
