import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f6f6f6",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    color: "#000",
  },
  scrollView: {
    paddingHorizontal: 15,
    paddingBottom: 30,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 15,
    marginVertical: 10,
    shadowColor: "#58d68d",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 5,
    borderLeftWidth: 5,
    borderColor: "#58d68d",
  },
  imageStyle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#58d68d",
  },
  userInfo: {
    flex: 1,
    marginLeft: 15,
    justifyContent: "center",
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  userEmail: {
    fontSize: 14,
    color: "gray",
    marginTop: 4,
  },
  requestButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#58d68d",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 5,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
  export default styles;