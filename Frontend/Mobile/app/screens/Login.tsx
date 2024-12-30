import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { useClerk, useOAuth, useUser } from "@clerk/clerk-expo";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import styles from "../../assets/styles/LoginStyle";
import google from "../../assets/images/google.png";
import facebook from "../../assets/images/facebook.png";
import apple from "../../assets/images/apple.png";
import { ayhamWifiUrl } from "@/constants/Urls";
import { useFonts } from "expo-font";

WebBrowser.maybeCompleteAuthSession();

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useUser();
  const [loaded, error] = useFonts({
    "Kavoon-Regular": require("../../assets/fonts/Kavoon-Regular.ttf"),
  });
  const { startOAuthFlow: startGoogleOAuthFlow } = useOAuth({
    strategy: "oauth_google",
  });
  const { startOAuthFlow: startAppleOAuthFlow } = useOAuth({
    strategy: "oauth_apple",
  });

  const handleOAuthSignIn = useCallback(
    async (strategy) => {
      try {
        const startOAuth =
          strategy === "oauth_google"
            ? startGoogleOAuthFlow
            : startAppleOAuthFlow;

        const { createdSessionId, setActive } = await startOAuth({
          redirectUrl: Linking.createURL("/dashboard", { scheme: "myapp" }),
        });

        if (createdSessionId) {
          setActive!({ session: createdSessionId });

          const email = user?.emailAddresses[0].emailAddress;
          const firstName = user?.firstName;
          const lastName = user?.lastName;
          const profileImage = user?.imageUrl;

          console.log("email", email);
          console.log("firstName", firstName);
          console.log("lastName", lastName);
          console.log("profileImage", profileImage);

          const response = await axios.post(
            `${ayhamWifiUrl}/api/auth/register`,
            {
              isOAuth: true,
              email,
              firstName,
              lastName,
              profileImage,
            }
          );

          const { token, user: backendUser } = response.data;

          await AsyncStorage.setItem("token", token);
          await AsyncStorage.setItem("user", JSON.stringify(backendUser));

          navigation.replace("Main", { user: backendUser });
        }
      } catch (err) {
        console.error(`${strategy} Sign-In failed:`, err);
      }
    },
    [startGoogleOAuthFlow, startAppleOAuthFlow, navigation]
  );

  const handleSignIn = async () => {
    try {
      const response = await axios.post(`${ayhamWifiUrl}/api/auth/login`, {
        email,
        password,
      });
      const { token, user } = response.data;

      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("user", JSON.stringify(user));

      navigation.replace("Main", { user });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logoText}>Career</Text>
      <Text style={styles.signInText}>Sign in</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
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
          secureTextEntry
        />
      </View>

      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate("ForgotPassword")}
      >
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
        <Text style={styles.signInButtonText}>Sign In</Text>
      </TouchableOpacity>

      <Text style={styles.signInWith}>or sign in with</Text>

      <View style={styles.continueWithContainer}>
        <TouchableOpacity
          style={styles.continueWith}
          onPress={() => {
            handleOAuthSignIn("oauth_apple");
          }}
        >
          <Image source={apple} style={styles.loginWithIcons} />
          <Text>Continue with Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.continueWith}
          onPress={() => {
            handleOAuthSignIn("oauth_google");
          }}
        >
          <Image source={google} style={styles.loginWithIcons} />
          <Text>Continue with Google</Text>
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
