import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import styles from "@/assets/styles/ProficientPage/ProfStyle";
interface ActionProps {
  onRequestPress: () => void;
  onMessagePress: () => void;
  onProjectPress: () => void;
}

const Action: React.FC<ActionProps> = ({
  onRequestPress,
  onMessagePress,
  onProjectPress,
}) => {
  return (
    <View style={styles.actions}>
      <TouchableOpacity style={styles.button} onPress={onMessagePress}>
        <Ionicons name="chatbubbles" size={24} color="#fff" />
        <Text style={styles.buttonText}>Message</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onRequestPress}>
        <Ionicons name="send" size={24} color="#fff" />
        <Text style={styles.buttonText}>Request</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.projectButton} onPress={onProjectPress}>
        <MaterialIcons name="home-work" size={28} color="#fff" />
        <Text style={styles.buttonText}>Projects</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Action;
