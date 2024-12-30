import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function Projects() {
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
            style={styles.backIcon}
          />
        </View>
      ),
    });
  }, []);

  const showProject = async (id: string) => {
    navigation.navigate("ProjectDetails", { id });
  };

  const projects = [
    {
      id: "1",
      title: "Modern Office Design",
      content:
        "This project focuses on creating a modern and functional office space...",
      images: [
        "https://via.placeholder.com/300",
        "https://via.placeholder.com/300",
      ],
      location: "New York, USA",
      rating: 4.5,
    },
    {
      id: "2",
      title: "Luxury Apartment Renovation",
      content:
        "A luxury renovation project featuring high-end materials and designs...",
      images: [
        "https://via.placeholder.com/300",
        "https://via.placeholder.com/300",
      ],
      location: "Los Angeles, USA",
      rating: 4.8,
    },
  ];

  const ProjectCard = ({ project }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => showProject(project.id)}
    >
      <Text style={styles.title}>{project.title}</Text>
      <Text style={styles.content}>{project.content}</Text>
      <FlatList
        horizontal
        data={project.images}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.image} />
        )}
        showsHorizontalScrollIndicator={false}
      />
      <View style={styles.footer}>
        <View style={styles.locationContainer}>
          <Ionicons name="location" size={20} color="gray" />
          <Text style={styles.locationText}>{project.location}</Text>
        </View>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={20} color="gold" />
          <Text style={styles.ratingText}>{project.rating.toFixed(1)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={projects}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ProjectCard project={item} />}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: "#f9f9f9",
  },
  backIcon: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginLeft: -10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    color: "#555",
    marginBottom: 15,
  },
  image: {
    width: 200,
    height: 120,
    borderRadius: 10,
    marginRight: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 16,
    color: "#666",
    marginLeft: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  ratingText: {
    fontSize: 16,
    marginLeft: 5,
    color: "#333",
  },
});
