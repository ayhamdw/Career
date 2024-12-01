import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";

interface Prof {
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
  };
  email: string;
  city: string;
  career: string;
  careerCategory: string;
}

interface ProfListProps {
  jobs: Prof[];
  onCardPress: (job: Prof) => void;
}

const ProfList: React.FC<ProfListProps> = ({ jobs, onCardPress }) => {
  const calcRating = (job: any) => {
    let rating = 0;
    for (let i = 0; i < job.profile.ratings.length; i++) {
      rating += job.profile.ratings[i].rating;
    }
    return rating / job.profile.ratings.length;
  };
  return (
    <ScrollView style={styles.jobList}>
      {jobs.map((job, index) => (
        <TouchableOpacity
          key={index}
          style={styles.jobCard}
          onPress={() => onCardPress(job)}
        >
          <View style={styles.cardContent}>
            <View style={styles.header}>
              <Text style={styles.profName}>
                {job.profile.firstName} {job.profile.lastName}
              </Text>
              <Ionicons
                name="person-circle-outline"
                size={40}
                color="#4caf50"
              />
            </View>

            <Text style={styles.jobTitle}>{job.career}</Text>
            <View style={styles.details}>
              <View style={styles.detailItem}>
                <MaterialIcons name="location-on" size={18} color="#888" />
                <Text style={styles.detailText}>{job.city}</Text>
              </View>
            </View>

            <View style={styles.ratingSection}>
              {Array.from({ length: 5 }).map((_, i) => (
                <FontAwesome
                  key={i}
                  name="star"
                  size={18}
                  color={i < calcRating(job) ? "#fbc02d" : "#ccc"}
                  style={styles.star}
                />
              ))}
              <Text style={styles.ratingText}>
                {job.profile.ratings?.rating?.toFixed(1)} / 5
              </Text>
            </View>

            {/* Bio section */}
            <Text style={styles.bio} numberOfLines={2}>
              {job.profile.bio || "No bio available."}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  jobList: {
    marginTop: 10,
    flex: 1,
  },
  jobCard: {
    backgroundColor: "#fdfdfd",
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#4caf50",
  },
  cardContent: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  profName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2c3e50",
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4caf50",
    marginTop: 4,
  },
  details: {
    marginTop: 10,
    flexDirection: "column",
    gap: 4,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 6,
  },
  ratingSection: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  star: {
    marginRight: 2,
  },
  ratingText: {
    fontSize: 14,
    color: "#555",
    marginLeft: 8,
  },
  bio: {
    fontSize: 14,
    color: "#555",
    marginTop: 10,
    fontStyle: "italic",
  },
});

export default ProfList;
