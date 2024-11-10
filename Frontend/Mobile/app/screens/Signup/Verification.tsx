import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import styles from "../../../assets/styles/SignupStyle";
import { SignUpStackParamList } from "./types";

type VerificationProps = NativeStackScreenProps<
  SignUpStackParamList,
  "Verification"
>;

const Verification: React.FC<VerificationProps> = ({ navigation, route }) => {
  const { firstName, lastName, username, gender, dateOfBirth, email } =
    route.params;
  const [verificationCode, setVerificationCode] = useState<string>("");

  const handleNext = () => {
    if (verificationCode) {
      navigation.navigate("AdditionalInfo", {
        firstName,
        lastName,
        username,
        gender,
        dateOfBirth,
        email,
      });
    } else {
      alert("Please enter the verification code");
    }
  };
  const handlePrevious = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Verification</Text>
      <Text style={{ marginBottom: 20, fontSize: 16, fontWeight: 500 }}>
        Write Code That We send for {email}
      </Text>
      <TextInput
        placeholder="Verification Code"
        value={verificationCode}
        onChangeText={setVerificationCode}
        style={styles.textInput}
      />
      <View style={styles.buttonContainer}>
        <Pressable onPress={handlePrevious} style={styles.button}>
          <Text style={styles.buttonText}>Previous</Text>
        </Pressable>
        <Pressable onPress={handleNext} style={styles.button}>
          <Text style={styles.buttonText}>Next</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Verification;
