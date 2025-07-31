import { configureStore } from "@reduxjs/toolkit";
import * as Reducer from "./features";

export const store = configureStore({
    reducer: {
        navRoute: Reducer.navigationReducer,
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
        sendEmail: Reducer.sendEmailReducer,
        changePass: Reducer.ChangePasswordReducer,
        address: Reducer.addressReducer,
        location: Reducer.LocationReducer,
        user: Reducer.updateProfileReducer,
        reviews: Reducer.reviewReducer,
        favorite: Reducer.FavoriteReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
