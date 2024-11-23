import { Text } from "react-native";
import React from "react";
import styles from "../../assets/styles/SignupStyle";
interface HeaderProps {
  title: string;
}
const Header: React.FC<HeaderProps> = ({ title }) => {
  return <Text style={styles.headerText}>{title}</Text>;
};
export default Header;
