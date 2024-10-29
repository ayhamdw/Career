import { StyleSheet } from "react-native";
import { COLORS } from "./Dimensions";
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.introductionColor,
    marginTop: -100,
    marginBottom: -100,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.introductionColor,
    marginTop: -100,
    marginBottom: -100,
  },
  textStyle: {
    fontSize: 40,
    fontWeight: "bold",
    color: COLORS.textColor,
  },
});
export default styles;
