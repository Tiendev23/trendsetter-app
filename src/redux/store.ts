import { configureStore } from "@reduxjs/toolkit";
import { loginReducer, productReducer, registerReducer } from "./features";

export const store = configureStore({
    reducer: {
        auth: loginReducer,
        register: registerReducer,
        products: productReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
