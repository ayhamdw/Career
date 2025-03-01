import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Text,
  Modal,
  TextInput,
  Pressable,
} from "react-native";
import Header from "@/components/HomePage/Header";
import TipsHeader from "@/components/HomePage/TipsHeader";
import TipsImage from "@/components/HomePage/TipsImage";
import ProfRecommendation from "@/components/HomePage/ProfRecommendation";
import ProfList from "@/components/HomePage/ProfScrollView";
import styles from "@/assets/styles/HomePage/HomePage";
import { ayhamWifiUrl } from "@/constants/Urls";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "expo-router";
import jobs from "@/constants/Jobs";
import { usePushNotifications } from "@/hooks/usePushNotifications";
import jobAndProficientList from "@/constants/Jobs";
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
  const id = user._id;
  const [search, setSearch] = React.useState<string>("");
  const [selectedFilter, setSelectedFilter] =
    React.useState<string>("All Proficient");
  const [users, setUsers] = React.useState<User[]>([]);
  const [searchResults, setSearchResults] = React.useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const { expoPushToken, notification } = usePushNotifications();
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
    verificationStatus: boolean;
    dayRate: string;
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
    setSelectedFilter(filter);
    fetchUser(filter);
  };

  useEffect(() => {
    fetchUser(selectedFilter);
  }, [user]);

  const handleSearch = (data: string) => {
    setSearch(data);
    if (data === "") {
      setSearchResults([]);
    } else {
      const result = jobAndProficientList.filter((job) =>
        job.toLowerCase().includes(data.toLowerCase())
      );
      setSearchResults(result);
    }
  };
  const chooseJob = (item: string) => {
    setModalVisible(false);
    setSearch("");
    navigation.navigate("JobList", {
      user: user._id,
      job: item,
    });
  };
  const saveExpoToken = async (token: any) => {
    try {
      console.log("Expo Token:", token);
      const response = await axios.post(
        `${ayhamWifiUrl}/api/user/save-expo-token`,
        {
          userId: user._id,
          expoToken: token,
        }
      );
      if (response.status === 200) {
        console.log("Token saved successfully");
      }
    } catch (error) {
      console.log("Error saving token:", error);
    }
  };

  useEffect(() => {
    saveExpoToken(expoPushToken?.data);
  }, [expoPushToken]);

  const navigateToTips = () => {
    navigation.navigate("Tips");
  };

  const navigateToFirstTip = () => {
    navigation.navigate("FirstTip");
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        {/* <Text>Token: {expoPushToken?.data ?? null} </Text> */}
        <Header
          name={`${user.profile.firstName} ${user.profile.lastName}`}
          navigation={navigation}
          userId={id}
        />
        <TouchableOpacity
          style={styles.searchBar}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.placeholderText}>
            {search || "Search for jobs"}
          </Text>
        </TouchableOpacity>

        <SearchModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          search={search}
          setSearch={handleSearch}
          searchResults={searchResults}
          chooseJob={chooseJob}
        />

        <View style={styles.section}>
          <TipsHeader
            title="Tips For You"
            buttonText="See All"
            onPress={navigateToTips}
          />
          <TipsImage onPress={navigateToFirstTip} />
        </View>

        <View style={styles.section}>
          <ProfRecommendation
            data={filters}
            selectedFilter={selectedFilter}
            onPress={handleFilterPress}
          />
        </View>

        <View style={styles.section}>
          <ProfList jobs={users} onCardPress={handleCardPress} />
        </View>
      </View>
    </ScrollView>
  );
};

export default HomePage;
