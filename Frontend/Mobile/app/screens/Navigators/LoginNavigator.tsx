import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../Login";
import ForgotPassword from "../ForgetPassword";
import SignUpNavigator from "./SignupNavigation";
import Main from "./Main";
const Stack = createNativeStackNavigator();

export const LoginStack = () => (
  <Stack.Navigator initialRouteName="Login">
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    <Stack.Screen name="SignUp" component={SignUpNavigator} />
    <Stack.Screen name="Main" component={Main} />
  </Stack.Navigator>
);
