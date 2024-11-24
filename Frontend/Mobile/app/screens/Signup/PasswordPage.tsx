import { View, KeyboardAvoidingView, Platform, Alert } from "react-native";
import React, { useState } from "react";
import { SignUpStackParamList } from "./types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import styles from "../../../assets/styles/SignupStyle";
import axios from "axios";
import { ayhamWifiUrl } from "@/constants/Urls";
import Header from "@/components/General Components/Header";
import ButtonGroup from "@/components/General Components/ButtonGroup";
import Password from "@/components/Password/Password";

type PasswordPageProps = NativeStackScreenProps<
  SignUpStackParamList,
  "PasswordPage"
>;

const PasswordPage: React.FC<PasswordPageProps> = ({ navigation, route }) => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const {
    firstName,
    lastName,
    username,
    gender,
    dateOfBirth,
    email,
    city,
    latitude,
    longitude,
    category,
    career,
    bio,
    experience,
  } = route.params;

  const handlePrevious = () => {
    navigation.goBack();
  };
  const handleNext = async () => {
    if (!password || !confirmPassword) {
      alert("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post(`${ayhamWifiUrl}/api/auth/register`, {
        username,
        email,
        password,
        role: "user",
        gender,
        city,
        dateOfBirth,
        career,
        careerCategory: category,
        profile: {
          firstName,
          lastName,
          bio,
          experience,
          phone: "+970594387038",
          location: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
        },
        verificationStatus: false,
        tokens: [],
        friendRequests: [],
        friends: [],
        sendRequests: [],
        resetCode: 0,
        resetCodeExpires: new Date().toISOString(),
      });
      console.log("inside");
      if (response.status === 201) {
        console.log("Done");
        Alert.alert(
          "🎉 Success 🎉",
          "Your account has been created successfully! 🚀 Ready to explore amazing features?",
          [
            {
              text: "Let's Go! 🚀",
              onPress: () => console.log("User navigated to the app"),
            },
          ]
        );
        navigation.navigate("MainNavigation");
      }
    } catch (error) {
      console.log("Error");
      Alert.alert(
        "❌ Oops!",
        "Something went wrong while creating your account. 😔 Please try again or check your details.",
        [
          {
            text: "Retry 🔄",
            onPress: () => console.log("User attempts to retry"),
          },
          { text: "Cancel ❌", style: "cancel" },
        ]
      );
    }
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <View style={styles.container}>
        <Header title="Password Page" />
        <Password
          placeholder="Enter password"
          password={password}
          onChangeText={setPassword}
        />
        <Password
          placeholder="Confirm Password"
          password={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <ButtonGroup onPrevious={handlePrevious} onNext={handleNext} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default PasswordPage;
