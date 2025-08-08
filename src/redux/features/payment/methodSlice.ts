import { getAllMethods } from "@/services/payment.service";
import { PaymentMethod } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

type ProviderState = {
    method: PaymentMethod;
};

const initialState: ProviderState = {
    method: getAllMethods()[0],
};

const methodSlice = createSlice({
    name: "provider",
    initialState,
    reducers: {
        setSelectedMethod: (state, action) => {
            state.method = action.payload;
        },
    },
});

export const { setSelectedMethod } = methodSlice.actions;
export default methodSlice.reducer;
