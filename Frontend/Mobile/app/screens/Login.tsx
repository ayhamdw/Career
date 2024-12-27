import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Switch,
  Pressable,
  Touchable,
} from "react-native";
import { lightTheme, darkTheme } from "../../assets/styles/themes";
import facebook from "../../assets/images/facebook.png";
import gmail from "../../assets/images/gmail.png";
import apple from "../../assets/images/apple.png";
import google from "../../assets/images/google.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import styles from "../../assets/styles/LoginStyle";
import { COLORS } from "@/assets/styles/Dimensions";
import { useNavigation } from "@react-navigation/native";
import { ayhamWifiUrl } from "../../constants/Urls";
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
const Login = () => {
  const navigation = useNavigation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = isDarkMode ? darkTheme : lightTheme;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toggleSwitch = () => setIsDarkMode((previousState) => !previousState);

  const [loaded, error] = useFonts({
    "Kavoon-Regular": require("../../assets/fonts/Kavoon-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

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
    <View style={styles.container}>
      <Text style={styles.logoText}>Career</Text>
      <Text style={styles.signInText}>Sign in</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Email Or Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Email or Username"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
      </View>

      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate("ForgotPassword")}
      >
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      <Pressable style={styles.signInButton} onPress={signInButton}>
        <Text style={styles.signInButtonText}>Sign In</Text>
      </Pressable>

      <Text style={styles.signInWith}>or sign in with</Text>

      <View style={styles.continueWithContainer}>
        <TouchableOpacity style={styles.continueWith}>
          <Image source={apple} style={styles.loginWithIcons} />
          <Text>Continue with Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.continueWith}>
          <Image source={google} style={styles.loginWithIcons} />
          <Text>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.continueWith}>
          <Image source={facebook} style={styles.loginWithIcons} />
          <Text>Continue with Facebook</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.signUpSection}
        onPress={() => navigation.navigate("SignUp")}
      >
        <Text style={styles.signUpText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
