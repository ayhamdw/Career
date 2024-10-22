import React from "react";
import Requests from "../Requests";
import Messages from "../Messages";
import CustomTabNavigator from "./CustomTabNavigator"; // Import the navigator
import HomePage from "../HomePage";
import ProfileNavigator from "./ProfileNavigator";

const screenData = {
  Main: HomePage,
  Requests: Requests,
  Messages: Messages,
  Setting: ProfileNavigator,
};

const Main = () => {
  return <CustomTabNavigator screenData={screenData} />;
};

export default Main;
