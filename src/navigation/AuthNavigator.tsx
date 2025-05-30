import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import InformationScreen from '../screens/InformationScreen';

const Stack = createNativeStackNavigator();
import Tabnavigation from './AppNavigator';
export default function AuthNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }} id={undefined}> 
      <Stack.Screen name="Information" component={InformationScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name= "Tabnavigation" component = {Tabnavigation} />
    </Stack.Navigator>
  );
}
