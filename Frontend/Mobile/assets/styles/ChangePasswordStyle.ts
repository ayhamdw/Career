import { StyleSheet } from "react-native";
import { COLORS } from "./Dimensions";
const styles = StyleSheet.create({
  textStyle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    marginVertical: 10,
    padding: 10,
  },
  viewStyle: {
    marginVertical: 20,
    flexDirection: "column",
    backgroundColor: COLORS.pageBackgroundColor,
    height: "100%",
  },
  inputLabelStyle: {
    fontSize: 14,
    marginHorizontal: 15,
    color: COLORS.inputLabelColor,
  },
  textInputStyle: {
    marginHorizontal: 15,
    marginTop: 5,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.introductionColor,
    padding: 10,
    borderRadius: 5,
    height: 40,
    fontSize: 16,
  },
  buttonStyle: {
    backgroundColor: COLORS.introductionColor,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 20,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
});
export default styles;
