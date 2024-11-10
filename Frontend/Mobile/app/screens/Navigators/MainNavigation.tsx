import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../Login";
import Main from "./Main";
import IntroductionNavigation from "./IntroductionNavigation2";
import SignUp from "../Signup";
import ForgotPassword from "../ForgetPassword";
import SignUpNavigator from "./SignupNavigation";

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Main"
        component={Main}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="IntroductionNavigation"
        component={IntroductionNavigation}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="SignUp"
        component={SignUpNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigation;
