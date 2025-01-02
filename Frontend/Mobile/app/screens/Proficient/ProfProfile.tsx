import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  Pressable,
  Text,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ayhamWifiUrl } from "@/constants/Urls";
import axios from "axios";
import Header from "@/components/ProficientPage/Header";
import AboutSection from "@/components/ProficientPage/AboutSection";
import ReviewsSection from "@/components/ProficientPage/ReviewsSection";
import Action from "@/components/ProficientPage/Action";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

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
export default function ProfProfile({ proficientDetails, user }) {
  const navigation = useNavigation();
  const [reviews, setReviews] = useState<Reviews[]>([]);
  const onMessagePress = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.post(
        `${ayhamWifiUrl}/api/friends/acceptFriendRequest`,
        {
          senderId: user._id,
          receiverId: proficientDetails._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        navigation.navigate("ChatUser", { me: user, user: proficientDetails });
      }
    } catch (error) {
      console.log("Error accepting friend request:", error);
    }
  };

  const onRequestPress = async () => {
    navigation.navigate("RequestDetailsPage", { proficientDetails, user });
  };

  const onProjectPress = async () => {
    navigation.navigate("Projects", { id: proficientDetails._id });
  };

  useEffect(() => {
    const fetchReviewsUser = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await axios.get(
          `${ayhamWifiUrl}/api/proficient/reviews/${proficientDetails._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setReviews(response.data.reviews);
      } catch (error) {
        console.log("Error fetching reviews:", error);
      }
    };
    fetchReviewsUser();
  }, [proficientDetails]);

  const calcRating = (job: any) => {
    let rating = 0;
    for (const element of job) {
      rating += element.rating;
    }
    return rating / job.length;
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <Ionicons
            name="arrow-back"
            size={24}
            color="black"
            onPress={() => navigation.goBack()}
            style={{
              marginLeft: -10,
              width: 30,
              height: 30,
              borderRadius: 50,
              backgroundColor: "white",
            }}
          />
        </View>
      ),
    });
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#f4f4f4" }}>
      <StatusBar barStyle="dark-content" />
      <Header job={proficientDetails} />
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Action
          onMessagePress={onMessagePress}
          onRequestPress={onRequestPress}
          onProjectPress={onProjectPress}
        />
        <AboutSection section={proficientDetails.profile.bio} title="About" />

        <AboutSection
          section={proficientDetails.profile.experience}
          title="Experience"
        />

        <AboutSection section={proficientDetails.city} title="Location" />

        <AboutSection
          section={String(calcRating(reviews).toFixed(1))}
          title="Ratings"
        />

        <ReviewsSection reviews={reviews} />
      </ScrollView>
    </View>
  );
}
