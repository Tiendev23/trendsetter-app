import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { CartItem, ShippingAddress, OrderItem, ProviderData } from "./models";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { ObjectId } from ".";
// Danh sách màn hình
export type RootStackParamList = {
    Onboarding: undefined;
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
        transactionData?: ProviderData;
    };
    SelectAddress: undefined;
    SelectProvider: undefined;
    AddressModify: { address?: ShippingAddress };
    ReviewWriting: { items: OrderItem[] };
    OrderDetail: { orderId: ObjectId };
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
export type OrdHistNav = NativeStackNavigationProp<
    RootStackParamList,
    "OrderHistory"
>;

export type RvwWritingNav = NativeStackNavigationProp<
    RootStackParamList,
    "ReviewWriting"
>;
export type RvwWritingRoute = RouteProp<RootStackParamList, "ReviewWriting">;

export type ProfileNav = NativeStackNavigationProp<
    RootStackParamList,
    "Profile"
>;

export type TabsNav = NativeStackNavigationProp<RootStackParamList, "Tabs">;

export type HomeNav = BottomTabNavigationProp<BottomTabParamList, "Home">;
export type SearchNav = BottomTabNavigationProp<BottomTabParamList, "Search">;
export type NotifyNav = BottomTabNavigationProp<
    BottomTabParamList,
    "Notifications"
>;
export type AccountNav = BottomTabNavigationProp<BottomTabParamList, "Account">;
