import { View, Text } from "react-native";
import React from "react";
import styles from "@/assets/styles/ProficientPage/ProfStyle";

interface AboutSectionProps {
  section: string;
  title: string;
}

const AboutSection: React.FC<AboutSectionProps> = ({ section, title }) => {
  return (
    <View style={styles.profileSection}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.details}>{section}</Text>
    </View>
  );
};

export default AboutSection;
