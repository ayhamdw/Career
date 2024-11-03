import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../assets/styles/ForgotPasswordStyle";
export default function ForgotPassword() {
  const [username, setUsername] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSendCode = () => {
    console.log("Code sent to email associated with:", username);
  };

  const handleResetPassword = () => {
    if (password === confirmPassword) {
      console.log("Password reset successful");
    } else {
      console.log("Passwords do not match");
    }
  };

  return (
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
  );
}
