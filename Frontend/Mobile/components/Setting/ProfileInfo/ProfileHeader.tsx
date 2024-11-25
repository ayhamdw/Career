import { Text } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

interface ProfileHeaderProps {
  title: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ title }) => {
  return (
    <LinearGradient
      colors={["#58d68d", "#28a745"]}
      style={{
        height: 150,
        justifyContent: "center",
        alignItems: "center",
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 28,
          fontWeight: "bold",
          marginTop: 20,
        }}
      >
        {title}
      </Text>
    </LinearGradient>
  );
};
export default ProfileHeader;
