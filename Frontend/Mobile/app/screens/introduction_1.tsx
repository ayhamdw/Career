import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../types"; // Import your defined types

export default function Introduction_1() {
  const navigation = useNavigation<NavigationProp>(); // Use the typed navigation

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.textStyle}>Career</Text>
        <Pressable>
          <Text>Go To Introduction Page</Text>
        </Pressable>
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
