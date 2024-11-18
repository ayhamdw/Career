// navigation.ts
import { createNavigationContainerRef } from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef();

export const navigate = (name: string, params?: any, replace?: boolean) => {
  if (navigationRef.isReady()) {
    if (replace) {
      navigationRef.replace(name, params);
    } else {
      navigationRef.navigate(name, params);
    }
  } else {
    console.log("Navigation not ready");
  }
};
