import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styles from "../../assets/styles/HomePage/TipText";
interface TipsHeaderProps {
  buttonText: string;
  title: string;
}

const TipsHeader: React.FC<TipsHeaderProps> = ({ title, buttonText }) => {
  return (
    <View style={styles.tipsHeaderStyle}>
      <Text style={styles.tipTextStyle}>{title}</Text>
      <TouchableOpacity>
        <Text style={styles.seeAllStyle}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TipsHeader;
