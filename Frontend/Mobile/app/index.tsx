import { ThemeProvider } from "../assets/styles/ThemeContext";
import Login from "./Login";
import Introduction_1 from "./introduction_1";
import Introduction_2 from "./introduction_2";
import SignUp from "./Signup";

export default function HomeScreen() {
  return (
    <ThemeProvider>
      <SignUp />
    </ThemeProvider>
  );
}
