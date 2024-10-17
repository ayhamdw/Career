import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

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

          <Text style={styles.nameStyle}>Alexa Demain</Text>
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

const styles = StyleSheet.create({
  firstPartContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    borderWidth: 1,
    borderColor: "#e4e4e0",
    paddingBottom: 10,
    borderRadius: 5,
  },
  imageStyle: {
    marginTop: 15,
    width: 100,
    height: 100,
  },
  nameStyle: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 20,
    fontWeight: "bold",
  },
  emailAndAddressStyle: {
    fontSize: 15,
    marginTop: 5,
  },
  secondPartContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    margin: 10,
    borderWidth: 1,
    borderColor: "#e4e4e0",
    paddingBottom: 10,
    borderRadius: 5,
  },
  careerObjectiveStyle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 15,
    marginTop: 15,
    marginBottom: 5,
    padding: 5,
  },
  careerObjectiveDescriptionStyle: {
    fontSize: 18,
    color: "#202020",
    marginLeft: 20,
    marginRight: 30,
    marginTop: 15,
  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor: "#e4e4e0",
    // margin: 10,
    width: "95%",
    alignSelf: "center",
    marginTop: 5,
  },
  thirdPartContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    margin: 10,
    borderWidth: 1,
    borderColor: "#e4e4e0",
    paddingBottom: 10,
    borderRadius: 5,
  },
  specialQualificationStyle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 15,
    marginTop: 15,
    marginBottom: 5,
    padding: 5,
  },
});

export default ViewResume;
