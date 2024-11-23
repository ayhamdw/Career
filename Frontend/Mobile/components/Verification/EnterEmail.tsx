import { View, Text } from "react-native";
import React from "react";

interface EnterEmailProps {
  email: string;
}

const EnterEmail: React.FC<EnterEmailProps> = ({ email }) => {
  return (
    <Text style={{ marginBottom: 20, fontSize: 16, fontWeight: 500 }}>
      Write Code That We send for {email}
    </Text>
  );
};

export default EnterEmail;
