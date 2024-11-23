import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import styles from "../../assets/styles/SignupStyle";
interface GoogleSignupProps {
  registerWith: string;
  googleSignup: string;
  onPress: () => void;
  source: any;
}

const GoogleSignup: React.FC<GoogleSignupProps> = ({
  registerWith,
  googleSignup,
  onPress,
  source,
}) => {
  return (
    <View>
      <Text style={styles.signupWith}>{registerWith}</Text>
      <TouchableOpacity style={styles.buttonStyle} onPress={() => onPress()}>
        <Image source={source} style={styles.iconSignupStyle}></Image>
        <Text style={styles.buttonTextStyle}>{googleSignup}</Text>
      </TouchableOpacity>
    </View>
  );
};
export default GoogleSignup;
