import { View, Text, Image, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../assets/styles/ViewResumeStyle";
const ViewResume = () => {
  const qualifications = [
    "UI/UX Designer",
    "Graphic Designer",
    "Microsoft Office",
    "Figma",
  ];
  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <ScrollView>
        <View style={styles.firstPartContainer}>
          <Image
            source={{ uri: "https://via.placeholder.com/100" }}
            style={styles.imageStyle}
          />

          <Text style={styles.nameStyle}>Ayham Dw</Text>
          <Text style={styles.emailAndAddressStyle}>
            Email: example@gmail.com
          </Text>
          <Text style={styles.emailAndAddressStyle}>
            Address: Palestine, Qalqilya
          </Text>
        </View>

        <View style={styles.secondPartContainer}>
          <Text style={styles.careerObjectiveStyle}>Career Objective</Text>
          <View style={styles.lineStyle} />
          <Text style={styles.careerObjectiveDescriptionStyle}>
            I want to contribute to an organization up to me the highest limit
            of my knowledge and skills with my devotion sincerity and hard
            working to add value to that organization and potentials can be
            explored for enhancing good name for that organization.
          </Text>
        </View>
        <View style={styles.thirdPartContainer}>
          <Text style={styles.specialQualificationStyle}>
            Special Qualification
          </Text>
          <Text style={styles.careerObjectiveDescriptionStyle}>
            {qualifications.map((qualification) => (
              <Text key={qualification}>
                • {qualification}
                {"\n"}
              </Text>
            ))}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ViewResume;
