import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SplashBackground from "./SplashBackground"; // Import the SplashBackground component

export default function Introduction1() {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Introduction2"); // Make sure to use the string name of your screen
    }, 2000); // 2 seconds delay

    return () => clearTimeout(timer); // Clean up the timer on unmount
  }, [navigation]);

  return (
    <SplashBackground>
      <View style={styles.container}>
        <Text style={styles.textStyle}>Career</Text>
      </View>
    </SplashBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#000", // Text color for contrast on the light background
  },
});
