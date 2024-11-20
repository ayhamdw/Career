import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInputComponent,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { SignUpStackParamList } from "./types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import styles from "../../../assets/styles/SignupStyle";

type PasswordPageProps = NativeStackScreenProps<
  SignUpStackParamList,
  "PasswordPage"
>;

const PasswordPage: React.FC<PasswordPageProps> = ({ navigation, route }) => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const handlePrevious = () => {
    navigation.goBack();
  };
  const handleNext = () => {
    if (!password || !confirmPassword) {
      alert("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log("Done");
  };
  console.log(route.params);
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <View style={styles.container}>
        <Text style={styles.headerText}>Password Page</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry={true}
        />
        <View style={[styles.buttonContainer]}>
          <Pressable onPress={handlePrevious} style={styles.button}>
            <Text style={styles.buttonText}>Previous</Text>
          </Pressable>

          <Pressable onPress={handleNext} style={styles.button}>
            <Text style={styles.buttonText}>Next</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default PasswordPage;
