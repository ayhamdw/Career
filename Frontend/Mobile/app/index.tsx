import { ThemeProvider } from "../assets/styles/ThemeContext";
import ProfileScreen from "./screens/Profile";
import View_Resume from "./screens/View_Resume";

export default function HomeScreen() {
  return (
    <ThemeProvider>
      <View_Resume />
    </ThemeProvider>
  );
}
