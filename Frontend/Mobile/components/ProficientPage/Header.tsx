import { View, Text, Image } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import styles from "@/assets/styles/ProficientPage/ProfStyle";

interface Job {
  profile: {
    firstName: string;
    lastName: string;
    bio: string;
    experience: string;
    location: {
      type: string;
      coordinates: [number, number];
    };
    ratings: {
      rating: number;
      review: string;
      userId: string;
      date: Date;
    };
    profileImage: string;
  };
  email: string;
  city: string;
  career: string;
  careerCategory: string;
}

interface HeaderProps {
  job: Job;
}

const Header: React.FC<HeaderProps> = ({ job }) => {
  return (
    <LinearGradient colors={["#00b09b", "#96c93d"]} style={styles.header}>
      <Image
        source={{ uri: job.profile.profileImage }}
        style={styles.profileImage}
      />
      <View style={styles.headerContent}>
        <Text style={styles.name}>
          {job.profile.firstName} {job.profile.lastName}
        </Text>
        <Text style={styles.career}>{job.career}</Text>
      </View>
    </LinearGradient>
  );
};
export default Header;
