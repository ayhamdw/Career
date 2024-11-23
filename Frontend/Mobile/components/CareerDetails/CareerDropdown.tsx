import React from "react";
import styles from "../../assets/styles/SignupStyle";
import { Dropdown } from "react-native-element-dropdown";
interface CareerDropdownProps {
  selectedCategoryCareers: {
    label: string;
    value: string;
  }[];
  careerFocus: boolean;
  career: string;
  setCareer: (value: string) => void;
  setCareerFocus: (value: boolean) => void;
}

const CareerDropdown: React.FC<CareerDropdownProps> = ({
  selectedCategoryCareers,
  career,
  careerFocus,
  setCareer,
  setCareerFocus,
}) => {
  return (
    <Dropdown
      style={[styles.dropdown, { borderColor: "#58d68d", borderWidth: 1 }]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={selectedCategoryCareers}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={!careerFocus ? "Select Career" : "..."}
      searchPlaceholder="Search Career..."
      value={career}
      onFocus={() => setCareerFocus(true)}
      onBlur={() => setCareerFocus(false)}
      onChange={(item) => {
        setCareer(item.value);
        setCareerFocus(false);
      }}
    />
  );
};

export default CareerDropdown;
