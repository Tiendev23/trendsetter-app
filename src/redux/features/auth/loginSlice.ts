import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../../api/apiClient";
import { BaseState, APIError, LoginResponse, User } from "@/types";
import { AxiosError } from "axios";
import { getItem, removeItem, saveItem } from "@/services/asyncStorage.service";
import { fetchCart, syncCart } from "../cart/cartsSlice";

type LoginDataType = {
    emailOrUsername: string;
    password: string;
};

export const login = createAsyncThunk<
    LoginResponse,
    LoginDataType,
    { rejectValue: APIError }
>("auth/login", async (body, { rejectWithValue, dispatch }) => {
    try {
        const response = await apiClient.post<LoginResponse>(
            "/auth/login",
            body
        );
        const { user, token } = response.data;
        await saveItem("@token", token);

        const storedCart = await getItem("@cart");
        if (Array.isArray(storedCart) && storedCart.length > 0) {
            const cartItems = storedCart.map((item: any) => ({
                sizeId: item.size._id,
                quantity: item.quantity,
            }));

            await dispatch(
                syncCart({ userId: user._id, body: cartItems })
            ).unwrap();
            await removeItem("@cart");
        } else {
            await dispatch(fetchCart(user._id)).unwrap();
        }

        return { user, token };
    } catch (err) {
        const error = err as AxiosError<APIError>;
        const apiError: APIError = error.response?.data || {
            message: error.message,
            code: "UNKNOWN_ERROR",
        };
        return rejectWithValue(apiError);
    }
});

const initialState: BaseState<User> = {
    data: null,
    status: "idle",
    error: null,
};

const loginSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        refresh: (state) => {
            state.data = null;
            state.status = "idle";
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = "loading";
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload.user;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = "failed";
                state.error = {
                    message: action.payload?.message || "Lỗi chưa bắt",
                    code: action.payload?.code,
                    details: action.payload?.details,
                };
            });
    },
});

export const { refresh } = loginSlice.actions;
export default loginSlice.reducer;
