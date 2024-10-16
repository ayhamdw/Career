import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  TouchableOpacity,
} from "react-native";

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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.inner}
          keyboardShouldPersistTaps="handled"
        >
          <Image
            source={require("../../assets/images/ForgotPassword.png")}
            style={styles.image}
          />

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
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // Set the background to white
  },
  inner: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1, // Ensures content stays centered
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 20,
    borderRadius: 60, // Makes the image circular
  },
  headerText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 30,
    textAlign: "center", // Center the header
  },
  label: {
    alignSelf: "flex-start",
    marginLeft: 10,
    fontSize: 16,
    color: "#555",
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    width: "100%",
    padding: 12,
    backgroundColor: "#f9f9f9", // Soft background for input fields
    borderRadius: 10,
    marginVertical: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2, // Small shadow effect
  },
  buttonSmall: {
    width: "60%", // Reduce the button size
    backgroundColor: "#CEEB43", // Button color you mentioned
    padding: 12, // Reduce padding for smaller button
    borderRadius: 20,
    alignItems: "center",
    marginVertical: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Slightly higher elevation for buttons
  },
  buttonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "600", // Slightly bolder text
  },
});
