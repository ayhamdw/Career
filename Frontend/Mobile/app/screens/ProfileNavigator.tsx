import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileInfo from "./ProfileInformation";
import AppliedJobs from "./AppliedJobs";
import BookmarkJobs from "./BookmarkJobs";
import ViewResume from "./ViewResume";
import Notifications from "./Notifications";
import ChangePassword from "./ChangePassword";
import Profile from "./Profile";
import Login from "./Login";

const Stack = createNativeStackNavigator();

const ProfileNavigator = () => (
  <Stack.Navigator initialRouteName="Profile">
    <Stack.Screen
      name="Profile"
      component={Profile}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="ProfileInfo" component={ProfileInfo} />
    <Stack.Screen name="AppliedJobs" component={AppliedJobs} />
    <Stack.Screen name="BookmarkJobs" component={BookmarkJobs} />
    <Stack.Screen name="ViewResume" component={ViewResume} />
    <Stack.Screen name="Notifications" component={Notifications} />
    <Stack.Screen name="ChangePassword" component={ChangePassword} />
    <Stack.Screen name="Logout" component={Login} />
  </Stack.Navigator>
);

export default ProfileNavigator;
