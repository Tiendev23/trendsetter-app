import navigationReducer from "./navigation/navigateSlice";
import loginReducer from "./auth/loginSlice";
import registerReducer from "./auth/registerSlice";
import productsReducer from "./product/productsSlice";
import orderReducer from "./order/orderSlice";
import ordersReducer from "./order/ordersSlice";
import paymentsReducer from "./payment/paymentsSlice";
import zalopayReducer from "./payment/zalopaySlice";
import payosReducer from "./payment/payosSlice";
import categoriesReducer from "./category/categoriesSlice";
import ChangePasswordReducer from "./auth/ChangePassword";
import sendEmailReducer from "./forgotPassword/sendEmailSlice";
import addressReducer from "./addresses/addressesSlice";
import LocationReducer from "./addresses/locationSlice";
import updateProfileReducer from "./User/userSlice";

export { default as productReducer } from "./product/productSlice";
export { default as reviewReducer } from "./product/reviewsSlice";
export { default as cartsReducer } from "./cart/cartsSlice";
export { default as cartReducer } from "./cart/cartSlice";

export {
    navigationReducer,
    loginReducer,
    registerReducer,
    productsReducer,
    orderReducer,
    paymentsReducer,
    ordersReducer,
    zalopayReducer,
    payosReducer,
    categoriesReducer,
    ChangePasswordReducer,
    sendEmailReducer,
    addressReducer,
    LocationReducer,
    updateProfileReducer,
};
