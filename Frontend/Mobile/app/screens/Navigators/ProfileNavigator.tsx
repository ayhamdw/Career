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
import Saved from "../Setting/Saved";
import PostDetails from "../Community/postDetails";
import MyProjects from "../Setting/MyProjects";
import EditProject from "../Setting/EditProject";

const Stack = createStackNavigator();

const ProfileNavigator = ({ user }: { user: any }) => {
  const screenData = useMemo(
    () => ({
      Profile: (props: any) => <Profile {...props} user={user} />,
      ProfileInfo: (props: any) => <ProfileInfo {...props} user={user} />,
      Saved: (props: any) => <Saved {...props} user={user} />,
      Notifications: (props: any) => <Notifications {...props} user={user} />,
      ChangePassword: (props: any) => <ChangePassword {...props} user={user} />,
      PostDetails: (props: any) => <PostDetails {...props} user={user} />,
      MyProjects: (props: any) => <MyProjects {...props} user={user} />,
      EditProject: (props: any) => <EditProject {...props} user={user} />,
      Logout: (props: any) => <Login {...props} />,
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
        name="ChangePassword"
        component={screenData.ChangePassword}
        options={{
          headerStyle: { backgroundColor: "white" },
          headerTitle: "",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Saved"
        component={screenData.Saved}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="MyProjects"
        component={screenData.MyProjects}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="PostDetails"
        component={screenData.PostDetails}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="EditProject"
        component={screenData.EditProject}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Logout" component={screenData.Logout} />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
