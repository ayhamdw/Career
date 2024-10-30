import { StyleSheet } from "react-native";
import { COLORS } from "./Dimensions";
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.pageBackgroundColor,
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  headerText: {
    fontSize: 26,
    fontWeight: "bold",
    color: COLORS.textColor,
    textAlign: "center",
    marginTop: -30,
    marginBottom: 30,
  },
  label: {
    alignSelf: "flex-start",
    marginLeft: 22,
    fontSize: 16,
    color: COLORS.forgetPasswordLabelColor,
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    width: "90%",
    padding: 12,
    backgroundColor: COLORS.pageBackgroundColor,
    borderRadius: 10,
    marginVertical: 10,
    borderColor: COLORS.textInputBorderColor,
    borderWidth: 1,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    alignSelf: "center",
    marginHorizontal: 10,
  },
  buttonSmall: {
    backgroundColor: COLORS.buttonBackgroundColor,
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
  buttonText: {
    color: COLORS.textColor,
    fontSize: 16,
    fontWeight: "600",
  },
});

export default styles;
