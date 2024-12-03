import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { ayhamWifiUrl } from "@/constants/Urls";
import axios from "axios";
import Header from "@/components/ProficientPage/Header";
import AboutSection from "@/components/ProficientPage/AboutSection";
import ReviewsSection from "@/components/ProficientPage/ReviewsSection";

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
  };
  email: string;
  city: string;
  career: string;
  careerCategory: string;
}

interface Reviews {
  data: Date;
  rating: number;
  review: string;
  reviewer: {
    _id: string;
    profile: {
      firstName: string;
      lastName: string;
      profileImage: string;
    };
  };
}
export default function ProfProfile() {
  const route = useRoute();
  const { job } = route.params;
  const [reviews, setReviews] = useState<Reviews[]>([]);

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
        console.log("Reviews:", response.data.reviews);
        setReviews(response.data.reviews);
      } catch (error) {
        console.log("Error fetching reviews:", error);
      }
    };
    fetchReviewsUser();
  }, [job]);

  const calcRating = (job: any) => {
    let rating = 0;
    for (const element of job) {
      rating += element.rating;
    }
    return rating / job.length;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header job={job} />
      <ScrollView contentContainerStyle={styles.content}>
        <AboutSection section={job.profile.bio} title="About" />

        <AboutSection section={job.profile.experience} title="Experience" />

        <AboutSection section={job.city} title="Location" />

        <AboutSection section={String(calcRating(reviews))} title="Ratings" />

        <ReviewsSection reviews={reviews} />
      </ScrollView>

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
    backgroundColor: "#f4f4f4",
  },
  header: {
    alignItems: "center",
    paddingVertical: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#fff",
    marginTop: 10,
  },
  headerContent: {
    alignItems: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },
  career: {
    fontSize: 16,
    color: "#e3f2fd",
  },
  content: {
    padding: 20,
  },
  profileSection: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    elevation: 4,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00b09b",
    marginBottom: 15,
  },
  bio: {
    fontSize: 16,
    color: "#333",
  },
  details: {
    fontSize: 16,
    color: "#333",
  },
  reviewCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
  },
  reviewerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  reviewContent: {
    flex: 1,
  },
  reviewerName: {
    fontWeight: "bold",
    color: "#00b09b",
  },
  rating: {
    fontSize: 14,
    color: "#f39c12",
  },
  reviewText: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
    backgroundColor: "#fff",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#00b09b",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    elevation: 4,
  },
  buttonText: {
    marginLeft: 10,
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
