import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";

export default function Introduction_1() {
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
