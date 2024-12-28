import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../Login";
import Main from "./Main";
import IntroductionNavigation from "./IntroductionNavigation2";
import ForgotPassword from "../ForgetPassword";
import SignUpNavigator from "./SignupNavigation";
import JobList from "@/components/HomePage/JobList";
import Notifications from "../Setting/Notifications";
import PostDetails from "../Community/postDetails";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CreatePost from "../Community/CreatePost";

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
      <Stack.Screen
        name="JobList"
        component={JobList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="postDetails"
        component={PostDetails}
        options={{ headerShadowVisible: false }}
      />

      <Stack.Screen
        name="createPost"
        component={CreatePost}
        options={{ headerShadowVisible: false }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigation;
