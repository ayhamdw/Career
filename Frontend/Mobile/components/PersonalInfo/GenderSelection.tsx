import { View, Text, Pressable } from "react-native";
import React from "react";
import styles from "../../assets/styles/SignupStyle";
interface GenderSelectionProps {
  gender: string;
  setGender: (text: string) => void;
}

const GenderSelection: React.FC<GenderSelectionProps> = ({
  gender,
  setGender,
}) => {
  return (
    <View style={styles.genderSelectionContainer}>
      <Pressable
        onPress={() => setGender("Male")}
        style={
          gender === "Male" ? styles.selectedButton : styles.unselectedButton
        }
      >
        <Text
          style={
            gender === "Male"
              ? styles.selectedButtonText
              : styles.unselectedButtonText
          }
        >
          Male
        </Text>
      </Pressable>
      <Pressable
        onPress={() => setGender("Female")}
        style={
          gender === "Female" ? styles.selectedButton : styles.unselectedButton
        }
      >
        <Text
          style={
            gender === "Female"
              ? styles.selectedButtonText
              : styles.unselectedButtonText
          }
        >
          Female
        </Text>
      </Pressable>
    </View>
  );
};
export default GenderSelection;
