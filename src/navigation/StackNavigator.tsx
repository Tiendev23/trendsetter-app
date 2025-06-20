import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import { ForgotPassword, Login, ProductDetail, SignUp, Cart, Checkout, Order } from '../screens/stacks';
import MethodSelection from '../screens/stacks/MethodSelection';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
    return (
        <Stack.Navigator initialRouteName="Tabs" screenOptions={{ headerShown: false }} id={undefined}>
            <Stack.Screen name="Tabs" component={TabNavigator} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="ProductDetail" component={ProductDetail} />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="Checkout" component={Checkout} />
            <Stack.Screen name="Order" component={Order} />
            <Stack.Screen name="MethodSelection" component={MethodSelection} />
        </Stack.Navigator>
    );
}
