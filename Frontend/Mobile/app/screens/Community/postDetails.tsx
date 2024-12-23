import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";
import Carousel from "react-native-snap-carousel";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function PostDetails() {
  const route = useRoute();
  const { post } = route.params;

  const renderCarouselItem = ({ item }) => (
    <Image source={{ uri: item }} style={styles.carouselImage} />
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.category}>{post.careerCategory}</Text>
      </View>

      <View style={styles.carouselContainer}>
        {post.images && post.images.length > 0 ? (
          <Carousel
            data={post.images}
            renderItem={renderCarouselItem}
            sliderWidth={SCREEN_WIDTH}
            itemWidth={SCREEN_WIDTH - 60}
            layout="stack"
            loop={true}
          />
        ) : (
          <Text style={styles.noImages}>No images available</Text>
        )}
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.content}>{post.content}</Text>
        <Text style={styles.location}>📍 {post.location}</Text>
        <Text style={styles.date}>
          📅 Posted on: {new Date(post.postDate).toLocaleDateString()}
        </Text>
        <Text style={styles.workers}>
          👥 Workers Needed: {post.numberOfWorker}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.applyButton}
        onPress={() => alert("Applied successfully!")}
      >
        <Text style={styles.applyButtonText}>Apply for this Job</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  headerContainer: {
    padding: 16,
    backgroundColor: "#007bff",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
  },
  category: {
    fontSize: 18,
    color: "#e0e0e0",
    marginTop: 4,
  },
  carouselContainer: {
    marginVertical: 20,
  },
  carouselImage: {
    width: SCREEN_WIDTH - 60,
    height: 250,
    borderRadius: 15,
  },
  detailsContainer: {
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  content: {
    fontSize: 16,
    marginBottom: 16,
    color: "#333333",
  },
  location: {
    fontSize: 14,
    color: "#007bff",
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: "#6c757d",
    marginBottom: 8,
  },
  workers: {
    fontSize: 14,
    color: "#333333",
    marginBottom: 16,
  },
  noImages: {
    fontSize: 14,
    color: "#adb5bd",
    textAlign: "center",
    marginTop: 16,
  },
  applyButton: {
    backgroundColor: "#28a745",
    padding: 16,
    borderRadius: 25,
    marginHorizontal: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  applyButtonText: {
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "bold",
  },
});
