import { View, Text, TextInput } from "react-native";
import React from "react";
import styles from "../../../assets/styles/SignupStyle";
interface EmailInputProps {
  placeholder: string;
  email: string;
  onChangeText: (value: string) => void;
}

const EmailInput: React.FC<EmailInputProps> = ({
  placeholder,
  email,
  onChangeText,
}) => {
  return (
    <TextInput
      style={styles.textInput}
      placeholder="Email"
      value={email.trim()}
      onChangeText={onChangeText}
      keyboardType="email-address"
    />
  );
};
export default EmailInput;
