import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import styles from "@/assets/styles/ProficientPage/ProfStyle";
interface ActionProps {}

const Action: React.FC<ActionProps> = () => {
  return (
    <View style={styles.actions}>
      <TouchableOpacity style={styles.button}>
        <Ionicons name="chatbubbles" size={20} color="#fff" />
        <Text style={styles.buttonText}>Message</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Ionicons name="send" size={20} color="#fff" />
        <Text style={styles.buttonText}>Request</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Action;
