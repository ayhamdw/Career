import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IntroductionNavigation2 from "./screens/IntroductionNavigation2";
import Main from "./screens/Main";
export default function HomeScreen() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="IntroductionNavigation2">
        <Stack.Screen
          name="IntroductionNavigation2"
          component={IntroductionNavigation2}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={Main}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
