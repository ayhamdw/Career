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
import google from "../assets/images/google.png";
import facebook from "../assets/images/facebook (2).png";
const SignUp = () => {
  return (
    <SafeAreaView>
      <Image source={signup} style={styles.imageStyle} />
      <Text style={styles.titleStyle}>Sign up</Text>
      <View style={styles.viewButtonStyle}>
        <Pressable
          style={styles.buttonStyle}
          onPress={() => console.log("Hello!")}
        >
          <Image source={google} style={styles.iconSignupStyle}></Image>
          <Text style={styles.buttonTextStyle}>Signup With Google</Text>
        </Pressable>

        <Pressable
          style={styles.buttonStyle}
          onPress={() => console.log("Hello!")}
        >
          <Image
            source={facebook}
            style={[styles.iconSignupStyle, { marginLeft: 10 }]}
          ></Image>
          <Text style={styles.buttonTextStyle}>Signup With Facebook</Text>
        </Pressable>
      </View>
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
  },
  titleStyle: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333333",
    marginLeft: 20,
  },
  buttonStyle: {
    backgroundColor: "#CEEB43",
    borderRadius: 5,
    padding: 10,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonTextStyle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
    marginLeft: 5,
  },
  viewButtonStyle: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  iconSignupStyle: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    marginRight: 10,
  },
});
