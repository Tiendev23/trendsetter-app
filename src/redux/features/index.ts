import navigationReducer from "./navigation/navigateSlice";
import loginReducer from "./auth/loginSlice";
import registerReducer from "./auth/registerSlice";
import productsReducer from "./product/productsSlice";
import categoriesReducer from "./category/categoriesSlice";
import ChangePasswordReducer from "./auth/ChangePassword";
import sendEmailReducer from "./forgotPassword/sendEmailSlice";
import addressReducer from "./address/addressSlice";
import LocationReducer from "./addresses/locationSlice";
import updateProfileReducer from "./User/userSlice";
import FavoriteReducer from "./product/favoriteSlice";

export { default as productReducer } from "./product/productSlice";
export { default as reviewReducer } from "./product/reviewsSlice";
export { default as cartsReducer } from "./cart/cartsSlice";
export { default as cartReducer } from "./cart/cartSlice";
export { default as addressesReducer } from "./address/addressesSlice";
export { default as providerReducer } from "./payment/providerSlice";
export { default as transactionReducer } from "./payment/transactionSlice";
export { default as ordersReducer } from "./order/ordersSlice";

export {
    navigationReducer,
    loginReducer,
    registerReducer,
    productsReducer,
    categoriesReducer,
    ChangePasswordReducer,
    sendEmailReducer,
    addressReducer,
    LocationReducer,
    updateProfileReducer,
    FavoriteReducer,
};
