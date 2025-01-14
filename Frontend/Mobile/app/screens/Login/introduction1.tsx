import React, { useEffect } from "react";
import { Text, View, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../../../assets/styles/Introduction1Style";

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
