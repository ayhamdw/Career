import React from "react";
import Requests from "./Requests";
import Messages from "./Messages";
import Profile from "./Profile"; // Settings page component
import CustomTabNavigator from "./CustomTabNavigator"; // Import the navigator

const screenData = {
  Main: Requests,
  Requests: Requests,
  Messages: Messages,
  Setting: Profile,
};

const Main = () => {
  return <CustomTabNavigator screenData={screenData} />;
};

export default Main;
