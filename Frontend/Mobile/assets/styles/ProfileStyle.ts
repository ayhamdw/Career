import { StyleSheet } from "react-native";
import { COLORS } from "./Dimensions";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: COLORS.introductionColor,
    height: 250,
    marginBottom: -100,
    marginTop: -100,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  profileCenter: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
  },
  profileContainer: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    width: "90%",
    elevation: 5,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.textColor,
  },
  jobTitle: {
    fontSize: 16,
    color: COLORS.jobTitleTextColor,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: "100%",
  },
  stats: {
    alignItems: "center",
    flex: 1,
  },
  statsCount: {
    fontSize: 18,
    fontWeight: "bold",
  },
  statsLabel: {
    color: COLORS.forgetPasswordLabelColor,
  },
  optionCenter: {
    justifyContent: "center",
    alignItems: "center",
  },
  optionsContainer: {
    marginTop: 265,
    paddingHorizontal: 20,
    width: "90%",
    backgroundColor: "white",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
    color: COLORS.textColor,
  },
  iconStyle: {
    fontSize: 24,
    color: "black",
  },
});

export default styles;
