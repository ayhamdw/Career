import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { ayhamWifiUrl } from "@/constants/Urls";
import { Pressable } from "react-native-gesture-handler";
import FontAwesome from "@expo/vector-icons/FontAwesome";
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

export default function Community({ user }: { user: User }) {
  const [posts, setPosts] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${ayhamWifiUrl}/api/community/posts`);
        if (response.status === 200) {
          setPosts(response.data);
        }
      } catch (error) {
        console.error("Error fetching community posts:", error);
      }
    };
    fetchData();
  }, []);

  const renderPost = ({ item }) => (
    <View style={styles.cardContainer}>
      <TouchableOpacity
        style={styles.postCard}
        onPress={() =>
          navigation.navigate("postDetails", { post: item, user: user })
        }
      >
        <Text style={styles.postTitle}>{item.title}</Text>
        <Text style={styles.postCategory}>{item.careerCategory}</Text>
        <Text style={styles.postLocation}>{item.location}</Text>
        <Text style={styles.postDate}>
          {new Date(item.postDate).toLocaleDateString()}
        </Text>
      </TouchableOpacity>
      <Pressable onPress={() => console.log("Saved!")}>
        <FontAwesome
          name="bookmark-o"
          size={24}
          color="black"
          style={styles.iconStyle}
        />
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Community Posts</Text>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item._id}
      />
      <Button
        title="Create a Post"
        onPress={() => navigation.navigate("CreatePost")}
        color="#007bff"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  postCard: {
    backgroundColor: "#ffffff",
    padding: 16,
    marginBottom: 6,
    height: 100,

    // borderRadius: 8,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 2,
    width: "100%",
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  postCategory: {
    fontSize: 14,
    color: "#6c757d",
    marginTop: 4,
  },
  postLocation: {
    fontSize: 14,
    color: "#495057",
    marginTop: 4,
  },
  postDate: {
    fontSize: 12,
    color: "#adb5bd",
    marginTop: 4,
  },
  cardContainer: {
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    height: 150,
  },
  iconStyle: {
    margin: -5,
    alignSelf: "flex-end",
    width: 30,
    height: 30,
  },
});
