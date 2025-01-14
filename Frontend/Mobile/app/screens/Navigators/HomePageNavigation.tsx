import { View, Text } from "react-native";
import React, { useMemo } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "../Home/HomePage";
import ProfNavigator from "../Proficient/ProfNavigator";
import JobList from "@/components/HomePage/JobList";
import Tips from "../Home/Tips";
import FirstTip from "../Home/FirstTip";
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
      <Stack.Screen
        name="JobList"
        component={JobList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Tips"
        component={Tips}
        options={{ headerShadowVisible: false }}
      />

      <Stack.Screen
        name="FirstTip"
        component={FirstTip}
        options={{ headerShadowVisible: false }}
      />
    </Stack.Navigator>
  );
}
