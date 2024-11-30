import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styles from "../../assets/styles/HomePage/TipText";
interface TipsHeaderProps {
  text: string;
}

const TipsHeader: React.FC<TipsHeaderProps> = ({ text }) => {
  return (
    <View style={styles.tipsHeaderStyle}>
      <Text style={styles.tipTextStyle}>Tips For You</Text>
      <TouchableOpacity>
        <Text style={styles.seeAllStyle}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TipsHeader;
