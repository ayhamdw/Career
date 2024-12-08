import { View, Text } from "react-native";
import React, { useMemo } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "../HomePage";
import ProfProfile from "../Proficient/ProfProfile";
import ProfNavigator from "../Proficient/ProfNavigator";
const Stack = createNativeStackNavigator();
export default function HomePageNavigation({ user }) {
  const screenData = useMemo(
    () => ({
      HomePage: (props) => <HomePage {...props} user={user} />,
      ProfNavigator: (props) => <ProfNavigator {...props} user={user} />,
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
        name="ProfNavigator"
        component={screenData.ProfNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
