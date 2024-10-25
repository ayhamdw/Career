import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { COLORS } from "../../assets/styles/Dimensions";

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

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    marginVertical: 10,
    padding: 10,
  },
  viewStyle: {
    marginVertical: 20,
    flexDirection: "column",
    backgroundColor: COLORS.pageBackgroundColor,
    height: "100%",
  },
  inputLabelStyle: {
    fontSize: 14,
    marginHorizontal: 15,
    color: COLORS.inputLabelColor,
  },
  textInputStyle: {
    marginHorizontal: 15,
    marginTop: 5,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.introductionColor,
    padding: 10,
    borderRadius: 5,
    height: 40,
    fontSize: 16,
  },
  buttonStyle: {
    backgroundColor: COLORS.introductionColor,
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
});
