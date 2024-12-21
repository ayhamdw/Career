import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const SearchModal = ({ isVisible, onClose, searchValue, onSearchChange }) => {
  const [filteredResults, setFilteredResults] = useState([]);
  const data = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Mobile Developer",
    "Data Scientist",
    "UI/UX Designer",
    "DevOps Engineer",
    "Product Manager",
  ];

  useEffect(() => {
    if (searchValue.trim() === "") {
      setFilteredResults([]);
    } else {
      const results = data.filter((item) =>
        item.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredResults(results);
    }
  }, [searchValue]);

  return (
    <Modal visible={isVisible} animationType="fade" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Search Jobs</Text>
            <TouchableOpacity onPress={onClose}>
              <FontAwesome name="times" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.searchInputContainer}>
            <FontAwesome
              name="search"
              size={20}
              color="#888"
              style={styles.icon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Type to search..."
              value={searchValue}
              onChangeText={onSearchChange} // Controlled input
              placeholderTextColor="#aaa"
            />
          </View>

          <FlatList
            data={filteredResults}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.listItem}>
                <Text style={styles.listItemText}>{item}</Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={() =>
              searchValue.trim() !== "" && (
                <Text style={styles.emptyText}>No results found</Text>
              )
            }
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    maxHeight: "80%",
    backgroundColor: "#fff",
    borderRadius: 20,
    overflow: "hidden",
  },
  header: {
    backgroundColor: "#4A90E2",
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
    marginHorizontal: 20,
    backgroundColor: "#f1f1f1",
    borderRadius: 30,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: "#333",
    paddingHorizontal: 10,
  },
  icon: {
    marginHorizontal: 5,
  },
  listItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  listItemText: {
    fontSize: 16,
    color: "#333",
  },
  emptyText: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 16,
    color: "#999",
  },
});

export default SearchModal;
