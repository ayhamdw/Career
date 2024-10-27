import React, { useMemo } from "react";
import Requests from "../Requests";
import Messages from "../Messages";
import CustomTabNavigator from "./CustomTabNavigator";
import HomePage from "../HomePage/HomePage";
import ProfileNavigator from "./ProfileNavigator";

const Main = ({ route }) => {
  const { user } = route.params;

  const screenData = useMemo(
    () => ({
      Main: (props) => <HomePage {...props} user={user} />,
      Requests: (props) => <Requests {...props} user={user} />,
      Messages: (props) => <Messages {...props} user={user} />,
      Setting: (props) => <ProfileNavigator {...props} user={user} />, // No need to pass user here
    }),
    [user]
  );

  return <CustomTabNavigator screenData={screenData} />;
};

export default Main;
