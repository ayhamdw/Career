import { ThemeProvider } from "../assets/styles/ThemeContext";

// import {Colors} from '../../constants';
import Login from "./Login";
import Introduction_1 from "./introduction_1";
import Introduction_2 from "./introduction_2";
export default function HomeScreen() {
  return (
    <ThemeProvider>
      <Introduction_2 />
    </ThemeProvider>
  );
}
