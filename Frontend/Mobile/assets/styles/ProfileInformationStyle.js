import { StyleSheet } from "react-native";
import { COLORS } from "./Dimensions";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    padding: 16,
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  formContainer: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 5,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  textArea: {
    height: 100,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
    textAlignVertical: "top",
  },
  listItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  listItem: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  removeButton: {
    marginLeft: 10,
    backgroundColor: "#FF6347",
    padding: 10,
    borderRadius: 5,
  },
  removeButtonText: {
    color: "white",
  },
  addButton: {
    backgroundColor: COLORS.buttonBackgroundColor,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    width: "80%",
    alignSelf: "center",
  },
  addButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  button: {
    backgroundColor: COLORS.buttonBackgroundColor,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 30,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
});
export default styles;
