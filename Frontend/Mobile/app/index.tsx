import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import HomePage from "./screens/HomePage";
import MainNavigation from "./screens/MainNavigation";
export default function HomeScreen() {
  return (
    <NavigationContainer independent={true}>
      <MainNavigation />
      {/* <HomePage /> */}
    </NavigationContainer>
  );
}
