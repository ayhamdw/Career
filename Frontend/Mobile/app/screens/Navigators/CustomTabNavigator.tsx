import React from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { COLORS } from "../../../assets/styles/Dimensions";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import MessageNavigator from "./MessageNavigator"; // Import MessageNavigator
import Main from "./Main";
import Requests from "../Requests";
import FriendRequests from "../FriendRequests";
import ProfileNavigator from "./ProfileNavigator";
import HomePage from "../HomePage";

const Tab = createBottomTabNavigator();

const TabIcon = ({ route, color, size }) => {
  let iconName;
  let IconComponent;

  switch (route.name) {
    case "HomePage":
      iconName = "home";
      IconComponent = Ionicons;
      break;
    case "Setting":
      iconName = "settings";
      IconComponent = Ionicons;
      break;
    case "Requests":
      iconName = "check-box";
      IconComponent = MaterialIcons;
      break;
    case "Chat":
      iconName = "chatbubbles";
      IconComponent = Ionicons;
      break;
    case "FriendRequests":
      iconName = "people";
      IconComponent = MaterialIcons;
      break;
    default:
      break;
  }

  return <IconComponent name={iconName} size={size} color={color} />;
};

const CustomTabNavigator = ({ screenData, user }) => (
  <Tab.Navigator
    screenOptions={({ route }) => {
      const routeName = getFocusedRouteNameFromRoute(route) ?? route.name;
      return {
        tabBarIcon: ({ color, size }) => (
          <TabIcon route={route} color={color} size={size} />
        ),
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
        },
        tabBarStyle: {
          backgroundColor: COLORS.tabBarBackgroundColor,
          // paddingBottom: 5,
          borderTopWidth: 0,
          display: routeName === "ChatUser" ? "none" : "flex",
        },
        tabBarActiveTintColor: COLORS.tabBarActiveTintColor,
        tabBarInactiveTintColor: COLORS.tabBarInActiveTintColor,
      };
    }}
  >
    <Tab.Screen
      name="HomePage"
      component={screenData.HomePage}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      name="Requests"
      component={screenData.Requests}
      options={{ headerShown: false }}
    />
    <Tab.Screen name="Chat" options={{ headerShown: false }}>
      {() => <MessageNavigator user={user} />}
    </Tab.Screen>
    <Tab.Screen
      name="FriendRequests"
      component={screenData.FriendRequests}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      name="Setting"
      component={screenData.Setting}
      options={{ headerShown: false }}
    />
  </Tab.Navigator>
);

export default CustomTabNavigator;
