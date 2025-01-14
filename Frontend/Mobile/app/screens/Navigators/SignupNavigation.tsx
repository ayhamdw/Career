import { createStackNavigator } from "@react-navigation/stack";
import BasicInfo from "../Signup/basicInfo";
import PersonalDetails from "../Signup/PersonalDetails";
import Verification from "../Signup/Verification";
import AdditionalInfo from "../Signup/AdditionalInfo";
import CareerDetails from "../Signup/CareerDetails";
import PasswordPage from "../Signup/PasswordPage";
import Login from "../Login/Login";
import MainNavigation from "./MainNavigation";

const Stack = createStackNavigator();

const SignUpNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BasicInfo"
        component={BasicInfo}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PersonalDetails"
        component={PersonalDetails}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Verification"
        component={Verification}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AdditionalInfo"
        component={AdditionalInfo}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CareerDetails"
        component={CareerDetails}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PasswordPage"
        component={PasswordPage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MainNavigation"
        component={MainNavigation}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default SignUpNavigator;
