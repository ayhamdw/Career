import { View, Text, TextInput } from "react-native";
import React from "react";
import styles from "@/assets/styles/ProfileInformationStyle";
interface TextFieldComponentProps {
  placeholder: string;
  label: string;
  value: string;
  onChangeText: (text: string) => void;
}

const TextFieldComponent: React.FC<TextFieldComponentProps> = ({
  placeholder,
  label,
  value,
  onChangeText,
}) => {
  return (
    <View style={{ width: "90%", alignSelf: "center" }}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
      />
    </View>
  );
};
export default TextFieldComponent;
