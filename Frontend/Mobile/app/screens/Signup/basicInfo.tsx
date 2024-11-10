import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import styles from "../../../assets/styles/SignupStyle";
import { SignUpStackParamList } from "./types";

type BasicInfoProps = NativeStackScreenProps<SignUpStackParamList, "BasicInfo">;

const BasicInfo: React.FC<BasicInfoProps> = ({ navigation }) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const handleNext = () => {
    if (firstName && lastName && username) {
      navigation.navigate("PersonalDetails", {
        firstName,
        lastName,
        username,
      });
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          color: "#333",
          marginBottom: 20,
        }}
      >
        Welcome! Let's get started.
      </Text>
      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        style={styles.textInput}
      />
      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
        style={styles.textInput}
      />
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.textInput}
      />
      <Pressable onPress={handleNext} style={styles.button}>
        <Text style={styles.buttonText}>Next</Text>
      </Pressable>
    </View>
  );
};

export default BasicInfo;
