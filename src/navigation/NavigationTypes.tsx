import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Payment, Product } from '../types';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

// Danh sách màn hình
export type AuthStackParamList = {
    Tabs: undefined;
    Login: { email?: string }; // Có thể nhận email từ bất kỳ màn hình nào
    SignUp: undefined;
    ForgotPasswordScreen: undefined;
    ProductDetail: { item?: Product };
    Checkout: undefined;
    Profile: {title?:string};
    Cart: undefined;
    OrderHistory: undefined;
    MethodSelection: { method?: Payment, paymentMethods: Payment[] };
};

export type BottomTabParamList = {
    Home: undefined;
    Search: undefined;
    Notifications: undefined;
    Account: undefined;
}


export type ProductsItem = {
    navigation: any;
    items: any[];

}
export type BannerItem={
    navigation: any;
    brands :any []; 

}
// Định nghĩa kiểu navigation, route cho từng màn hình
export type TabsNav = NativeStackNavigationProp<AuthStackParamList, 'Tabs'>;
export type LoginNav = NativeStackNavigationProp<AuthStackParamList, 'Login'>;
export type LoginRoute = RouteProp<AuthStackParamList, 'Login'>;
export type SignUpNav = NativeStackNavigationProp<AuthStackParamList, 'SignUp'>;
export type ForgotPassNav = NativeStackNavigationProp<AuthStackParamList, 'ForgotPasswordScreen'>;
export type ProDetailNav = NativeStackNavigationProp<AuthStackParamList, 'ProductDetail'>;
export type ProDetailRoute = RouteProp<AuthStackParamList, 'ProductDetail'>;
export type CartNav = NativeStackNavigationProp<AuthStackParamList, 'Cart'>;
export type CheckoutNav = NativeStackNavigationProp<AuthStackParamList, 'Checkout'>;
export type ProfileNav = NativeStackNavigationProp<AuthStackParamList, 'Profile'>;
export type OrderNav = NativeStackNavigationProp<AuthStackParamList, 'OrderHistory'>;
export type MethodSelectionNav = NativeStackNavigationProp<AuthStackParamList, 'MethodSelection'>;
export type MethodSelectionRoute = RouteProp<AuthStackParamList, 'MethodSelection'>;

export type HomeNav = BottomTabNavigationProp<BottomTabParamList, 'Home'>
export type SearchNav = BottomTabNavigationProp<BottomTabParamList, 'Search'>
export type NotifyNav = BottomTabNavigationProp<BottomTabParamList, 'Notifications'>
export type AccountNav = BottomTabNavigationProp<BottomTabParamList, 'Account'>