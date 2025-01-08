import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { ayhamWifiUrl } from "@/constants/Urls";
import { Ionicons } from "@expo/vector-icons";

export default function MyPosts({ user }) {
  const [posts, setPosts] = useState([]);
  const navigation = useNavigation();

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

  const getUserPosts = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(
        `${ayhamWifiUrl}/api/community/getMyPostsWithDetails/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPosts(response.data);
    } catch (error) {
      console.log("Error fetching user posts:", error);
    }
  };

  const handleDeletePost = (postId) => {
    Alert.alert("Delete Post", "Are you sure you want to delete this post?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            const token = await AsyncStorage.getItem("token");
            await axios.delete(
              `${ayhamWifiUrl}/api/community/deletePost/${postId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            setPosts(posts.filter((post) => post._id !== postId));
          } catch (error) {
            console.log("Error deleting post:", error);
          }
        },
      },
    ]);
  };

  const handleEditPost = (postId) => {
    navigation.navigate("EditPost", { postId });
  };

  useEffect(() => {
    getUserPosts();
  }, []);

  const renderPost = ({ item }) => (
    <View style={styles.postCard}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.location}>Location: {item.location}</Text>
      <Text style={styles.rate}>Day Rate: ${item.dayRate}</Text>
      <Text style={styles.description}>{item.content}</Text>
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={() => handleEditPost(item._id)}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={() => handleDeletePost(item._id)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Posts</Text>
      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        renderItem={renderPost}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  listContainer: {
    paddingBottom: 16,
  },
  postCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  location: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
  rate: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#333",
    marginBottom: 12,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: "48%",
  },
  editButton: {
    backgroundColor: "#4caf50",
  },
  deleteButton: {
    backgroundColor: "#f44336",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
