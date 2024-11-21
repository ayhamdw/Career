import { TextInput } from "react-native";
import React from "react";
import styles from "../../../assets/styles/SignupStyle";

interface TextInputWrapperProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

const TextInputWrapper: React.FC<TextInputWrapperProps> = ({
  placeholder,
  value,
  onChangeText,
}) => {
  return (
    <TextInput
      style={styles.textInput}
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value.trim()}
    />
  );
};
export default TextInputWrapper;
