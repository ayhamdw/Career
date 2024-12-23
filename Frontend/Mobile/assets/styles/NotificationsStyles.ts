import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#58d68d",
    padding: 10,
    borderRadius: 8,
  },
  clearButton: {
    backgroundColor: "#cccccc",
    padding: 10,
    borderRadius: 8,
  },
  actionText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 5,
  },
  notificationCard: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginVertical: 8,
    overflow: "hidden",
  },
  accentLine: {
    width: 6,
    backgroundColor: "#58d68d",
  },
  cardContent: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  message: {
    color: "#666",
    marginBottom: 10,
  },
  timestamp: {
    color: "#aaa",
    fontSize: 12,
    textAlign: "right",
  },
});

export default styles;
