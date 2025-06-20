import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import { ForgotPassword, Login, ProductDetail, SignUp, Cart, Checkout, Order } from '../screens/stacks';
import MethodSelection from '../screens/stacks/MethodSelection';
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
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="ProductDetail" component={ProductDetail} />
            <Stack.Screen name="Cart" component={Cart}  />
            <Stack.Screen name="Checkout" component={Checkout} />
            <Stack.Screen name="Order" component={Order} />
            <Stack.Screen name="MethodSelection" component={MethodSelection} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name='OrderStatus' component={OrderStatus} />
            <Stack.Screen name='ProductlistScreen' component={ProductlistScreen} />
            <Stack.Screen name="editProfile" component={editProfile} />
            <Stack.Screen name="addr" component={EditAddressScreen} />
            <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
            <Stack.Screen name="ForgotPasswordScreen" component={ForgotPassword} />

        </Stack.Navigator>
    );
}
