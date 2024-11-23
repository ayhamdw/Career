import { View, Text } from "react-native";
import React from "react";
import { Dropdown } from "react-native-element-dropdown";
import styles from "../../assets/styles/SignupStyle";
interface DropDownListProps {
  categoryDate: { label: string; value: string }[];
  category: string;
  setCategory: (value: string) => void;
  categoryFocus: boolean;
  setCategoryFocus: (value: boolean) => void;
  setCareer: (value: string) => void;
  categories: {
    category: string;
    careers: { label: string; value: string }[];
  }[];
}

const CategoryDropdown: React.FC<DropDownListProps> = ({
  category,
  setCategory,
  categoryFocus,
  setCategoryFocus,
  setCareer,
  categories,
}) => {
  return (
    <Dropdown
      style={[styles.dropdown, { borderColor: "#58d68d", borderWidth: 1 }]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={categories.map((cat) => ({
        label: cat.category,
        value: cat.category,
      }))}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={!categoryFocus ? "Select Category" : "..."}
      searchPlaceholder="Search Category..."
      value={category}
      onFocus={() => setCategoryFocus(true)}
      onBlur={() => setCategoryFocus(false)}
      onChange={(item) => {
        setCategory(item.value);
        setCategoryFocus(false);
        setCareer("");
      }}
    />
  );
};
export default CategoryDropdown;
