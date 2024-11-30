import { Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import styles from "@/assets/styles/HomePage/ProfRecom";

interface ProfRecommendationProps {
  onPress: (filter: string) => void;
  data: string[];
  selectedFilter: string;
}

const ProfRecommendation: React.FC<ProfRecommendationProps> = ({
  data,
  onPress,
  selectedFilter,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.filters}
    >
      {data.map((filter, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.filterChip,
            filter === selectedFilter && { backgroundColor: "#58d68d" },
          ]}
          onPress={() => onPress(filter)}
        >
          <Text
            style={[
              styles.filterText,
              filter === selectedFilter && { color: "white" },
            ]}
          >
            {filter}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default ProfRecommendation;
