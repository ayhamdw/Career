import Header from "@/components/HomePage/Header";
import SearchBar from "@/components/HomePage/SearchBar";
import React, { useEffect } from "react";
import { View, ScrollView } from "react-native";
import TipsHeader from "@/components/HomePage/TipsHeader";
import TipsImage from "@/components/HomePage/TipsImage";
import ProfRecommendation from "@/components/HomePage/ProfRecommendation";
import ProfList from "@/components/HomePage/ProfScrollView";
import styles from "@/assets/styles/HomePage/HomePage";
import { useRoute } from "@react-navigation/native";
import { ayhamWifiUrl } from "@/constants/Urls";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Location {
  type: string;
  coordinates: [number, number];
}

interface Profile {
  firstName: string;
  lastName: string;
  bio: string;
  experience: string;
  phone: string;
  location: Location;
  ratings: {
    rating: number;
    review: string;
    userId: string;
    date: Date;
  };
}

interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: string;
  gender: string;
  city: string;
  dateOfBirth: Date;
  career: string;
  careerCategory: string;
  rating: number;
  profile: Profile;
  verificationStatus: boolean;
  tokens: string[];
  friendRequests: string[];
  friends: string[];
  sendRequests: string[];
  resetCode: number;
  resetCodeExpires: Date;
}

const HomePage = ({ user }: { user: User }) => {
  const [search, setSearch] = React.useState<string>("");
  const [selectedFilter, setSelectedFilter] =
    React.useState<string>("All Proficient");
  const [users, setUsers] = React.useState<User[]>([]);
  const filters = [
    "All Proficient",
    "Home Services",
    "Technical Services",
    "Educational Services",
    "Healthcare",
    "Creative Services",
    "Legal & Financial Services",
    "Other",
  ];
  const handleCardPress = (job: {
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
  }) => {
    console.log("Job:", job);
  };
  const handleFilterPress = (filter: string) => {
    setSelectedFilter(filter);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await axios.get(
          `${ayhamWifiUrl}/api/proficient/proficient-data`,
          {
            params: {
              id: user._id,
              careerCategory: selectedFilter,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsers(response.data);
      } catch (error) {
        console.log("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [user]);
  return (
    <ScrollView>
      <View style={styles.container}>
        <Header name={user.profile.firstName + " " + user.profile.lastName} />

        <SearchBar
          placeholder="Search for jobs"
          value={search}
          onChangeText={setSearch}
        />

        <View style={styles.tipsSection}>
          <TipsHeader title="Tips For You" buttonText="See All" />
          <TipsImage />
        </View>

        <View style={styles.proficientRecommendationStyle}>
          <TipsHeader title="Proficient Recommendation" buttonText="See All" />
          <ProfRecommendation
            data={filters}
            selectedFilter={selectedFilter}
            onPress={handleFilterPress}
          />
        </View>
        <ScrollView>
          <ProfList jobs={users} onCardPress={handleCardPress} />
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default HomePage;
