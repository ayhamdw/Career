import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    marginVertical: 10,
  },
  SearchBarStyle: {
    flex: 1,
    padding: 15,
    fontSize: 16,
    backgroundColor: "#ddfcea",
  },
  searchIcon: {
    marginRight: 10,
  },
  placeholderText: {
    flex: 1,
    color: "#aaa",
    fontSize: 16,
  },
});

export default styles;
