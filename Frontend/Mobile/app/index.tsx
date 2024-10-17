import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigation from "./screens/MainNavigation";
export default function HomeScreen() {
  return (
    <NavigationContainer independent={true}>
      <MainNavigation />
    </NavigationContainer>
    // <ChangePassword />
  );
}
