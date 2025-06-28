import { configureStore } from "@reduxjs/toolkit";
import * as Reducer from "./features";

export const store = configureStore({
    reducer: {
        auth: Reducer.loginReducer,
        register: Reducer.registerReducer,
        products: Reducer.productsReducer,
        product: Reducer.productReducer,
        order: Reducer.orderReducer,
        payments: Reducer.paymentsReducer,
        orders: Reducer.ordersReducer,
        categories: Reducer.categoriesReducer,
        // Phương thức hanh toán
        payosMethod: Reducer.payosReducer,
        zalopayMethod: Reducer.zalopayReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
