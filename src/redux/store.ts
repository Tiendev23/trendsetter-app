import { configureStore } from "@reduxjs/toolkit";
import {
    loginReducer,
    productsReducer,
    productReducer,
    registerReducer,
    orderReducer,
    payOSReducer,
    paymentsReducer,
} from "./features";

export const store = configureStore({
    reducer: {
        auth: loginReducer,
        register: registerReducer,
        products: productsReducer,
        product: productReducer,
        order: orderReducer,
        payments: paymentsReducer,
        // Phương thức hanh toán
        payOSMethod: payOSReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
