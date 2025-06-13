import { configureStore } from "@reduxjs/toolkit";
import { loginReducer, registerReducer } from "./features";

export const store = configureStore({
    reducer: {
        auth: loginReducer,
        register: registerReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;