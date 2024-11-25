import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
interface SaveButtonProps {
  title: string;
  handleSave: () => void;
}
const SaveButton: React.FC<SaveButtonProps> = ({ title, handleSave }) => {
  return (
    <View style={{ padding: 20 }}>
      <TouchableOpacity
        style={{
          marginTop: 20,
          borderRadius: 10,
          overflow: "hidden",
          elevation: 5,
          shadowColor: "#000",
          shadowOpacity: 0.2,
          shadowRadius: 8,
        }}
        onPress={handleSave}
      >
        <LinearGradient
          colors={["#58d68d", "#28a745"]}
          style={{
            paddingVertical: 15,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontWeight: "600",
            }}
          >
            {title}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};
export default SaveButton;
