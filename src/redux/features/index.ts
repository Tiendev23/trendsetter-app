import navigationReducer from "./navigation/navigateSlice";
import loginReducer from "./auth/loginSlice";
import registerReducer from "./auth/registerSlice";
import productsReducer from "./product/productsSlice";
import productReducer from "./product/productSlice";
import orderReducer from "./order/orderSlice";
import ordersReducer from "./order/ordersSlice";
import paymentsReducer from "./payment/paymentsSlice";
import zalopayReducer from "./payment/zalopaySlice";
import payosReducer from "./payment/payosSlice";
import categoriesReducer from "./category/categoriesSlice";
import ChangePasswordReducer from "./auth/ChangePassword";
import sendEmailReducer from "./forgotPassword/sendEmailSlice"
export {
    navigationReducer,
    loginReducer,
    registerReducer,
    productsReducer,
    productReducer,
    orderReducer,
    paymentsReducer,
    ordersReducer,
    zalopayReducer,
    payosReducer,
    categoriesReducer,
    ChangePasswordReducer,
    sendEmailReducer
};
