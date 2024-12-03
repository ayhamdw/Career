import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, StatusBar } from "react-native";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ayhamWifiUrl } from "@/constants/Urls";
import axios from "axios";
import Header from "@/components/ProficientPage/Header";
import AboutSection from "@/components/ProficientPage/AboutSection";
import ReviewsSection from "@/components/ProficientPage/ReviewsSection";
import Action from "@/components/ProficientPage/Action";

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
  const { job, user } = route.params;
  console.log("prof Id", job._id);
  console.log("user Id", user._id);
  const [reviews, setReviews] = useState<Reviews[]>([]);
  const onMessagePress = () => {
    console.log("Message Pressed");
  };

  const onRequestPress = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.post(
        `${ayhamWifiUrl}/api/proficient/booking-proficient`,
        {
          proficientId: job._id,
          myId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log("response is ok");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
    <View style={{ flex: 1, backgroundColor: "#f4f4f4" }}>
      <StatusBar barStyle="dark-content" />
      <Header job={job} />
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <AboutSection section={job.profile.bio} title="About" />

        <AboutSection section={job.profile.experience} title="Experience" />

        <AboutSection section={job.city} title="Location" />

        <AboutSection section={String(calcRating(reviews))} title="Ratings" />

        <ReviewsSection reviews={reviews} />
      </ScrollView>
      <Action onMessagePress={onMessagePress} onRequestPress={onRequestPress} />
    </View>
  );
}
