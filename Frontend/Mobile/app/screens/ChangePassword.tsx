import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import styles from "../../assets/styles/ChangePasswordStyle";

const ChangePassword = () => {
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
          onPress={() => console.log("Password Changed")}
          style={styles.buttonStyle}
        >
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChangePassword;
