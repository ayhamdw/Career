import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchModal from "@/components/HomePage/Modal";
import JobList from "@/components/HomePage/JobList";
export default function ModalNavigator() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Modal">
      <Stack.Screen name="Modal" component={SearchModal} />
      <Stack.Screen name="JobList" component={JobList} />
    </Stack.Navigator>
  );
}
