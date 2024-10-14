import React from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Platform,
} from "react-native";

const SplashBackground = ({ children }: { children: any }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* The status bar color is controlled here */}
      <StatusBar
        barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
        backgroundColor="#CEEB43"
        translucent={true}
      />
      <View style={styles.background}>
        {children} {/* This renders the screen content */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#CEEB43", // Splash screen background color
  },
  background: {
    flex: 1,
    backgroundColor: "#CEEB43", // Match the splash background color
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SplashBackground;
