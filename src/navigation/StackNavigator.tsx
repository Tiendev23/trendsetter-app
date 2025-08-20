import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import * as Stacks from '../screens/stacks'
import ChatScreen from '../screens/stacks/ChatScreen';
import Onboarding from '../screens/tabs/Onboarding';
import { RootStackParamList } from '@/types';
import { useAuthContext } from '@/contexts/AuthContext';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
    const { user } = useAuthContext();

    return (
        <Stack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }} id={undefined}>
            <Stack.Screen name="ProductDetail"  component={Stacks.ProductDetail} />
            <Stack.Screen name="Cart"           component={Stacks.Cart} />
            <Stack.Screen name="Checkout"       component={Stacks.Checkout} />
            <Stack.Screen name="SelectAddress"  component={Stacks.SelectAddress} />
            <Stack.Screen name="SelectProvider" component={Stacks.SelectProvider} />
            <Stack.Screen name="AddressModify"  component={Stacks.AddressModify} />
            <Stack.Screen name="ReviewWriting"  component={Stacks.ReviewWriting} />
            <Stack.Screen name="OrderHistory"   component={Stacks.OrderHistory} />
            <Stack.Screen name="OrderDetail"    component={Stacks.OrderDetail} />

            <Stack.Screen name="Onboarding" component={Onboarding} />
            <Stack.Screen name="Tabs" component={TabNavigator} />
            <Stack.Screen name="Login" component={Stacks.Login} />
            <Stack.Screen name="SignUp" component={Stacks.SignUp} />
            <Stack.Screen name='ProductlistScreen' component={Stacks.ProductlistScreen} />
            <Stack.Screen name="VerifyOtp" component={Stacks.VerifyOtp} />
            <Stack.Screen name="TermsOfServiceScreen" component={Stacks.TermsOfServiceScreen} />

            <Stack.Screen name="Profile" component={Stacks.Profile} />
            <Stack.Screen name='OrderStatus' component={Stacks.OrderStatus} />
            <Stack.Screen name="editProfile" component={Stacks.ProfileEdit} />
            <Stack.Screen name="addr" component={Stacks.AddressListScreen} />
            <Stack.Screen name="ChangePasswordScreen" component={Stacks.ChangePasswordScreen} />
            <Stack.Screen name="ForgotPasswordScreen" component={Stacks.ForgotPasswordScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="EditAddress" component={Stacks.EditAddress} />
            <Stack.Screen name="LocationScreen" component={Stacks.LocationScreen} />
            <Stack.Screen name="AddAddressScreen" component={Stacks.AddAddressScreen} />
            <Stack.Screen name="PaymentMethodsScreen" component={Stacks.PaymentMethodsScreen} />
            <Stack.Screen name="WalletScreen" component={Stacks.WalletScreen} />
            <Stack.Screen name="FavoritesScreen" component={Stacks.FavoritesScreen} />
            <Stack.Screen name="PrivacyPolicyScreen" component={Stacks.PrivacyPolicyScreen} />
            <Stack.Screen name="HelpCenterScreen" component={Stacks.HelpCenterScreen} />



        </Stack.Navigator>
    );
}
