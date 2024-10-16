import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Profile from "./Profile";
import Messages from "./Messages";
import Requests from "./Requests";

const Tab = createBottomTabNavigator();

const MainPage = () => (
  <View style={styles.center}>
    <Text>Main Page</Text>
  </View>
);

const Main = () => {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === "Main") {
              iconName = "home";
              return <Ionicons name={iconName} size={size} color={color} />;
            } else if (route.name === "Setting") {
              iconName = "settings";
              return <Ionicons name={iconName} size={size} color={color} />;
            } else if (route.name === "Requests") {
              iconName = "check-box";
              return (
                <MaterialIcons name={iconName} size={size} color={color} />
              );
            } else if (route.name === "Messages") {
              iconName = "chatbubbles";
              return <Ionicons name={iconName} size={size} color={color} />;
            }
          },
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
          component={MainPage}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Requests"
          component={Requests}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Messages"
          component={Messages}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Setting"
          component={Profile}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Main;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
