import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Introduction1 from "./introduction1";
import Introduction2 from "./introduction2";
import Login from "./Login";
import Signup from "./Signup";
import ForgotPassword from "./ForgetPassword";
const Stack = createNativeStackNavigator();
const IntroductionNavigation2 = () => {
  return (
    <Stack.Navigator initialRouteName="Introduction1">
      <Stack.Screen
        name="Introduction1"
        component={Introduction1}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Introduction2"
        component={Introduction2}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
};

export default IntroductionNavigation2;

const styles = StyleSheet.create({});
