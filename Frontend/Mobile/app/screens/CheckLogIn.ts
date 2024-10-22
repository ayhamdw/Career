// AuthCheck.ts (new file)
import AsyncStorage from "@react-native-async-storage/async-storage";

export const checkAuthState = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    const isFirstTime = await AsyncStorage.getItem("isFirstTime");

    if (token) {
      return "Main";
    } else if (isFirstTime === null) {
      await AsyncStorage.setItem("isFirstTime", "false");
      return "IntroductionNavigation";
    } else {
      return "Login";
    }
  } catch (error) {
    console.error("Error checking auth state", error);
    return "Login"; 
  }
};
