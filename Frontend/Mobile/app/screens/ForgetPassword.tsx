import React, { useState } from "react";
import { Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS } from "../../assets/styles/Dimensions";
import { SafeAreaView } from "react-native-safe-area-context";
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.pageBackgroundColor,
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  headerText: {
    fontSize: 26,
    fontWeight: "bold",
    color: COLORS.textColor,
    textAlign: "center",
    marginTop: -30,
    marginBottom: 30,
  },
  label: {
    alignSelf: "flex-start",
    marginLeft: 22,
    fontSize: 16,
    color: COLORS.forgetPasswordLabelColor,
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    width: "90%",
    padding: 12,
    backgroundColor: COLORS.pageBackgroundColor,
    borderRadius: 10,
    marginVertical: 10,
    borderColor: COLORS.textInputBorderColor,
    borderWidth: 1,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    alignSelf: "center",
    marginHorizontal: 10,
  },
  buttonSmall: {
    backgroundColor: COLORS.buttonBackgroundColor,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 20,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  buttonText: {
    color: COLORS.textColor,
    fontSize: 16,
    fontWeight: "600",
  },
});
