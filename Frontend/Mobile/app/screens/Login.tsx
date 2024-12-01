import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Switch,
  Pressable,
} from "react-native";
import { lightTheme, darkTheme } from "../../assets/styles/themes";
import facebook from "../../assets/images/facebook.png";
import gmail from "../../assets/images/gmail.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import styles from "../../assets/styles/LoginStyle";
import { COLORS } from "@/assets/styles/Dimensions";
import { useNavigation } from "@react-navigation/native";
import { ayhamWifiUrl } from "../../constants/Urls";
const Login = () => {
  const navigation = useNavigation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = isDarkMode ? darkTheme : lightTheme;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toggleSwitch = () => setIsDarkMode((previousState) => !previousState);
  const signInButton = async () => {
    try {
      const response = await axios.post(`${ayhamWifiUrl}/api/auth/login`, {
        email,
        password,
      });
      const { token, user } = response.data;
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("user", JSON.stringify(user));
      navigation.replace("Main", { user: user });
    } catch (error) {
      console.log("Login failed:", error);
    }
  };
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
            <Text
              style={[
                styles.jetakText,
                { color: COLORS.buttonBackgroundColor },
              ]}
            >
              Career
            </Text>
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
                  borderColor: COLORS.buttonBackgroundColor,
                },
              ]}
              placeholder="Email or Username"
              placeholderTextColor={theme.placeholderTextColor}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View style={styles.inputItem}>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.inputBackground,
                  color: theme.textColor,
                  borderColor: COLORS.buttonBackgroundColor,
                },
              ]}
              placeholder="Enter your password"
              placeholderTextColor={theme.placeholderTextColor}
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </View>

          <TouchableOpacity
            style={styles.forgotButton}
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text
              style={[
                styles.forgotPasswordText,
                { color: COLORS.buttonBackgroundColor },
              ]}
            >
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[
            styles.loginButton,
            { backgroundColor: COLORS.buttonBackgroundColor },
          ]}
          onPress={() => signInButton()}
        >
          <Text style={[styles.buttonText, { color: theme.buttonText }]}>
            Sign In
          </Text>
        </TouchableOpacity>

        <View style={styles.signUpSection}>
          <Text style={[styles.par, { color: theme.textColor }]}>
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text
              style={[
                styles.signUpText,
                { color: COLORS.buttonBackgroundColor },
              ]}
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

        <View style={styles.toggleContainer}>
          <Text style={[styles.toggleText]}>Dark Mode</Text>
          <Switch
            value={isDarkMode}
            onValueChange={toggleSwitch}
            thumbColor="#f4f3f4"
            trackColor={{ false: "#767577", true: "#81b0ff" }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
