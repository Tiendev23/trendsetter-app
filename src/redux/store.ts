import { configureStore } from "@reduxjs/toolkit";
import * as Reducer from "./features";

export const store = configureStore({
    reducer: {
        navRoute: Reducer.navigationReducer,
        auth: Reducer.loginReducer,
        register: Reducer.registerReducer,
        products: Reducer.productsReducer,
        categories: Reducer.categoriesReducer,
        sendEmail: Reducer.sendEmailReducer,
        changePass: Reducer.ChangePasswordReducer,
        address: Reducer.addressReducer,
        location: Reducer.LocationReducer,
        user: Reducer.updateProfileReducer,

        product: Reducer.productReducer,
        reviews: Reducer.reviewReducer,
        favorite: Reducer.FavoriteReducer,
        carts: Reducer.cartsReducer,
        cart: Reducer.cartReducer,
        addresses: Reducer.addressesReducer,
        method: Reducer.methodReducer,
        transaction: Reducer.transactionReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
