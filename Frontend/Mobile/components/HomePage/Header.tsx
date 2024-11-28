import { View, Text, Touchable, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import styles from "@/assets/styles/HomePage/HeaderStyle";
interface HeaderProps {
  name: string;
}

const Header: React.FC<HeaderProps> = ({ name }) => {
  return (
    <View style={styles.headerStyle}>
      <Text style={styles.textStyle}>Hello, {name}!</Text>
      <TouchableOpacity style={styles.buttonNotificationStyle}>
        <Ionicons name="notifications" size={24} color="#58d68d" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
