import { ThemeProvider } from "../assets/styles/ThemeContext";
import ProfileScreen from "./screens/Profile";
import ViewResume from "./screens/ViewResume";
import AppNavigator from "./screens/Profile";
import Introduction1 from "./screens/introduction1";
import Introduction2 from "./screens/introduction2";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function HomeScreen() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Introduction1">
        <Stack.Screen
          name="Introduction1"
          component={Introduction1}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Introduction2"
          component={Introduction2}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    // <ThemeProvider>
    //   <Introduction2 />
    // </ThemeProvider>
  );
}
