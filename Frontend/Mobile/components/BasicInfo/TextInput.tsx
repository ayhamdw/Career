import { View, Text, TextInput } from "react-native";
import React from "react";
import styles from "../../assets/styles/SignupStyle";

interface TextInputDataProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

const TextInputData: React.FC<TextInputDataProps> = ({
  placeholder,
  value,
  onChangeText,
}) => {
  return (
    <TextInput
      style={styles.textInput}
      placeholder={placeholder}
      value={value.trim()}
      onChangeText={onChangeText}
    />
  );
};
export default TextInputData;
