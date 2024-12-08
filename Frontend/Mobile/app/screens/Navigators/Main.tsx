import React, { useMemo } from "react";
import Requests from "../Proficient/Requests";
import Messages from "../Messages";
import CustomTabNavigator from "./CustomTabNavigator";
import HomePage from "../HomePage";
import ProfileNavigator from "./ProfileNavigator";
import FriendRequests from "../Proficient/FriendRequests";
import ChatUser from "../ChatUser";
import MessageNavigator from "./MessageNavigator";
import HomePageNavigation from "./HomePageNavigation";

const Main = ({ route }) => {
  const { user } = route?.params || {};

  if (!user) {
    console.warn("No user passed to Main.");
    return null;
  }

  const screenData = useMemo(
    () => ({
      HomePage: (props: any) => <HomePageNavigation {...props} user={user} />,
      Requests: (props: any) => <Requests {...props} user={user} />,
      Chat: (props: any) => <MessageNavigator {...props} user={user} />,
      Setting: (props: any) => <ProfileNavigator {...props} user={user} />,
      FriendRequests: (props: any) => <FriendRequests {...props} user={user} />,
    }),
    [user]
  );

  return <CustomTabNavigator screenData={screenData} user={user} />;
};

export default Main;
