import React from "react";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, StyleSheet } from "react-native";
import MessageNavigator from "./MessageNavigator";
import CommunityNavigator from "../Community/CommunityNavigator";
import ProfRequestNavigation from "../Proficient/ProfRequestNavigation";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

const TabIcon = ({ route, color, size, focused }) => {
  let iconName;
  let IconComponent;

  switch (route.name) {
    case "Home":
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
    case "Community":
      iconName = "users";
      IconComponent = FontAwesome5;
      break;
    default:
      break;
  }

  return (
    <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
      <IconComponent name={iconName} size={size} color={color} />
    </View>
  );
};

const CustomTabNavigator = ({ screenData, user }) => (
  <Tab.Navigator
    screenOptions={({ route }) => {
      const routeName = getFocusedRouteNameFromRoute(route) ?? route.name;
      return {
        tabBarIcon: ({ color, size, focused }) => (
          <TabIcon
            route={route}
            color={focused ? "#58d68d" : "#6b6b6b"}
            size={24}
            focused={focused}
          />
        ),
        tabBarStyle: [
          styles.tabBarStyle,
          { display: routeName === "ChatUser" ? "none" : "flex" },
        ],
        tabBarShowLabel: false,
        headerShown: false,
      };
    }}
  >
    <Tab.Screen name="Home" component={screenData.HomePage} />
    <Tab.Screen name="Requests" component={screenData.Requests} />
    <Tab.Screen name="Chat">
      {() => <MessageNavigator user={user} />}
    </Tab.Screen>
    <Tab.Screen name="Community">
      {() => <ProfRequestNavigation user={user} />}
    </Tab.Screen>
    <Tab.Screen name="Setting" component={screenData.Setting} />
  </Tab.Navigator>
);

export default CustomTabNavigator;

const styles = StyleSheet.create({
  tabBarStyle: {
    position: "absolute",
    left: 10,
    right: 10,
    bottom: 10,
    borderRadius: 30,
    backgroundColor: "#fff",
    height: 60,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    alignItems: "center",
    flexDirection: "row",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  activeIconContainer: {
    borderRadius: 15,
  },
});
