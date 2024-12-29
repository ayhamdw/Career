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

// Configure WebBrowser session handling
WebBrowser.maybeCompleteAuthSession();

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [app, setApp] = useState("apple");

  const { signOut } = useClerk();

  const { startOAuthFlow: startGoogleOAuthFlow } = useOAuth({
    strategy: "oauth_google",
  });
  const { startOAuthFlow: startAppleOAuthFlow } = useOAuth({
    strategy: "oauth_apple",
  });

  const handleSignInWithGoogle = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startGoogleOAuthFlow({
        redirectUrl: Linking.createURL("/dashboard", { scheme: "myapp" }),
      });

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        navigation.replace("Main");
      }
    } catch (err) {
      console.error("Google Sign-In failed:", err);
    }
  }, [startGoogleOAuthFlow, navigation]);

  const handleSignInWithApple = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startAppleOAuthFlow({
        redirectUrl: Linking.createURL("/dashboard", { scheme: "myapp" }),
      });

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        navigation.replace("Main");
      }
    } catch (err) {
      console.error("Apple Sign-In failed:", err);
    }
  }, [startAppleOAuthFlow, navigation]);

  const handleSignOut = async () => {
    try {
      await signOut();
      // Redirect to your desired page
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

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

  // const { user } = useUser();

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

      <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
        <Text style={styles.signInButtonText}>Sign In</Text>
      </TouchableOpacity>

      <Text style={styles.signInWith}>or sign in with</Text>

      <View style={styles.continueWithContainer}>
        <TouchableOpacity
          style={styles.continueWith}
          onPress={() => {
            setApp("apple");
            handleSignInWithApple();
          }}
        >
          <Image source={apple} style={styles.loginWithIcons} />
          <Text>Continue with Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.continueWith}
          onPress={() => {
            handleSignInWithGoogle();
          }}
        >
          <Image source={google} style={styles.loginWithIcons} />
          <Text>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.continueWith}
          onPress={() => handleSignOut()}
        >
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
