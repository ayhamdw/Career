import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../Login";
import ForgotPassword from "../ForgetPassword";
import MainScreen from "./MainNavigation"; // Example for MainNavigation
import SignUp from "../Signup";

const Stack = createNativeStackNavigator();

export const LoginStack = () => (
  <Stack.Navigator initialRouteName="Login">
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    <Stack.Screen name="SignUp" component={SignUp} />
  </Stack.Navigator>
);
