import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, Image } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import styles from "../../../assets/styles/SignupStyle";
import { SignUpStackParamList } from "./types";
import * as Google from "expo-auth-session/providers/google";
import google from "../../../assets/images/google.png";
import * as WebBrowser from "expo-web-browser";

type BasicInfoProps = NativeStackScreenProps<SignUpStackParamList, "BasicInfo">;

const BasicInfo: React.FC<BasicInfoProps> = ({ navigation }) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const webClientId =
    "155720957457-23gr289iqt06a9vmmsvort1ogca3iiph.apps.googleusercontent.com";
  const iosClientId =
    "155720957457-buoh0r927fjprq0j9pf9cckbof2gu2g2.apps.googleusercontent.com";
  const androidClientId =
    "155720957457-s5ikis9f80bfbf11eupfn98jjb3nfde9.apps.googleusercontent.com";

  WebBrowser.maybeCompleteAuthSession();

  const config = {
    webClientId,
    iosClientId,
    androidClientId,
  };

  const [request, response, promptAsync] = Google.useAuthRequest(config);

  const handleNext = () => {
    if (firstName && lastName && username) {
      navigation.navigate("PersonalDetails", {
        firstName,
        lastName,
        username,
      });
    } else {
      alert("Please fill all fields");
    }
  };

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

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          color: "#333",
          marginBottom: 20,
        }}
      >
        Welcome! Let's get started.
      </Text>
      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        style={styles.textInput}
      />
      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
        style={styles.textInput}
      />
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.textInput}
      />
      <View style={styles.buttonContainer}>
        <Pressable onPress={handleNext} style={styles.button}>
          <Text style={styles.buttonText}>Previous</Text>
        </Pressable>
        <Pressable onPress={handleNext} style={styles.button}>
          <Text style={styles.buttonText}>Next</Text>
        </Pressable>
      </View>
      <Text style={styles.signupWith}>Or Signup with</Text>
      <Pressable style={styles.buttonStyle} onPress={() => promptAsync()}>
        <Image source={google} style={styles.iconSignupStyle}></Image>
        <Text style={styles.buttonTextStyle}>Continue with Google</Text>
      </Pressable>
    </View>
  );
};

export default BasicInfo;
