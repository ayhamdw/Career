import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import signup from "../../assets/images/Signup.png";
import { SIZE } from "../../assets/styles/Dimensions";
import google from "../../assets/images/google.png";
import facebook from "../../assets/images/facebook.png";

const SignUp = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Handle Date Picker change
  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || dateOfBirth;
    setShowDatePicker(false);
    setDateOfBirth(currentDate);
  };

  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={signup} style={styles.imageStyle} />
        <Text style={styles.titleStyle}>Create Account</Text>

        <View style={styles.viewButtonStyle}>
          <Pressable
            style={styles.buttonStyle}
            onPress={() => console.log("Google Signup")}
          >
            <Image source={google} style={styles.iconSignupStyle}></Image>
            <Text style={styles.buttonTextStyle}>Continue with Google</Text>
          </Pressable>

          <Pressable
            style={styles.buttonStyle}
            onPress={() => console.log("Facebook Signup")}
          >
            <Image
              source={facebook}
              style={[styles.iconSignupStyle, { marginLeft: 10 }]}
            ></Image>
            <Text style={styles.buttonTextStyle}>Continue with Facebook</Text>
          </Pressable>

          <Text style={styles.orTextStyle}>— Or sign up with —</Text>

          <View style={styles.textInputContainerStyle}>
            <TextInput
              editable
              placeholder="First Name"
              numberOfLines={1}
              style={styles.textInputStyle}
            />
            <TextInput
              editable
              placeholder="Last Name"
              numberOfLines={1}
              style={styles.textInputStyle}
            />
          </View>

          <TextInput
            editable
            placeholder="Email Address"
            numberOfLines={1}
            style={styles.textInputStyleFullWidth}
          />

          <TextInput
            editable
            placeholder="Phone Number"
            keyboardType="numeric"
            numberOfLines={1}
            style={styles.textInputStyleFullWidth}
          />
          <View style={styles.datePickerContainer}>
            <Text style={styles.datePickerLabel}>Date of Birth:</Text>
            <Pressable
              style={styles.datePicker}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.dateText}>
                {dateOfBirth
                  ? `${dateOfBirth.getDate()}-${
                      dateOfBirth.getMonth() + 1
                    }-${dateOfBirth.getFullYear()}`
                  : "Select Date"}
              </Text>
            </Pressable>
            {showDatePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={dateOfBirth}
                mode="date"
                display="default"
                onChange={onChange}
              />
            )}
          </View>
          <View style={styles.genderContainer}>
            <Text style={styles.genderText}>Gender: </Text>
            <Pressable
              style={[
                styles.genderButton,
                gender === "Male" ? styles.selectedGender : {},
              ]}
              onPress={() => setGender("Male")}
            >
              <Text style={styles.genderButtonText}>Male</Text>
            </Pressable>
            <Pressable
              style={[
                styles.genderButton,
                gender === "Female" ? styles.selectedGender : {},
              ]}
              onPress={() => setGender("Female")}
            >
              <Text style={styles.genderButtonText}>Female</Text>
            </Pressable>
          </View>
          <View style={styles.passwordContainer}>
            <TextInput
              editable
              placeholder="Password"
              numberOfLines={1}
              secureTextEntry={!passwordVisible}
              style={[styles.textInputStyleFullWidth, { width: "100%" }]}
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
              style={styles.showPasswordButton}
            >
              <Text style={styles.showPasswordText}>
                {passwordVisible ? "Hide" : "Show"}
              </Text>
            </TouchableOpacity>
          </View>

          <Pressable
            style={styles.signUpButtonStyle}
            onPress={() => console.log("Sign Up")}
          >
            <Text style={styles.signUpButtonTextStyle}>Sign Up</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  scrollContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 50,
  },
  imageStyle: {
    width: SIZE.width - 100,
    height: 250,
    resizeMode: "contain",
    marginBottom: 20,
  },
  titleStyle: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#1E1E1E",
    marginBottom: 20,
    textAlign: "center",
  },
  buttonStyle: {
    backgroundColor: "#EAECEF",
    borderRadius: 8,
    padding: 10,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  buttonTextStyle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
    marginLeft: 10,
  },
  viewButtonStyle: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  iconSignupStyle: {
    width: 28,
    height: 28,
    resizeMode: "contain",
  },
  orTextStyle: {
    marginVertical: 10,
    fontSize: 14,
    color: "#666666",
  },
  textInputContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 20,
  },
  textInputStyle: {
    width: "48%",
    borderColor: "#CED0CE",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    fontSize: 14,
    color: "#333",
  },
  textInputStyleFullWidth: {
    width: "80%",
    borderColor: "#CED0CE",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    fontSize: 14,
    color: "#333",
    marginBottom: 15,
  },
  datePickerContainer: {
    width: "80%",
    marginBottom: 20,
    justifyContent: "center",
  },
  datePickerLabel: {
    marginBottom: 5,
    color: "#333",
    fontSize: 14,
  },
  datePicker: {
    borderColor: "#CED0CE",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    fontSize: 14,
    color: "#333",
    alignItems: "center",
    justifyContent: "center",
  },
  dateText: {
    fontSize: 14,
    color: "#333",
  },
  genderContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    justifyContent: "center",
    width: "80%",
  },
  genderText: {
    fontSize: 16,
    color: "#333",
    marginRight: 10,
  },
  genderButton: {
    borderColor: "#CED0CE",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginHorizontal: 5,
  },
  selectedGender: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
  },
  genderButtonText: {
    color: "#333",
    fontSize: 14,
  },
  passwordContainer: {
    position: "relative",
    width: "80%",
    marginBottom: 20,
  },
  showPasswordButton: {
    position: "absolute",
    right: 12,
    top: 10,
  },
  showPasswordText: {
    color: "#4CAF50",
    fontSize: 14,
  },
  signUpButtonStyle: {
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  signUpButtonTextStyle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
