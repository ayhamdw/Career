import React, { useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SplashBackground from "./SplashBackground"; // Import the SplashBackground component

export default function Introduction1() {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Introduction2"); // Navigate to next screen
    }, 2000); // 2 seconds delay

    return () => clearTimeout(timer); // Clean up the timer on unmount
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.textStyle}>Career</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#CEEB43", // Ensure the background color covers the safe area
    marginTop: -100,
    marginBottom: -100,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#CEEB43", // Keep this consistent with the safe area background color
    marginTop: -100,
    marginBottom: -100,
  },
  textStyle: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#000", // Text color for contrast on the light background
  },
});
