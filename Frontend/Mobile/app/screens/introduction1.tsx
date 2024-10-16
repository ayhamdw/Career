import React, { useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Introduction1() {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Introduction2");
    }, 2000);

    return () => clearTimeout(timer);
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
    backgroundColor: "#CEEB43",
    marginTop: -100,
    marginBottom: -100,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#CEEB43",
    marginTop: -100,
    marginBottom: -100,
  },
  textStyle: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#000",
  },
});
