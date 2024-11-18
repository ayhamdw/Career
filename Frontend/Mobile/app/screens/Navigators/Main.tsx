import React, { useMemo } from "react";
import Requests from "../Requests";
import Messages from "../Messages";
import CustomTabNavigator from "./CustomTabNavigator";
import HomePage from "../HomePage";
import ProfileNavigator from "./ProfileNavigator";
import FriendRequests from "../FriendRequests";
import ChatUser from "../ChatUser";
import MessageNavigator from "./MessageNavigator";

const Main = ({ route }) => {
  const { user } = route?.params || {}; // Use optional chaining and fallback to {}
  console.log("Main user:", user);

  if (!user) {
    console.warn("No user passed to Main.");
    return null; // Or show a fallback UI
  }

  const screenData = useMemo(
    () => ({
      HomePage: (props) => <HomePage {...props} user={user} />,
      Requests: (props) => <Requests {...props} user={user} />,
      Chat: (props) => <MessageNavigator {...props} user={user} />,
      Setting: (props) => <ProfileNavigator {...props} user={user} />,
      FriendRequests: (props) => <FriendRequests {...props} user={user} />,
    }),
    [user]
  );

  return <CustomTabNavigator screenData={screenData} user={user} />;
};

export default Main;
