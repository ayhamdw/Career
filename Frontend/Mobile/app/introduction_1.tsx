import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";

export default function Introduction_1() {
  const data = [
    {
      id: 1,
      title: "Welcome to Career",
      description:
        "Career is a platform that connects you with skilled professionals in your area. Whether you need home repairs, cleaning, or other services, Career makes it easy to find trusted workers at your convenience.",
    },
    {
      id: 2,
      title: "How It Works",
      description:
        "Simply browse through professional profiles, check their ratings and reviews, and request a service. With Career user-friendly interface, finding help has never been easier",
    },
    {
      id: 3,
      title: "Secure and Reliable",
      description:
        "Your safety is our priority. All professionals on Career are verified, and your personal information is kept secure with the latest encryption and authentication methods",
    },
  ];

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
    backgroundColor: "#CEEB43",
    marginBottom: -100,
    marginTop: -100,
  },
  container: {
    flex: 1,
    backgroundColor: "#CEEB43",
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
