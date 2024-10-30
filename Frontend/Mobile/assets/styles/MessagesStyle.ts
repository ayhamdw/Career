import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    padding: 15,
  },
  chatTextStyle: {
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "center",
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
    padding: 10,
    borderRadius: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  imageStyle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#f0f0f0",
    marginRight: 15,
  },
  messageBubble: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  messageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  userName: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#333",
  },
  numberOfMessages: {
    backgroundColor: "#58d68d",
    color: "#fff",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
    minWidth: 35,
    lineHeight: 18,
  },
  messageText: {
    fontSize: 16,
    color: "#666",
    lineHeight: 22,
  },
});

export default styles;
