import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  FlatList,
  StyleSheet,
  ImageBackground,
  Animated,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { ayhamWifiUrl } from "@/constants/Urls";
import { FontAwesome } from "@expo/vector-icons";

export default function Saved({ user }) {
  const userId = user._id;
  const [savedPosts, setSavedPosts] = useState([]);
  const navigation = useNavigation();

  const fetchData = async () => {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(
      `${ayhamWifiUrl}/api/community/getSavedPosts/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      setSavedPosts(response.data.savedPosts);
      console.log("Saved posts:", response.data);
    } else {
      setSavedPosts([]);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [userId])
  );

  const renderPost = ({ item }) => (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && { transform: [{ scale: 0.98 }], opacity: 0.9 },
      ]}
      onPress={() => console.log("Post pressed:", item._id)}
    >
      <ImageBackground
        source={{
          uri: "https://source.unsplash.com/featured/?city,landscape",
        }}
        style={styles.cardBackground}
        imageStyle={styles.cardImage}
      >
        <View style={styles.cardContent}>
          <FontAwesome
            name="bookmark"
            size={24}
            color="#ffffff"
            style={styles.icon}
          />
          <Text style={styles.postTitle}>{item.title}</Text>
          <Text style={styles.postContent} numberOfLines={2}>
            {item.content}
          </Text>
        </View>
      </ImageBackground>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Saved Posts</Text>
      {savedPosts && savedPosts.length === 0 ? (
        <View style={styles.emptyState}>
          <FontAwesome name="bookmark-o" size={64} color="#6c757d" />
          <Text style={styles.noDataText}>No saved posts yet!</Text>
        </View>
      ) : (
        <FlatList
          data={savedPosts}
          keyExtractor={(item) => item._id}
          renderItem={renderPost}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    padding: 16,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#374151",
  },
  noDataText: {
    fontSize: 18,
    color: "#6c757d",
    textAlign: "center",
    marginTop: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    paddingBottom: 16,
  },
  card: {
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 3,
  },
  cardBackground: {
    height: 180,
    justifyContent: "flex-end",
  },
  cardImage: {
    borderRadius: 12,
  },
  cardContent: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 16,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  postTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8,
  },
  postContent: {
    fontSize: 14,
    color: "#d1d5db",
  },
  icon: {
    position: "absolute",
    top: 16,
    right: 16,
  },
});
