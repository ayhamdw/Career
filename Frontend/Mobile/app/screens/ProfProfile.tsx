import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ayhamWifiUrl } from "@/constants/Urls";
import axios from "axios";

export default function ProfProfile() {
  const route = useRoute();
  const { job } = route.params;

  useEffect(() => {
    const fetchReviewsUser = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await axios.get(
          `${ayhamWifiUrl}/api/proficient/reviews/${job._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Reviews:", response.data.reviews[0].reviewer);
      } catch (error) {
        console.log("Error fetching reviews:", error);
      }
    };
    fetchReviewsUser();
  });

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Image
          source={{ uri: job.profile.profileImage }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>
          {job.profile.firstName} {job.profile.lastName}
        </Text>
        <Text style={styles.career}>{job.career}</Text>
      </View>

      {/* Profile Details */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profileSection}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.bio}>{job.profile.bio}</Text>
        </View>

        <View style={styles.profileSection}>
          <Text style={styles.sectionTitle}>Experience</Text>
          <Text style={styles.details}>{job.profile.experience}</Text>
        </View>

        <View style={styles.profileSection}>
          <Text style={styles.sectionTitle}>Location</Text>
          <Text style={styles.details}>{job.city}</Text>
        </View>

        <View style={styles.profileSection}>
          <Text style={styles.sectionTitle}>Ratings</Text>
          <Text style={styles.details}>
            ⭐ {job.profile.ratings.rating} ({job.numberOfRequest} requests)
          </Text>
        </View>

        {/* Reviews Section */}
        {/* <View style={styles.profileSection}>
          <Text style={styles.sectionTitle}>Reviews</Text>
          {job.profile.ratings.reviews.map((review, index) => (
            <View key={index} style={styles.reviewCard}>
              <Text style={styles.reviewerName}>{review.userId}</Text>
              <Text style={styles.reviewText}>{review.review}</Text>
              <Text style={styles.reviewDate}>
                {new Date(review.date).toLocaleDateString()}
              </Text>
            </View>
          ))}
        </View> */}
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="chatbubbles" size={20} color="#fff" />
          <Text style={styles.buttonText}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="send" size={20} color="#fff" />
          <Text style={styles.buttonText}>Request</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#58d68d",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  career: {
    fontSize: 16,
    color: "#fff",
    marginTop: 5,
  },
  content: {
    padding: 20,
  },
  profileSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#58d68d",
  },
  bio: {
    fontSize: 16,
    lineHeight: 22,
    color: "#333",
  },
  details: {
    fontSize: 16,
    lineHeight: 22,
    color: "#555",
  },
  reviewCard: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  reviewerName: {
    fontWeight: "bold",
    color: "#58d68d",
    marginBottom: 5,
  },
  reviewText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  reviewDate: {
    fontSize: 12,
    color: "#aaa",
    textAlign: "right",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
    backgroundColor: "#f9f9f9",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#58d68d",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    marginLeft: 10,
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
