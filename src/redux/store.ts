import { configureStore } from "@reduxjs/toolkit";
import {
    loginReducer,
    productsReducer,
    productReducer,
    registerReducer,
    ChangePassword,
} from "./features";

export const store = configureStore({
    reducer: {
        auth: loginReducer,
        register: registerReducer,
        products: productsReducer,
        product: productReducer,
        changePass: ChangePassword,

    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
