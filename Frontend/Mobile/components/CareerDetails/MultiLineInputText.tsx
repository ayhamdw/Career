import { View, Text, TextInput } from "react-native";
import React from "react";
import styles from "@/assets/styles/SignupStyle";
interface MultiLineInputTextProps {
  onChangeText: (text: string) => void;
  value: string;
}
const MultiLineInputText: React.FC<MultiLineInputTextProps> = ({
  value,
  onChangeText,
}) => {
  return (
    <TextInput
      multiline={true}
      style={[styles.textInput, { height: 100 }]}
      onChangeText={onChangeText}
      value={value}
    />
  );
};

export default MultiLineInputText;
