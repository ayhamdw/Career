import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Switch,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { lightTheme, darkTheme } from "../../assets/styles/themes";
import facebook from "../../assets/images/facebook.png";
import gmail from "../../assets/images/gmail.png";
export default function Login() {
  const navigation = useNavigation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = isDarkMode ? darkTheme : lightTheme;

  const toggleSwitch = () => setIsDarkMode((previousState) => !previousState);

  return (
    <SafeAreaView
      style={[styles.loginPage, { backgroundColor: theme.loginPageBackground }]}
    >
      <View
        style={[
          styles.container,
          { backgroundColor: theme.containerBackground },
        ]}
      >
        <View style={styles.signLogo}>
          <Image
            style={styles.ImgLogo}
            source={require("../../assets/images/logo.png")}
          />
          <Text style={[styles.signText, { color: theme.textColor }]}>
            <Text style={[styles.jetakText, { color: "#c9492f" }]}>Career</Text>
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputItem}>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.inputBackground,
                  color: theme.textColor,
                },
              ]}
              placeholder="Email or Username"
              placeholderTextColor={theme.placeholderTextColor}
            />
          </View>
          <View style={styles.inputItem}>
            {/* <Text style={[styles.label, { color: theme.labelColor }]}>Password</Text> */}
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.inputBackground,
                  color: theme.textColor,
                },
              ]}
              placeholder="Enter your password"
              placeholderTextColor={theme.placeholderTextColor}
              secureTextEntry={true}
            />
          </View>

          <TouchableOpacity
            style={styles.forgotButton}
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text
              style={[
                styles.forgotPasswordText,
                { color: theme.buttonBackground },
              ]}
            >
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[
            styles.loginButton,
            { backgroundColor: theme.buttonBackground },
          ]}
          onPress={() => navigation.navigate("Main")}
        >
          <Text style={[styles.buttonText, { color: theme.buttonText }]}>
            Sign In
          </Text>
        </TouchableOpacity>

        <View style={styles.signUpSection}>
          <Text style={[styles.par, { color: theme.textColor }]}>
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text
              style={[styles.signUpText, { color: theme.buttonBackground }]}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          <Text style={{ color: theme.textColor }}>Or Login With ..</Text>
        </View>

        <View style={styles.loginWith}>
          <Pressable onPress={() => console.log("Gmail Pressed")}>
            <Image source={gmail} style={styles.loginWithIcons}></Image>
          </Pressable>
          <Pressable onPress={() => console.log("Facebook Pressed")}>
            <Image source={facebook} style={styles.loginWithIcons}></Image>
          </Pressable>
        </View>

        {/* Toggle Switch */}
        <View style={styles.toggleContainer}>
          <Text style={[styles.toggleText]}>Dark Mode</Text>
          <Switch
            // style={styles.toogleButton}
            value={isDarkMode}
            onValueChange={toggleSwitch}
            thumbColor={isDarkMode ? "#f4f3f4" : "#f4f3f4"}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loginPage: {
    height: "100%",
    marginTop: -50,
    marginBottom: -50,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "85%",
    // height:'85%',
    maxWidth: 500,
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    display: "flex",
    gap: 25,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
    paddingTop: 20,
  },
  signLogo: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    gap: 10,
  },
  ImgLogo: {
    width: 200,
    height: 100,
    marginBottom: 15,
  },
  signText: {
    fontSize: 28,
    fontWeight: "bold",
  },
  jetakText: {
    fontSize: 40,
    fontFamily: "Cairo",
  },
  par: {
    fontSize: 14,
  },
  form: {
    width: "100%",
  },
  inputItem: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    width: "100%",
    height: 45,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderBottomWidth: 1,
    fontSize: 16,
    borderColor: "#c9492f",
    marginBottom: 10,
    backgroundColor: "white",
  },

  forgotPasswordText: {
    fontSize: 14,
    textAlign: "right",
    // marginTop: -10,
    // marginBottom: 10,
  },
  forgotButton: {
    alignSelf: "center",
    marginTop: 20,
    marginBottom: -10,
  },
  loginButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  signUpSection: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  signUpText: {
    fontWeight: "bold",
    marginLeft: 5,
    color: "#99a3a4",
  },
  // New styles for toggle switch
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    width: "100%",
  },
  toggleText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#99a3a4",
  },
  loginWith: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 23,
  },
  loginWithIcons: {
    width: 30,
    height: 30,
  },
});
