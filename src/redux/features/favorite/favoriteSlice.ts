import { createSlice } from "@reduxjs/toolkit";
import apiClient from "@/api/apiClient";
import { AsyncState, ObjectId, BaseResponse } from "@/types";
import { addAsyncThunkCases, makeApiThunk } from "@/utils/reduxHelper";

export const addFavItem = makeApiThunk<
    BaseResponse<undefined>,
    { userId: ObjectId; body: { variantId: ObjectId } }
>("favorites/addItem", ({ userId, body }) =>
    apiClient.post<BaseResponse<undefined>>(`/users/${userId}/favorites`, body)
);

export const removeFavItem = makeApiThunk<
    BaseResponse<undefined>,
    { userId: ObjectId; variantId: ObjectId }
>("favorites/removeItem", ({ userId, variantId }) =>
    apiClient.delete<BaseResponse<undefined>>(
        `/users/${userId}/favorites/${variantId}`
    )
);

const initialState: AsyncState<undefined> = {
    data: null,
    status: "idle",
    error: null,
};

const favoriteSlice = createSlice({
    name: "favorite",
    initialState,
    reducers: {
        resetFavState(state) {
            state.data = null;
            state.status = "idle";
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // ADD_ITEM
        addAsyncThunkCases<undefined, undefined>(builder, addFavItem);
        // REMOVE_ITEM
        addAsyncThunkCases<undefined, undefined>(builder, removeFavItem);
    },
});

export const { resetFavState } = favoriteSlice.actions;
export default favoriteSlice.reducer;
