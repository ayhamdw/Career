import React, { useMemo } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "../Setting/Profile";
import ProfileInfo from "../Setting/ProfileInformation";
import BookmarkJobs from "../BookmarkJobs";
import ViewResume from "../Setting/ViewResume";
import Notifications from "../Setting/Notifications";
import ChangePassword from "../ChangePassword";
import Login from "../Login";
import { View } from "react-native-animatable";

const Stack = createStackNavigator();

const ProfileNavigator = ({ user }) => {
  const screenData = useMemo(
    () => ({
      Profile: (props) => <Profile {...props} user={user} />,
      ProfileInfo: (props) => <ProfileInfo {...props} user={user} />,
      BookmarkJobs: (props) => <BookmarkJobs {...props} user={user} />,
      Notifications: (props) => <Notifications {...props} user={user} />,
      ChangePassword: (props) => <ChangePassword {...props} user={user} />,
      Logout: (props) => <Login {...props} />,
    }),
    [user]
  );

  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen
        name="Profile"
        component={screenData.Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfileInfo"
        component={screenData.ProfileInfo}
        options={{
          headerStyle: { backgroundColor: "white" },
          headerTitle: "",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="BookmarkJobs"
        component={screenData.BookmarkJobs}
        options={{
          headerStyle: { backgroundColor: "white" },
          headerTitle: "",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Notifications"
        component={screenData.Notifications}
        options={{
          headerStyle: { backgroundColor: "white" },
          headerTitle: "",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={screenData.ChangePassword}
        options={{
          headerStyle: { backgroundColor: "white" },
          headerTitle: "",
          headerShown: false,
        }}
      />
      <Stack.Screen name="Logout" component={screenData.Logout} />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
