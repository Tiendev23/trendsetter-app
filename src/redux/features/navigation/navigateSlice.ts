import { createSlice } from "@reduxjs/toolkit";
import { RootStackParamList } from "@/types/navigation";
import { NavigationRoute } from "@react-navigation/native";

type NavRoute = {
    prevRoute: NavigationRoute<
        RootStackParamList,
        keyof RootStackParamList
    > | null;
};

const initialState: NavRoute = {
    prevRoute: null,
};

const paymentsSlice = createSlice({
    name: "navRoute",
    initialState,
    reducers: {
        resetPreRoute: (state) => {
            state.prevRoute = null;
        },
        setPrevRoute: (state, action) => {
            state.prevRoute = action.payload;
        },
    },
});

export const { resetPreRoute, setPrevRoute } = paymentsSlice.actions;
export default paymentsSlice.reducer;
