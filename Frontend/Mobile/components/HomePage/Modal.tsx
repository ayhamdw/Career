import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Pressable,
} from "react-native";
import styles from "@/assets/styles/HomePage/HomePage";

const SearchModal = ({
  modalVisible,
  setModalVisible,
  search,
  setSearch,
  searchResults,
  chooseJob,
}) => {
  const handleSearch = (text) => {
    setSearch(text);
  };

  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => {
        setModalVisible(false);
        setSearch("");
      }}
    >
      <View style={styles.modalBackdrop}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Search for Jobs</Text>
          <TextInput
            style={styles.input}
            placeholder="Type to search"
            value={search}
            onChangeText={handleSearch}
            autoFocus={true}
          />
          <FlatList
            data={searchResults}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.listItem}
                onPress={() => chooseJob(item)}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={() =>
              search.trim() !== "" && (
                <Text style={styles.emptyText}>No results found</Text>
              )
            }
          />
          <Pressable
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};
export default SearchModal;
