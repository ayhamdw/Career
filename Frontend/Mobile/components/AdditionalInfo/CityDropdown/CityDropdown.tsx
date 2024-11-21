import React from "react";
import { Dropdown } from "react-native-element-dropdown";
import styles from "../../../assets/styles/SignupStyle";
interface CityDropdownProps {
  cities: { label: string; value: string }[];
  city: string;
  setCity: (city: string) => void;
  setCityFocus: (cityFoucs: boolean) => void;
  cityFocus: boolean;
}

const CityDropdown: React.FC<CityDropdownProps> = ({
  cities,
  city,
  setCity,
  setCityFocus,
  cityFocus,
}) => {
  return (
    <Dropdown
      style={[styles.dropdown, { borderColor: "#58d68d", borderWidth: 1 }]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={cities}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={!cityFocus ? "Select City" : "..."}
      searchPlaceholder="Search..."
      value={city}
      onFocus={() => setCityFocus(true)}
      onBlur={() => setCityFocus(false)}
      onChange={(item) => {
        setCity(item.value);
        setCityFocus(false);
      }}
    />
  );
};
export default CityDropdown;
