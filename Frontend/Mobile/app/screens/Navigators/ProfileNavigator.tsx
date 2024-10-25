import React, { useMemo } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "../Profile";
import ProfileInfo from "../ProfileInformation";
import AppliedJobs from "../AppliedJobs";
import BookmarkJobs from "../BookmarkJobs";
import ViewResume from "../ViewResume";
import Notifications from "../Notifications";
import ChangePassword from "../ChangePassword";
import Login from "../Login";

const Stack = createStackNavigator();

const ProfileNavigator = ({ user }) => {
  const screenData = useMemo(
    () => ({
      Profile: (props) => <Profile {...props} user={user} />,
      ProfileInfo: (props) => <ProfileInfo {...props} user={user} />,
      AppliedJobs: (props) => <AppliedJobs {...props} user={user} />,
      BookmarkJobs: (props) => <BookmarkJobs {...props} user={user} />,
      ViewResume: (props) => <ViewResume {...props} user={user} />,
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
        name="AppliedJobs"
        component={screenData.AppliedJobs}
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
        name="ViewResume"
        component={screenData.ViewResume}
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
