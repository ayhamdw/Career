import React from "react";
import IntroductionNavigation2 from "./IntroductionNavigation2";
import Main from "./Main";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
const MainNavigation = () => {
  return (
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
  );
};

export default MainNavigation;
