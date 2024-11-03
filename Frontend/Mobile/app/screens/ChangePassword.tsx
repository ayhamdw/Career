import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import styles from "../../assets/styles/ChangePasswordStyle";
import { COLORS } from "../../assets/styles/Dimensions";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChangePassword = ({ user }) => {
  const checkOldPassword = async (oldPassword: string) => {
    try {
      const token = await AsyncStorage.getItem("token"); // get the token to send it in the header
      const response = await axios.get(
        "http://192.168.1.21:7777/api/user/oldPassword",
        {
          params: { oldPassword },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("Old Password failed:", error);
      return "false";
    }
  };

  const checkPassword = async (
    oldPassword: string,
    newPassword: string,
    confirmPassword: string
  ) => {
    const isOldPasswordCorrect = await checkOldPassword(oldPassword);

    if (isOldPasswordCorrect === "false") {
      Alert.alert("Error", "Old Password is incorrect");
      return false;
    }
    if (oldPassword === "" || newPassword === "" || confirmPassword === "") {
      Alert.alert("Error", "Please fill all the fields");
      return false;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Password Not Matched");
      return false;
    }
    console.log("Password Changed Successfully");
    return true;
  };
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.pageBackgroundColor }}>
      <Text style={styles.textStyle}>Change Password</Text>
      <View style={styles.viewStyle}>
        <Text style={styles.inputLabelStyle}>ENTER OLD PASSWORD</Text>
        <TextInput
          secureTextEntry={true}
          placeholder="Old Password"
          style={styles.textInputStyle}
          value={oldPassword}
          onChangeText={(text) => setOldPassword(text)}
        />
        <Text style={styles.inputLabelStyle}>ENTER NEW PASSWORD</Text>
        <TextInput
          secureTextEntry={true}
          placeholder="New Password"
          style={styles.textInputStyle}
          value={newPassword}
          onChangeText={(text) => setNewPassword(text)}
        />
        <Text style={styles.inputLabelStyle}>CONFIRM NEW PASSWORD</Text>
        <TextInput
          secureTextEntry={true}
          placeholder="Confirm Password"
          style={styles.textInputStyle}
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />
        <TouchableOpacity
          onPress={async () => {
            const isValid = await checkPassword(
              oldPassword,
              newPassword,
              confirmPassword
            );
            if (isValid) {
              // Handle the case where passwords are validated successfully, e.g., by calling an API to update the password
            }
          }}
          style={styles.buttonStyle}
        >
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChangePassword;
