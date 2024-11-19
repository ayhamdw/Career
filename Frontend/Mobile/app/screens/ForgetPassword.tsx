import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../assets/styles/ForgotPasswordStyle";
import axios, { AxiosError } from "axios";
import Toast from "react-native-toast-message";
import { ScrollView } from "react-native-gesture-handler";
import { ayhamWifiUrl } from "../../constants/Urls";

export default function ForgotPassword() {
  const [username, setUsername] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSendCode = async () => {
    if (username == "") {
      Alert.alert("Error", "Please enter your username");
      return;
    }
    const response = await axios.post(
      `${ayhamWifiUrl}/api/password/forgotPassword`,
      { username }
    );
    if (response.status === 200) {
      Alert.alert(
        "🔑 We've Sent the Code! 🔑",
        "A verification code has been sent to the email associated with this username. Please check your inbox (and spam folder) to continue.",
        [{ text: "Got it", onPress: () => console.log("Alert closed") }],
        { cancelable: false }
      );
    }
  };

  const handleResetPassword = async () => {
    if (code === "" || password == "" || confirmPassword == "") {
      Alert.alert("Error", "Please fill in all fields");
    }
    if (password === confirmPassword) {
      const data = {
        username,
        code,
        password,
      };
      try {
        const response = await axios.post(
          `${ayhamWifiUrl}/api/password/resetPassword`,
          { data }
        );
        if (response.status === 200) {
          Alert.alert(
            "✅ Password Changed Successfully! ✅",
            "Your password has been updated. You can now use your new password to log in.",
            [
              {
                text: "Got it",
                onPress: () => console.log("Password change alert closed"),
              },
            ],
            { cancelable: false }
          );
        }
      } catch (error) {
        const err = error as AxiosError;
        if (err.response?.status === 500) {
          Alert.alert(
            "❌ Incorrect Code ❌",
            "The Code you entered is incorrect. Please try again.",
            [
              {
                text: "Retry",
                onPress: () => console.log("Retry alert closed"),
              },
            ],
            { cancelable: false }
          );
        } else if (err.response?.status === 403) {
          Alert.alert(
            "⏰ Time Code Expired ⏰",
            "The verification code has expired. Please request a new code to continue.",
            [
              {
                text: "Request New Code",
                onPress: () => console.log("Expired code alert closed"),
              },
            ],
            { cancelable: false }
          );
        }
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <Text style={styles.headerText}>Forgot Password</Text>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Enter your username"
          />

          <TouchableOpacity style={styles.buttonSmall} onPress={handleSendCode}>
            <Text style={styles.buttonText}>Send Code</Text>
          </TouchableOpacity>

          <Text style={styles.label}>Verification Code</Text>
          <TextInput
            style={styles.input}
            value={code}
            onChangeText={setCode}
            placeholder="Enter the 6-digit code"
            keyboardType="numeric"
            maxLength={6}
          />

          <Text style={styles.label}>New Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your new password"
            secureTextEntry
          />

          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm your new password"
            secureTextEntry
          />

          <TouchableOpacity
            style={styles.buttonSmall}
            onPress={handleResetPassword}
          >
            <Text style={styles.buttonText}>Reset Password</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
