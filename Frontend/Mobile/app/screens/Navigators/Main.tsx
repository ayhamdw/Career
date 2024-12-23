import React, { useMemo } from "react";
import Requests from "../Proficient/Requests";
import CustomTabNavigator from "./CustomTabNavigator";
import ProfileNavigator from "./ProfileNavigator";
import MessageNavigator from "./MessageNavigator";
import HomePageNavigation from "./HomePageNavigation";
import ProfRequestNavigation from "../Proficient/ProfRequestNavigation";
import Community from "../Community/Community";

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
      Community: (props: any) => <Community {...props} user={user} />,
    }),
    [user]
  );

  return <CustomTabNavigator screenData={screenData} user={user} />;
};

export default Main;
