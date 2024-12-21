import React, { useEffect } from "react";
import { View, ScrollView, FlatList } from "react-native";
import Header from "@/components/HomePage/Header";
import SearchBar from "@/components/HomePage/SearchBar";
import TipsHeader from "@/components/HomePage/TipsHeader";
import TipsImage from "@/components/HomePage/TipsImage";
import ProfRecommendation from "@/components/HomePage/ProfRecommendation";
import ProfList from "@/components/HomePage/ProfScrollView";
import styles from "@/assets/styles/HomePage/HomePage";
import { ayhamWifiUrl } from "@/constants/Urls";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "expo-router";
import SearchModal from "@/components/HomePage/Modal";

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
  numberOfRequest: number;
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
  const navigation = useNavigation();
  const [search, setSearch] = React.useState<string>("");
  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] =
    React.useState<string>("All Proficient");
  const [users, setUsers] = React.useState<User[]>([]);
  console.log(users);
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

  const handleCardPress = (proficientDetails: {
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
    navigation.navigate("ProfNavigator", { proficientDetails, user });
  };

  const fetchUser = async (filter?: string) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(
        `${ayhamWifiUrl}/api/proficient/proficient-data`,
        {
          params: {
            id: user._id,
            careerCategory: filter,
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

  const handleFilterPress = (filter: string) => {
    console.log("Filter:", filter);
    setSelectedFilter(filter);
    fetchUser(filter);
  };

  useEffect(() => {
    fetchUser(selectedFilter);
  }, [user]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Header name={`${user.profile.firstName} ${user.profile.lastName}`} />
        <SearchBar
          placeholder="Search for jobs"
          value={search}
          onChangeText={(text) => {
            setSearch(text);
            if (!isModalVisible) {
              setIsModalVisible(true);
            }
          }}
          onFocus={() => {
            if (!isModalVisible) {
              setIsModalVisible(true);
            }
          }}
        />
        <SearchModal
          isVisible={isModalVisible}
          onClose={() => {
            setSearch("");
            setIsModalVisible(false);
          }}
          searchValue={search}
          onSearchChange={(value) => setSearch(value)}
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
        <ProfList jobs={users} onCardPress={handleCardPress} />
      </View>
    </ScrollView>
  );
};

export default HomePage;
