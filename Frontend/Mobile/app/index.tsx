import React from "react";
import { StatusBar, SafeAreaView, StyleSheet } from "react-native";
import { NavigationContainer, ThemeProvider } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Introduction1 from "./screens/introduction1";
import Introduction2 from "./screens/introduction2";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import ForgotPassword from "./screens/ForgetPassword";
import Main from "./screens/Main";
export default function HomeScreen() {
  const Stack = createNativeStackNavigator();

  return (
    <>
      <StatusBar barStyle={"dark-content"} backgroundColor={"red"} />
      <NavigationContainer independent={true}>
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
          <Stack.Screen
            name="Main"
            component={Main}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
