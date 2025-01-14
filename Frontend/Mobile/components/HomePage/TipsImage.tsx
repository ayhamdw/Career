import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import styles from "../../assets/styles/HomePage/ImageStyle";
import tips from "@/assets/images/tips.jpg";
interface TipsImageProps {}

interface TipsImageProps {
  onPress?: () => void;
}

const TipsImage: React.FC<TipsImageProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.tipButton} onPress={onPress}>
      <Image style={styles.tipImage} source={tips} />
      <View style={styles.tipOverlay}>
        <Text style={styles.tipButtonText}>Discover More</Text>
      </View>
    </TouchableOpacity>
  );
};
export default TipsImage;
