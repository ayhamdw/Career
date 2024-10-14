import { ThemeProvider } from "../assets/styles/ThemeContext";
import ProfileScreen from "./screens/Profile";

export default function HomeScreen() {
  return (
    <ThemeProvider>
      <ProfileScreen />
    </ThemeProvider>
  );
}
