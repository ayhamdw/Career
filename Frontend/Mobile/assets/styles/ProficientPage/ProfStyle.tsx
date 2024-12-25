import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  header: {
    alignItems: "center",
    paddingVertical: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 10,
    height: 160,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#fff",
    marginTop: -20,
  },
  headerContent: {
    alignItems: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },
  career: {
    fontSize: 16,
    color: "#e3f2fd",
  },
  content: {
    padding: 20,
  },
  profileSection: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    elevation: 4,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00b09b",
    marginBottom: 15,
  },
  bio: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
  },
  details: {
    fontSize: 16,
    color: "#333",
  },
  reviewCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
  },
  reviewerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  reviewContent: {
    flex: 1,
  },
  reviewerName: {
    fontWeight: "bold",
    color: "#00b09b",
  },
  rating: {
    fontSize: 14,
    color: "#f39c12",
  },
  reviewText: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
    backgroundColor: "#fff",
    marginBottom: 20,
    borderRadius: 15,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#00b09b",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    elevation: 4,
  },
  buttonText: {
    marginLeft: 10,
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
export default styles;
