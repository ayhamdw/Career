import { StyleSheet } from "react-native";
import { COLORS, SIZE } from "./Dimensions";
const styles = StyleSheet.create({
  imageStyle: {
    width: SIZE.width - 80,
    height: 400,
    resizeMode: "contain",
    justifyContent: "center",
  },
  containerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  textStyle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "NotoSerif Condensed-Black",
  },
  viewStyle: {
    flex: 1,
    alignItems: "center",
    padding: 15,
    paddingTop: 90,
    backgroundColor: "white",
  },
  titleStyle: {
    fontSize: SIZE.h1,
    fontWeight: "bold",
    marginBottom: 10,
    color: COLORS.introductionButtonColor,
  },
  descriptionStyle: {
    fontSize: SIZE.h4,
    paddingTop: 10,
    color: COLORS.introductionButtonColor,
    textAlign: "center",
    fontFamily: "Cairo Bold",
  },
  nextAndSkipButtonViewStyle: {
    padding: 12,
  },
  nextAndSkipButtonStyle: {
    color: "#000",
    fontWeight: "bold",
    fontSize: SIZE.h4,
  },
});
export default styles;
