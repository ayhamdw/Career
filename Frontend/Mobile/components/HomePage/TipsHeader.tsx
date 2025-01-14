import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styles from "../../assets/styles/HomePage/TipText";
interface TipsHeaderProps {
  buttonText: string;
  title: string;
  onPress?: () => void;
}

const TipsHeader: React.FC<TipsHeaderProps> = ({
  title,
  buttonText,
  onPress,
}) => {
  return (
    <View style={styles.tipsHeaderStyle}>
      <Text style={styles.tipTextStyle}>{title}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.seeAllStyle}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TipsHeader;
