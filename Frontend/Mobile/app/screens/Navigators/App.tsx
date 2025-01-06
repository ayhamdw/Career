import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MainNavigation from "./MainNavigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Main from "./Main";
import { NavigationIndependentTree } from "@react-navigation/native";
import { StatusBar } from "react-native";
import Toast from "react-native-toast-message";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { tokenCache } from "../utils/cache";

const App = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkAuthState = async () => {
      const userString = await AsyncStorage.getItem("user");
      if (userString) {
        const userObject = JSON.parse(userString); // Parse the user string into an object
        setUser(userObject);
      }
    };

    checkAuthState();
  }, []);

  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

  if (!publishableKey) {
    throw new Error("Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to your .env file");
  }

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationIndependentTree>
          <StatusBar barStyle="dark-content" />
          <NavigationContainer>
            {/* {user ? <Main route={{ params: { user } }} /> : <MainNavigation />} */}
            <MainNavigation />
            <Toast />
          </NavigationContainer>
        </NavigationIndependentTree>
      </GestureHandlerRootView>
    </ClerkProvider>
  );
};

export default App;
