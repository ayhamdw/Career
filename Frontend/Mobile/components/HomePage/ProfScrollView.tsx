import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

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
      ratings: number;
      review: string;
      userId: string;
      date: Date;
    }[];
    numberOfRequest: number;
  };
  email: string;
  city: string;
  career: string;
  careerCategory: string;
  verificationStatus: boolean;
}

interface ProfListProps {
  jobs: Prof[];
  onCardPress: (job: Prof) => void;
}

const ProfList: React.FC<ProfListProps> = ({ jobs, onCardPress }) => {
  console.log("Verified Jobs:", jobs[0]?.verificationStatus);
  const calcRating = (job: Prof) => {
    if (job.profile.ratings.length === 0) return 0;
    const totalRating = job.profile.ratings.reduce(
      (sum, rating) => sum + rating.ratings,
      0
    );
    return Math.round(totalRating / job.profile.ratings.length);
  };

  return (
    <ScrollView style={styles.jobList}>
      {jobs.map((job, index) => (
        <TouchableOpacity
          key={index}
          style={styles.jobCard}
          onPress={() => onCardPress(job)}
        >
          <LinearGradient
            colors={["#4caf50", "#81c784"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientBackground}
          >
            <View style={styles.cardContent}>
              <View style={styles.header}>
                <Text style={styles.profName}>
                  {job.profile.firstName} {job.profile.lastName}
                </Text>
                <View
                  style={[
                    styles.verificationBadge,
                    {
                      backgroundColor: job.verificationStatus
                        ? "#dff9fb"
                        : "#ffcccc",
                    },
                  ]}
                >
                  <Text
                    style={{
                      color: job?.verificationStatus ? "#27ae60" : "#e74c3c",
                      fontWeight: "bold",
                    }}
                  >
                    {job?.verificationStatus ? "Verified" : "Not Verified"}
                  </Text>
                </View>
              </View>

              <Text style={styles.jobTitle}>{job.career}</Text>

              <View style={styles.details}>
                <View style={styles.detailItem}>
                  <MaterialIcons name="location-on" size={18} color="#fff" />
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
                <Text style={styles.ratingText}>{calcRating(job)} / 5</Text>
              </View>

              <Text style={styles.bio} numberOfLines={2}>
                {job.profile.bio || "No bio available."}
              </Text>

              {/* Number of Requests Section */}
              <View style={styles.requestsSection}>
                <MaterialIcons name="thumb-up" size={20} color="#fff" />
                <Text style={styles.requestsText}>
                  {job.profile.numberOfRequest} Requests
                </Text>
              </View>
            </View>
          </LinearGradient>
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
    marginBottom: 16,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  gradientBackground: {
    padding: 16,
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
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },
  verificationBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
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
    color: "#fff",
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
    color: "#fff",
    marginLeft: 8,
  },
  bio: {
    fontSize: 14,
    color: "#e0e0e0",
    marginTop: 10,
    fontStyle: "italic",
  },
  requestsSection: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    backgroundColor: "#388e3c",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  requestsText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 6,
  },
});

export default ProfList;
