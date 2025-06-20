import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import { ForgotPasswordScreen, LoginScreen, ProductDetailScreen, SignUpScreen, CartScreen } from '../screens/stacks';
import Profile from '../screens/stacks/Profile';
import OrderStatus from '../screens/stacks/OrderStatus';
import ProductlistScreen from '../screens/stacks/ProductlistScreen';
import editProfile from '../screens/stacks/editProfile';
import EditAddressScreen from '../screens/stacks/EditAddressScreen';
import ChangePasswordScreen from '../screens/stacks/ChangePasswordScreen';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
    return (
        <Stack.Navigator initialRouteName="Tabs" screenOptions={{ headerShown: false }} id={undefined}>
            <Stack.Screen name="Tabs" component={TabNavigator} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="Cart" component={CartScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name='OrderStatus' component={OrderStatus} />
            <Stack.Screen name='ProductlistScreen' component={ProductlistScreen} />
            <Stack.Screen name="editProfile" component={editProfile} />
            <Stack.Screen name="addr" component={EditAddressScreen} />
            <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
            <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />

        </Stack.Navigator>
    );
}
