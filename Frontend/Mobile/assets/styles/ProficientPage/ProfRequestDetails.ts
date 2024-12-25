import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  radioContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  radioButton: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 4,
  },
  radioButtonActive: {
    backgroundColor: "#007bff",
    borderColor: "#007bff",
  },
  radioText: {
    fontSize: 14,
    color: "#333",
  },
  radioTextActive: {
    color: "#fff",
    fontWeight: "bold",
  },
  list: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    elevation: 2, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  shadow: {
    elevation: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginLeft: 8,
  },
  proficientBadge: {
    backgroundColor: "#28a745", 
  },
  projectBadge: {
    backgroundColor: "#17a2b8", 
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
  },
  profession: {
    fontSize: 14,
    color: "#666",
  },
  email: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  location: {
    fontSize: 14,
    color: "#888",
    marginLeft: 4,
  },
  time: {
    fontSize: 14,
    color: "#888",
    marginLeft: 4,
  },
  projectInfo: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    backgroundColor: "#f0f0f0",
    padding: 8,
    borderRadius: 8,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 12,
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 4,
  },
  acceptButton: {
    backgroundColor: "#28a745",
  },
  rejectButton: {
    backgroundColor: "#dc3545",
  },
  cancelButton: {
    backgroundColor: "#ffc107",
  },
  completeButton: {
    backgroundColor: "#007bff",
  },
  mapButton: {
    backgroundColor: "#17a2b8",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default styles;
