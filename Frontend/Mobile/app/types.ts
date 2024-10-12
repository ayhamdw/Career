import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Introduction_1: undefined; // No params expected for this screen
  Introduction_2: undefined; // No params expected for this screen
};

// Define the navigation prop type based on the RootStackParamList
export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
