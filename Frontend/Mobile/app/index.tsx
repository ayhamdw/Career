import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import HomePage from "./screens/HomePage";
export default function HomeScreen() {
  return (
    <NavigationContainer independent={true}>
      <HomePage/>
    </NavigationContainer>
    // <ChangePassword />
  );
}
