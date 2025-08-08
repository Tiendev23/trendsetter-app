import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { CartItem, BaseMethodProps, Product, ShippingAddress } from "./models";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { ObjectId } from ".";
// Danh sách màn hình
export type RootStackParamList = {
    Tabs: undefined;
    Login: { email?: string }; // Có thể nhận email từ bất kỳ màn hình nào
    SignUp: undefined;
    ForgotPasswordScreen: undefined;
    ProductDetail: {
        productId: ObjectId;
        variantId: ObjectId;
    };
    Profile: { title?: string };
    OrderHistory: undefined;

    Cart: undefined;
    Checkout: {
        items: CartItem[];
    };
    SelectAddress: undefined;
    SelectProvider: undefined;
    AddressModify: { address?: ShippingAddress | undefined };
};

export type BottomTabParamList = {
    Home: undefined;
    Search: undefined;
    Notifications: undefined;
    Account: undefined;
};

export type ProductsItem = {
    navigation: any;
    items: any[];
};
export type BannerItem = {
    navigation: any;
    brands: any[];
};
// Định nghĩa kiểu navigation, route cho từng màn hình
export type LoginNav = NativeStackNavigationProp<RootStackParamList, "Login">;
export type LoginRoute = RouteProp<RootStackParamList, "Login">;

export type SignUpNav = NativeStackNavigationProp<RootStackParamList, "SignUp">;

export type ForgotPassNav = NativeStackNavigationProp<
    RootStackParamList,
    "ForgotPasswordScreen"
>;

export type ProDetailNav = NativeStackNavigationProp<
    RootStackParamList,
    "ProductDetail"
>;
export type ProDetailRoute = RouteProp<RootStackParamList, "ProductDetail">;

export type CartNav = NativeStackNavigationProp<RootStackParamList, "Cart">;

export type CheckoutNav = NativeStackNavigationProp<
    RootStackParamList,
    "Checkout"
>;
export type CheckoutRoute = RouteProp<RootStackParamList, "Checkout">;

export type SelectAddressNav = NativeStackNavigationProp<
    RootStackParamList,
    "SelectAddress"
>;

export type AddressModifyNav = NativeStackNavigationProp<
    RootStackParamList,
    "AddressModify"
>;
export type AddressModifyRoute = RouteProp<RootStackParamList, "AddressModify">;

export type SelectProviderNav = NativeStackNavigationProp<
    RootStackParamList,
    "SelectProvider"
>;

export type ProfileNav = NativeStackNavigationProp<
    RootStackParamList,
    "Profile"
>;

export type OrderNav = NativeStackNavigationProp<
    RootStackParamList,
    "OrderHistory"
>;

export type TabsNav = NativeStackNavigationProp<RootStackParamList, "Tabs">;

export type HomeNav = BottomTabNavigationProp<BottomTabParamList, "Home">;
export type SearchNav = BottomTabNavigationProp<BottomTabParamList, "Search">;
export type NotifyNav = BottomTabNavigationProp<
    BottomTabParamList,
    "Notifications"
>;
export type AccountNav = BottomTabNavigationProp<BottomTabParamList, "Account">;
