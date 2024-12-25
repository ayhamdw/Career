import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#fff",
  },
  textStyle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#34495e",
    fontFamily: "System",
  },
  buttonNotificationStyle: {
    position: "relative",
    padding: 5,
  },
  badgeStyle: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "#ff3147",
    borderRadius: 10,
    width: 22,
    height: 22,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#ff3147",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default styles;
