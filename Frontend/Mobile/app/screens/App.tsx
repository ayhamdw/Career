import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import IntroductionNavigation from "./IntroductionNavigation2";
import MainNavigation from "./MainNavigation";
import Login from "./Login";
import { checkAuthState } from "./CheckLogIn"; // Import the refactored logic

const App = () => {
  const [initialRoute, setInitialRoute] = useState("Introduction");

  useEffect(() => {
    const initializeAuthState = async () => {
      const route = await checkAuthState();
      console.log("Initial route: ", route);

      setInitialRoute(route);
    };

    initializeAuthState();
  }, []);

  return (
    <NavigationContainer independent={true}>
      {initialRoute === "Main" && <MainNavigation />}
      {initialRoute === "IntroductionNavigation" && <IntroductionNavigation />}
      {initialRoute === "Login" && <Login />}
    </NavigationContainer>
  );
};

export default App;
