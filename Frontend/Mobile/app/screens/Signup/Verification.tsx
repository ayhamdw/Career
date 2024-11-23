import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import styles from "../../../assets/styles/SignupStyle";
import { SignUpStackParamList } from "./types";
import Header from "@/components/General Components/Header";
import VerificationComponent from "@/components/Verification/Verification";
import EnterEmail from "@/components/Verification/EnterEmail";
type VerificationProps = NativeStackScreenProps<
  SignUpStackParamList,
  "Verification"
>;

const Verification: React.FC<VerificationProps> = ({ navigation, route }) => {
  const { firstName, lastName, username, gender, dateOfBirth, email, code } =
    route.params;
  const [verificationCode, setVerificationCode] = useState<string>("");

  const handleNext = () => {
    if (verificationCode) {
      if (verificationCode.toString() === code.toString()) {
        navigation.navigate("AdditionalInfo", {
          firstName,
          lastName,
          username,
          gender,
          dateOfBirth,
          email,
        });
      } else {
        alert("Verification Code Not Correct");
      }
    } else {
      alert("Please enter the verification code");
    }
  };
  const handlePrevious = () => {
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
    >
      <View style={styles.container}>
        <View>
          <Header title="Verification" />
          <EnterEmail email={email} />
          <VerificationComponent
            placeholder="Verification Code"
            verificationCode={verificationCode}
            onChangeText={setVerificationCode}
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
      </View>
    </KeyboardAvoidingView>
  );
};

export default Verification;
