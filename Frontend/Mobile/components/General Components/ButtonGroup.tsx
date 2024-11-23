import { View, Text, Pressable } from "react-native";
import React from "react";
import styles from "../../assets/styles/SignupStyle";

interface ButtonGroupProps {
  onPrevious: () => void;
  onNext: () => void;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ onPrevious, onNext }) => {
  return (
    <View style={styles.buttonContainer}>
      <Pressable onPress={onPrevious} style={styles.button}>
        <Text style={styles.buttonText}>Previous</Text>
      </Pressable>
      <Pressable onPress={onNext} style={styles.button}>
        <Text style={styles.buttonText}>Next</Text>
      </Pressable>
    </View>
  );
};
export default ButtonGroup;
