import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import styles from "@/assets/styles/HomePage/SearchBarStyle";
import AntDesign from "@expo/vector-icons/AntDesign";

interface SearchBarProps {
  placeholder: string;
  onPress: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, onPress }) => {
  return (
    <TouchableOpacity style={styles.searchBarContainer} onPress={onPress}>
      <Text style={styles.placeholderText}>{placeholder}</Text>
      <AntDesign
        name="search1"
        size={20}
        color="gray"
        style={styles.searchIcon}
      />
    </TouchableOpacity>
  );
};

export default SearchBar;
