import { View, Text } from "react-native";
import React from "react";
import styles from "../../assets/styles/SignupStyle";
interface DropDownTitleProps {
  title: string;
}

const DropDownTitle: React.FC<DropDownTitleProps> = ({ title }) => {
  return <Text style={styles.label}>{title}</Text>;
};
export default DropDownTitle;
