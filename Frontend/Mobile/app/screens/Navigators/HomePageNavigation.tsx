import { View, Text } from "react-native";
import React, { useMemo } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "../HomePage";
import ProfProfile from "../ProfProfile";
const Stack = createNativeStackNavigator();
export default function HomePageNavigation({ user }) {
  const screenData = useMemo(
    () => ({
      HomePage: (props) => <HomePage {...props} user={user} />,
      ProfProfile: (props) => <ProfProfile {...props} user={user} />,
    }),
    [user]
  );
  return (
    <Stack.Navigator initialRouteName="HomePage">
      <Stack.Screen
        name="HomePage"
        component={screenData.HomePage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfProfile"
        component={screenData.ProfProfile}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
