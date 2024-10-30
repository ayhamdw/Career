import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import IntroductionNavigation from "./IntroductionNavigation2";
import MainNavigation from "./MainNavigation";
import Login from "../Login";
import { SafeAreaView } from "react-native";

const App = () => {
  const [initialRoute, setInitialRoute] = useState(null);
  useEffect(() => {
    const checkAuthState = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const isFirstTime = await AsyncStorage.getItem("isFirstTime");

        if (token) {
          setInitialRoute("Main");
        } else if (isFirstTime === null) {
          await AsyncStorage.setItem("isFirstTime", "false");
          setInitialRoute("IntroductionNavigation");
        } else {
          setInitialRoute("Login");
        }
      } catch (error) {
        console.error("Error checking auth state", error);
        setInitialRoute("Login");
      }
    };

    checkAuthState();
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
