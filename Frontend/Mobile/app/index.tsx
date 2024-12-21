import React from "react";
import App from "./screens/Navigators/App";
import Introduction1 from "./screens/introduction1";
import Introduction2 from "./screens/introduction2";
import { enableScreens } from "react-native-screens";
import Search from "@/components/HomePage/Modal";
import SearchModal from "@/components/HomePage/Modal";
export default function HomeScreen() {
  enableScreens();
  return <App />;
  // return <SearchModal isVisible={true} onClose={false} />;
}
