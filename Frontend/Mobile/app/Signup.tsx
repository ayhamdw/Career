import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Pressable,
} from "react-native";
import React from "react";
import signup from "../assets/images/Signup.png";
import { SIZE } from "../assets/styles/Dimensions";
const SignUp = () => {
  return (
    <SafeAreaView>
      <Image source={signup} style={styles.imageStyle} />
      <Text style={styles.titleStyle}>Sign up</Text>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  imageStyle: {
    width: SIZE.width - 80,
    height: 400,
    resizeMode: "contain",
    justifyContent: "center",
    alignSelf: "center",
    // marginBottom: 30,
    // marginTop: 100,
  },
  titleStyle: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333333",
    marginLeft: 20,
    // fontFamily: "Cairo",
  },
});
