import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import styles from "@/assets/styles/ProficientPage/ProfStyle";
interface ActionProps {
  onRequestPress: () => void;
  onMessagePress: () => void;
}

const Action: React.FC<ActionProps> = ({ onRequestPress, onMessagePress }) => {
  return (
    <View style={styles.actions}>
      <TouchableOpacity style={styles.button} onPress={onMessagePress}>
        <Ionicons name="chatbubbles" size={20} color="#fff" />
        <Text style={styles.buttonText}>Message</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onRequestPress}>
        <Ionicons name="send" size={20} color="#fff" />
        <Text style={styles.buttonText}>Request</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Action;
