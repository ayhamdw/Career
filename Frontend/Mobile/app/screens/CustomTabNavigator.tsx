import React from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { COLORS } from "../../assets/styles/Dimensions";

const Tab = createBottomTabNavigator();

const TabIcon = ({ route, color, size }) => {
  let iconName;
  let IconComponent;

  switch (route.name) {
    case "Main":
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
    case "Messages":
      iconName = "chatbubbles";
      IconComponent = Ionicons;
      break;
    default:
      break;
  }

  return <IconComponent name={iconName} size={size} color={color} />;
};

const CustomTabNavigator = ({ screenData }) => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => (
        <TabIcon route={route} color={color} size={size} />
      ),
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: "bold",
      },
      tabBarStyle: {
        backgroundColor: COLORS.tabBarBackgroundColor,
        paddingBottom: 5,
        borderTopWidth: 0,
      },
      tabBarActiveTintColor: COLORS.tabBarActiveTintColor,
      tabBarInactiveTintColor: COLORS.tabBarInActiveTintColor,
    })}
  >
    <Tab.Screen
      name="Main"
      component={screenData.Main}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      name="Requests"
      component={screenData.Requests}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      name="Messages"
      component={screenData.Messages}
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
