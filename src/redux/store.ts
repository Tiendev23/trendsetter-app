import { configureStore } from "@reduxjs/toolkit";
import {
    loginReducer,
    productsReducer,
    productReducer,
    registerReducer,
} from "./features";

export const store = configureStore({
    reducer: {
        auth: loginReducer,
        register: registerReducer,
        products: productsReducer,
        product: productReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
