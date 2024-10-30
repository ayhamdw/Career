/*
web id client: 155720957457-23gr289iqt06a9vmmsvort1ogca3iiph.apps.googleusercontent.com
IOS client: 155720957457-buoh0r927fjprq0j9pf9cckbof2gu2g2.apps.googleusercontent.com
android client: 155720957457-s5ikis9f80bfbf11eupfn98jjb3nfde9.apps.googleusercontent.com

*/
import React, { useEffect, useState } from "react";
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
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import DateTimePicker from "@react-native-community/datetimepicker";
import signup from "../../assets/images/Signup.png";
import styles from "../../assets/styles/SignupStyle";
import google from "../../assets/images/google.png";
import facebook from "../../assets/images/facebook.png";

const webClientId =
  "155720957457-23gr289iqt06a9vmmsvort1ogca3iiph.apps.googleusercontent.com";
const iosClientId =
  "155720957457-buoh0r927fjprq0j9pf9cckbof2gu2g2.apps.googleusercontent.com";
const androidClientId =
  "155720957457-s5ikis9f80bfbf11eupfn98jjb3nfde9.apps.googleusercontent.com";

WebBrowser.maybeCompleteAuthSession();

const SignUp = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const config = {
    webClientId,
    iosClientId,
    androidClientId,
  };
  const [request, response, promptAsync] = Google.useAuthRequest(config);

  const handleToken = () => {
    console.log("In Handle Token");
    if (response?.type == "success") {
      const { authentication } = response;
      const token = authentication?.accessToken;
      console.log("Google Token ", token);
    }
  };
  useEffect(() => {
    handleToken();
  }, [response]);

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
          <Pressable style={styles.buttonStyle} onPress={() => promptAsync()}>
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
