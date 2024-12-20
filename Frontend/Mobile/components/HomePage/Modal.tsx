import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";

const SearchModal = ({ isVisible, onClose }) => {
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = ["90%"];
  const [searchQuery, setSearchQuery] = useState("");
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
    if (isVisible && sheetRef.current) {
      sheetRef.current.expand();
    }
  }, [isVisible]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredResults([]);
    } else {
      const results = data.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredResults(results);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setFilteredResults([]);
  };

  const closeBottomSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.close();
      onClose();
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <BottomSheet ref={sheetRef} snapPoints={snapPoints}>
          <BottomSheetView style={styles.bottomSheetContent}>
            <TouchableOpacity
              onPress={closeBottomSheet}
              style={styles.closeButton}
            >
              <FontAwesome name="times" size={24} color="#888" />
            </TouchableOpacity>

            <Text style={styles.searchLabel}>Search</Text>

            <View style={styles.searchInputContainer}>
              <FontAwesome
                name="search"
                size={20}
                color="#888"
                style={styles.searchIcon}
              />

              <TextInput
                style={styles.searchInput}
                placeholder="Search for a job..."
                value={searchQuery}
                onChangeText={handleSearch}
                autoFocus={true}
              />

              {searchQuery !== "" && (
                <TouchableOpacity
                  onPress={handleClearSearch}
                  style={styles.clearIcon}
                >
                  <FontAwesome name="times" size={20} color="#888" />
                </TouchableOpacity>
              )}
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
                searchQuery.trim() !== "" && (
                  <Text style={styles.emptyText}>No results found</Text>
                )
              }
            />
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  bottomSheetContent: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  searchLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#555",
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#f1f1f1",
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#333",
  },
  clearIcon: {
    paddingLeft: 10,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  listItem: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  listItemText: {
    fontSize: 16,
    color: "#333",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#999",
  },
});

export default SearchModal;
