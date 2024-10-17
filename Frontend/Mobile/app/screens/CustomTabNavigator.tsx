import React from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// Create Tab Navigator
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Define the function outside that handles the icons based on route
const getTabBarIcon = (route: any, color: string, size: number) => {
  let iconName;
  let IconComponent;

  if (route.name === "Main") {
    iconName = "home";
    IconComponent = Ionicons;
  } else if (route.name === "Setting") {
    iconName = "settings";
    IconComponent = Ionicons;
  } else if (route.name === "Requests") {
    iconName = "check-box";
    IconComponent = MaterialIcons;
  } else if (route.name === "Messages") {
    iconName = "chatbubbles";
    IconComponent = Ionicons;
  }

  return <IconComponent name={iconName} size={size} color={color} />;
};

// Define the CustomTabNavigator component
const CustomTabNavigator = ({ screenData }: { screenData: any }) => {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => getTabBarIcon(route, color, size),
          tabBarShowLabel: true,
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "bold",
          },
          tabBarStyle: {
            backgroundColor: "#fff",
            paddingBottom: 5,
            borderTopWidth: 0,
          },
          tabBarActiveTintColor: "#CEEB43",
          tabBarInactiveTintColor: "#666",
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
    </NavigationContainer>
  );
};

export default CustomTabNavigator;
