import { View, Text, TextInput } from "react-native";
import React from "react";
import styles from "@/assets/styles/SignupStyle";
interface PasswordProps {
  password: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}
const Password: React.FC<PasswordProps> = ({
  password,
  onChangeText,
  placeholder,
}) => {
  return (
    <TextInput
      style={styles.textInput}
      placeholder={placeholder}
      value={password}
      onChangeText={onChangeText}
      secureTextEntry={true}
    />
  );
};

export default Password;
