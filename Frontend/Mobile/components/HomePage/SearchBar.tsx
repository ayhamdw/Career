import { View, TextInput } from "react-native";
import React from "react";
import styles from "@/assets/styles/HomePage/SearchBarStyle";
import AntDesign from "@expo/vector-icons/AntDesign";

interface SearchBarProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  value,
  onChangeText,
}) => {
  return (
    <View style={styles.searchBarContainer}>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={styles.SearchBarStyle}
      />
      <AntDesign
        name="search1"
        size={20}
        color="gray"
        style={styles.searchIcon}
      />
    </View>
  );
};

export default SearchBar;
