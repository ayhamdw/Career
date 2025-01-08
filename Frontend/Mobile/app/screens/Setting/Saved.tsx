import React, { useLayoutEffect, useState } from "react";
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
import { useFocusEffect, useNavigation } from "expo-router";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { ayhamWifiUrl } from "@/constants/Urls";

export default function Saved({ user }) {
  const userId = user._id;
  const [savedPosts, setSavedPosts] = useState([]);
  const scaleAnim = useState(new Animated.Value(1))[0];
  const navigation = useNavigation();

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerTitle: "",
  //     headerLeft: () => (
  //       <View style={{ marginLeft: 20 }}>
  //         <Ionicons
  //           name="arrow-back"
  //           size={24}
  //           color="black"
  //           onPress={() => navigation.goBack()}
  //           style={{
  //             marginLeft: -10,
  //             width: 30,
  //             height: 30,
  //             borderRadius: 50,
  //             backgroundColor: "white",
  //           }}
  //         />
  //       </View>
  //     ),
  //   });
  // }, []);

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
    } else {
      setSavedPosts([]);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [userId])
  );

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = (item: string) => {
    // console.log("Post pressed:", item);
    navigation.navigate("PostDetails", { post: item, user: user });
  };

  const renderPost = ({ item }) => (
    <Pressable
      style={styles.pressable}
      onPress={() => handlePress(item)}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View
        style={[styles.card, { transform: [{ scale: scaleAnim }] }]}
      >
        <ImageBackground
          source={{
            uri: item.image || "https://via.placeholder.com/150",
          }}
          style={styles.cardBackground}
        >
          <View style={styles.cardContent}>
            <Text style={styles.postTitle} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.postContent} numberOfLines={2}>
              {item.content}
            </Text>
          </View>
        </ImageBackground>
      </Animated.View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Saved Posts</Text>
      {savedPosts && savedPosts.length === 0 ? (
        <View style={styles.emptyState}>
          <FontAwesome name="bookmark-o" size={48} color="#6c757d" />
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
    backgroundColor: "#f1f3f2",
    padding: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#333",
  },
  noDataText: {
    fontSize: 16,
    color: "#6c757d",
    textAlign: "center",
    marginTop: 10,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    paddingBottom: 10,
  },
  pressable: {
    marginBottom: 10,
  },
  card: {
    borderRadius: 8,
    overflow: "hidden",
    elevation: 2,
    backgroundColor: "#464646",
  },
  cardBackground: {
    height: 120,
    justifyContent: "flex-end",
  },
  cardContent: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 8,
  },
  postTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  postContent: {
    fontSize: 12,
    color: "#d1d5db",
  },
});
