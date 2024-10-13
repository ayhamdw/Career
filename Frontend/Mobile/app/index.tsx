import { ThemeProvider } from "../assets/styles/ThemeContext";
import Login from "./screens/Login";
import Introduction_1 from "./screens/introduction_1";
import Introduction_2 from "./screens/introduction_2";
import SignUp from "./screens/Signup";
import ProfileScreen from "./screens/Profile";

export default function HomeScreen() {
  return (
    <ThemeProvider>
      <ProfileScreen />
    </ThemeProvider>
  );
}
