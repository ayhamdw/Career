import React from "react";
import Requests from "./Requests";
import Messages from "./Messages";
import Profile from "./Profile"; // Settings page component
import CustomTabNavigator from "./CustomTabNavigator"; // Import the navigator
import HomePage from "./HomePage";

const screenData = {
  Main: HomePage,
  Requests: Requests,
  Messages: Messages,
  Setting: Profile,
};

const Main = () => {
  return <CustomTabNavigator screenData={screenData} />;
};

export default Main;
