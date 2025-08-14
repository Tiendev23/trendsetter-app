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
        reviews: Reducer.reviewsReducer,
        favorites: Reducer.favoritesReducer,
        carts: Reducer.cartsReducer,
        cart: Reducer.cartReducer,
        addresses: Reducer.addressesReducer,
        provider: Reducer.providerReducer,
        transaction: Reducer.transactionReducer,
        orders: Reducer.ordersReducer,
        order: Reducer.orderReducer,
        favorite: Reducer.favoriteReducer,
        review: Reducer.reviewReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
