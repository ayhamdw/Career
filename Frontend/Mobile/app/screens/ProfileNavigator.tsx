// ProfileNavigator.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ProfileInfo from "./ProfileInformation";
import AppliedJobs from "./AppliedJobs";
import BookmarkJobs from "./BookmarkJobs";
import ViewResume from "./ViewResume";
import Notifications from "./Notifications";
import ChangePassword from "./ChangePassword";
import Profile from "./Profile";
const Stack = createNativeStackNavigator();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfileInfo"
        component={ProfileInfo}
        options={{
          headerTitle: "",
          headerStyle: {
            backgroundColor: "white",
          },
        }}
      />
      <Stack.Screen
        name="AppliedJobs"
        component={AppliedJobs}
        options={{
          headerTitle: "",
          headerStyle: {
            backgroundColor: "white",
          },
        }}
      />
      <Stack.Screen
        name="BookmarkJobs"
        component={BookmarkJobs}
        options={{
          headerTitle: "",
          headerStyle: {
            backgroundColor: "white",
          },
        }}
      />
      <Stack.Screen
        name="ViewResume"
        component={ViewResume}
        options={{
          headerTitle: "",
          headerStyle: {
            backgroundColor: "white",
          },
        }}
      />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{
          headerTitle: "",
          headerStyle: {
            backgroundColor: "white",
          },
        }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          headerTitle: "",
          headerStyle: {
            backgroundColor: "white",
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
